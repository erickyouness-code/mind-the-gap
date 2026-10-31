"""Build vocabulary + sentence data for the app.
Sources: CEFR-J / Octanove word lists (levels), Wiktionary via LangSwap packs (FR translations),
FreeDict eng-fra (fallback), Tatoeba via fra.txt (example sentences), FrequencyWords (frequency)."""
import csv, json, re, sqlite3, sys, collections, html
D = sys.argv[1]; OUT = sys.argv[2]
LV = {'A1':1,'A2':2,'B1':3,'B2':4,'C1':5,'C2':6}
POSMAP = {'noun':'noun','adjective':'adj','verb':'verb','adverb':'adv','pronoun':'pron','preposition':'prep',
          'determiner':'det','conjunction':'conj','number':'num','modal auxiliary':'verb','be-verb':'verb',
          'interjection':'intj','do-verb':'verb','have-verb':'verb','infinitive-to':'particle','vern':'verb','':'noun'}
POSFR = {'noun':'n','adj':'adj','verb':'v','adv':'adv','pron':'pron','prep':'prép','det':'dét','conj':'conj','num':'num','intj':'interj','particle':'part'}

# ---------- word list
rows = []
for f in ['cefrj.csv','c1c2.csv']:
    for r in csv.DictReader(open(f'{D}/{f}', encoding='utf-8')):
        hw = r['headword'].strip()
        if not hw: continue
        variants = [v.strip() for v in hw.split('/') if v.strip()]
        rows.append((variants, POSMAP.get(r['pos'].strip(), 'noun'), LV[r['CEFR'].strip()]))
seen = {}
for variants, pos, lv in rows:
    key = (variants[0].lower(), pos)
    if key in seen:
        seen[key]['lv'] = min(seen[key]['lv'], lv); continue
    seen[key] = {'w': variants[0], 'alt': variants[1:], 'pos': pos, 'lv': lv}
words = list(seen.values())
print('words', len(words))

# ---------- frequency
freq = {}
for i, line in enumerate(open(f'{D}/en50k.txt', encoding='utf-8')):
    w = line.split(' ')[0]
    freq.setdefault(w, i + 1)

# ---------- wiktionary
c = sqlite3.connect(f'{D}/pack-en.sqlite'); c.execute(f"attach '{D}/base.sqlite' as b")
wid = {}
for i, t in c.execute("select id,text from b.word where lang='en'"):
    wid.setdefault(t, i)
frtext = dict(c.execute("select id,text from b.word where lang='fr'"))
WPOS = {'noun':['noun'],'adj':['adj'],'verb':['verb'],'adv':['adv'],'pron':['pron'],'prep':['prep','prep_phrase'],
        'det':['det','article','pron'],'conj':['conj'],'num':['num','noun'],'intj':['intj'],'particle':['particle','prep']}
def wikt(word, pos):
    i = wid.get(word) or wid.get(word.lower())
    if i is None: return None, None
    q = '''select e.pos, s.id, s.gloss, t.word_id, t.gender from entry e join sense s on s.entry_id=e.id
           join translation t on t.sense_id=s.id where e.word_id=? and e.edition='en'
           order by e.rank, s.rank, t.rank'''
    res = c.execute(q, (i,)).fetchall()
    res = [r for r in res if r[3] in frtext]
    pref = [r for r in res if r[0] in WPOS.get(pos, [pos])]
    use = pref or res
    if not use: return None, None
    out, gloss, senses = [], None, []
    for p, sid, g, tw, gen in use:
        t = frtext[tw]
        if gen in ('m.', 'f.', 'm./f.') and pos == 'noun':
            t = f"{t} ({gen.rstrip('.')})" if gen != 'm./f.' else f"{t} (m/f)"
        if gloss is None: gloss = g
        if sid not in senses: senses.append(sid)
        if len(senses) > 4: break
        if t not in out: out.append(t)
    return out[:5], gloss

# ---------- freedict fallback
fd = collections.defaultdict(list)
tei = open(f'{D}/eng-fra.tei', encoding='utf-8').read()
for m in re.finditer(r'<entry>(.*?)</entry>', tei, re.S):
    e = m.group(1)
    o = re.search(r'<orth>(.*?)</orth>', e)
    if not o: continue
    for q in re.findall(r'<cit type="trans">\s*<quote>(.*?)</quote>', e):
        if q not in fd[o.group(1)]: fd[o.group(1)].append(html.unescape(q))

# ---------- inflections (forms -> lemma)
forms_of = collections.defaultdict(set)
for k, w in c.execute("select f.search_key, w.text from form f join b.word w on w.id=f.word_id where f.layer='inflection' and w.lang='en'"):
    k = k.lower(); b = w.lower()
    if ' ' not in k and len(k) < 25 and k[:3] == b[:3]: forms_of[b].add(k)
IRR = json.load(open(sys.argv[3]))
for base, past, pp, fr, lv in IRR:
    forms_of[base] |= set(past.split('/')) | set(pp.split('/'))
forms_of['be'] |= {'am','is','are'}; forms_of['have'] |= {'has'}; forms_of['do'] |= {'does'}

cf = sqlite3.connect(f'{D}/pack-fr.sqlite'); cf.execute(f"attach '{D}/base.sqlite' as b")
WPF = {'noun':'noun','adj':'adj','verb':'verb','adv':'adv'}
def reverse(word, pos):
    q = """select w.text, e.pos, w.volume, count(*) from b.word t join translation tr on tr.word_id=t.id join sense s on s.id=tr.sense_id
           join entry e on e.id=s.entry_id join b.word w on w.id=e.word_id where t.lang='en' and t.text=? and w.lang='fr' group by w.text, e.pos"""
    rs = cf.execute(q, (word,)).fetchall()
    if not rs: return []
    def sc(r):
        t, p, vol, n = r
        bonus = 0
        if pos == 'adv' and t.endswith('ment'): bonus += 3
        return (-(p == WPF.get(pos, pos)), -(n + bonus), -min(vol, 60))
    rs.sort(key=sc)
    return [r[0] for r in rs if not r[0][0].isupper() or pos == 'noun'][:3]
import os
OVR = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'overrides.json'), encoding='utf-8'))
missing = 0
for w in words:
    tr, gloss = wikt(w['w'], w['pos'])
    if not tr:
        for a in w['alt']:
            tr, gloss = wikt(a, w['pos'])
            if tr: break
    if not tr:
        tr = reverse(w['w'], w['pos']); gloss = None
    if not tr:
        tr = fd.get(w['w'], [])[:4]; gloss = None
    k = w['w'] + '|' + w['pos']
    if k in OVR: tr = OVR[k].split(' · ')
    elif w['w'] in OVR: tr = OVR[w['w']].split(' · ')
    if not tr: missing += 1; print('MISS', w['w'], w['pos'], w['lv'])
    w['fr'] = tr or []
    w['gl'] = (gloss or '')[:90]
    base = w['w'].lower()
    w['f'] = freq.get(base, 60000) if ' ' not in base else min([freq.get(x, 60000) for x in base.split()] + [60000]) + 20000
print('missing translations', missing)
words = [w for w in words if w['fr']]

# ---------- sentences
pairs = []
seen_en = {}
for line in open(f'{D}/fra.txt', encoding='utf-8'):
    en, fr = line.rstrip('\n').split('\t')[:2]
    if en in seen_en:
        continue
    seen_en[en] = len(pairs); pairs.append((en, fr))
print('pairs', len(pairs))
tok = lambda s: re.findall(r"[a-z]+(?:'[a-z]+)?", s.lower())
lemma_lv = {}
for w in words:
    b = w['w'].lower()
    if ' ' in b: continue
    for f in {b} | forms_of.get(b, set()):
        lemma_lv[f] = min(lemma_lv.get(f, 9), w['lv'])
for f, l in [("i'm",1),("don't",1),("it's",1),("can't",1),("i'll",1),("you're",1),("didn't",1),("isn't",1),("that's",1),("he's",1),("she's",1),("we're",1),("they're",1),("won't",1),("doesn't",1),("aren't",1),("wasn't",1),("i've",2),("let's",1),("what's",1),("there's",1),("tom",1),("mary",1),("john",1)]:
    lemma_lv[f] = l
index = collections.defaultdict(list)
slev = []
for si, (en, fr) in enumerate(pairs):
    ts = tok(en)
    lvls = [lemma_lv.get(t, 7 if t.endswith("'s") is False else 1) for t in ts]
    lvls = [lemma_lv.get(t[:-2], 1) if t.endswith("'s") else l for t, l in zip(ts, lvls)]
    slev.append(max(lvls) if lvls else 7)
    if 3 <= len(ts) <= 16:
        for t in set(ts): index[t].append(si)
# examples per word
used = collections.Counter()
for w in words:
    b = w['w'].lower()
    cand = []
    if ' ' in b:
        pat = re.compile(r'\b' + re.escape(b) + r'\b', re.I)
        first = b.split()[0]
        cand = [si for si in index.get(first, []) if pat.search(pairs[si][0])]
    else:
        fs = {b} | forms_of.get(b, set())
        s = set()
        for f in fs: s.update(index.get(f, []))
        cand = list(s)
    def score(si):
        en = pairs[si][0]; n = len(tok(en))
        return (slev[si] > max(w['lv'], 2) + 1, used[si], abs(n - 8) + (0 if n >= 5 else 4), si)
    cand.sort(key=score)
    ex = []
    for si in cand[:2]:
        used[si] += 1; ex.append(si)
    w['ex'] = ex

# sentence pool for games: per level, varied length
pool_ids = set()
for w in words: pool_ids.update(w['ex'])
bylv = collections.defaultdict(list)
for si, (en, fr) in enumerate(pairs):
    n = len(tok(en))
    if 3 <= n <= 14 and slev[si] <= 6 and not re.search(r'[0-9"]', en):
        bylv[slev[si]].append(si)
quota = {1:1800, 2:1800, 3:1800, 4:1600, 5:900, 6:700}
import random; random.seed(7)
for l, ids in bylv.items():
    ids2 = ids[:]; random.shuffle(ids2)
    pool_ids.update(ids2[:quota.get(l, 0)])
pool = sorted(pool_ids)
remap = {si: i for i, si in enumerate(pool)}
sentences = [[pairs[si][0], pairs[si][1], max(1, min(6, slev[si]))] for si in pool]
for w in words: w['ex'] = [remap[s] for s in w['ex']]
print('sentences', len(sentences), collections.Counter(s[2] for s in sentences))

words.sort(key=lambda w: (w['lv'], w['f']))
out = [[w['w'], POSFR.get(w['pos'], w['pos']), w['lv'], ' · '.join(w['fr'][:4]), w['gl'], w['ex'], w['f']] for w in words]
json.dump(out, open(f'{OUT}/words.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump(sentences, open(f'{OUT}/sentences.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('levels', collections.Counter(w['lv'] for w in words), 'with examples', sum(1 for w in words if w['ex']))
