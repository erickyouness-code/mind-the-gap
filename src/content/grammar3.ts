import type { RawLesson } from './types'

export const grammarC: RawLesson[] = [
{ id: 'inversion', lv: 5, title: 'L\'inversion (style soutenu)', en: 'Inversion', body: `
# Après une expression négative ou restrictive en tête de phrase
On inverse l'**auxiliaire** et le **sujet**, comme dans une question. C'est un style écrit, emphatique.
= Expression négative + auxiliaire + sujet + verbe
| Expression | Exemple
| Never (before) | Never have I seen such a mess.
| Rarely / Seldom | Rarely does he admit he's wrong.
| Not only… but also | Not only did she win, but she also broke the record.
| Hardly / Scarcely… when | Hardly had I arrived when the phone rang.
| No sooner… than | No sooner had we sat down than it started to rain.
| Under no circumstances | Under no circumstances should you open this door.
| Little | Little did they know what was coming.
| Only then / Only when | Only when I left did I realise my mistake.
| Not until | Not until midnight did he come home.
> Never have I been so embarrassed. | Jamais je n'ai été aussi gêné.
# Conditionnels inversés (sans if)
> Had I known, I would have come. (= If I had known) | Si j'avais su, je serais venu.
> Should you need help, call me. (= If you need) | Si vous avez besoin d'aide, appelez-moi.
> Were I in your position, I'd resign. (= If I were) | Si j'étais à votre place, je démissionnerais.
? Never ___ I heard such nonsense! => have // Never + have + sujet + participe.
? Not only ___ he lie, but he also stole money. => did // Prétérit → did.
? ___ I known about the problem, I would have helped. => Had // Had = If I had.
? No sooner ___ she left than he arrived. => had // No sooner had… than.
* Little ___ that he was being watched. [he knew|did he know] => did he know // Little + inversion.
* ___ you have any questions, please contact us. [Should|Would|Had] => Should // Should = If you (should).
`},
{ id: 'cleft-sentences', lv: 5, title: 'Les phrases clivées (mise en relief)', en: 'Cleft sentences', body: `
# It is / was … that / who
Pour insister sur un élément, comme « C'est … qui / que » en français.
> It was Sarah who broke the vase. | C'est Sarah qui a cassé le vase.
> It's in Paris that they met. | C'est à Paris qu'ils se sont rencontrés.
# What… is / was…
> What I need is a holiday. | Ce dont j'ai besoin, c'est de vacances.
> What annoys me is his attitude. | Ce qui m'agace, c'est son attitude.
> What she did was (to) call the police. | Ce qu'elle a fait, c'est appeler la police.
# Autres structures
> All I want is some peace. | Tout ce que je veux, c'est un peu de calme.
> The reason (why) I came is to apologise. | Si je suis venu, c'est pour m'excuser.
> The thing is, I don't have time. | Le problème, c'est que je n'ai pas le temps.
? ___ I don't understand is why he left. => What // Ce que…
? It ___ my brother who told me. => was // It was … who.
? ___ I want is a bit of respect. => All // Tout ce que…
* ___ was in 1969 that man walked on the moon. [It|That|What] => It // It was … that.
* What I love about London ___ the parks. [is|are|it is] => is // What … is.
`},
{ id: 'subjunctive-formal', lv: 5, title: 'Subjonctif et structures formelles', en: 'Subjunctive & formal structures', body: `
# Le subjonctif « mandatif »
Après **suggest, recommend, insist, demand, propose, it is essential / vital / important that**, on utilise la **base verbale** (sans -s), surtout en anglais américain et formel.
> I suggest that he see a doctor. | Je suggère qu'il voie un médecin.
> It is essential that she be informed. | Il est essentiel qu'elle soit informée.
> They insisted that he leave immediately. | Ils ont insisté pour qu'il parte immédiatement.
En anglais britannique, on dit aussi **should** : **I suggest that he should see a doctor.**
# It's (high) time + prétérit
> It's time we went home. | Il est temps que nous rentrions.
> It's high time you found a job. | Il serait grand temps que tu trouves un travail.
# Would rather / had better
> I'd rather you didn't smoke here. | Je préférerais que tu ne fumes pas ici.
> I'd rather stay at home. | Je préfère rester à la maison.
> You'd better leave now. | Tu ferais mieux de partir maintenant.
x I suggest you to go. | I suggest (that) you go. / I suggest going.
? The doctor recommended that she ___ (rest) for a week. => rest // Subjonctif = base.
? It's time you ___ (go) to bed. => went // It's time + prétérit.
? I'd rather you ___ (not / tell) anyone. => didn't tell/did not tell // would rather + sujet + prétérit.
? You'd better ___ (hurry). => hurry // had better + base.
* It is vital that every employee ___ the rules. [follows|follow|will follow] => follow // Subjonctif.
* I'd rather ___ by train. [go|to go|going] => go // would rather + base.
`},
{ id: 'future-advanced', lv: 5, title: 'Futurs avancés (be about to, be to, be due to)', en: 'Advanced future forms', tense: true, body: `
| Structure | Sens | Exemple
| be about to | sur le point de | The film is about to start.
| be on the point / verge of + -ing | sur le point de | She's on the verge of quitting.
| be to + base | prévu officiellement / ordre | The President is to visit Japan next month.
| be due to + base | prévu (horaire) | The train is due to arrive at 6.
| be bound to | c'est sûr que | It's bound to rain this weekend.
| be likely / unlikely to | probable / improbable | Prices are likely to rise.
# Le futur dans le passé
> I was about to leave when she called. | J'allais partir quand elle a appelé.
> He was going to tell her, but he didn't. | Il allait le lui dire, mais il ne l'a pas fait.
> They were to marry in June, but… | Ils devaient se marier en juin, mais…
? Hurry up! The shop is ___ to close. => about // Sur le point de.
? The plane is ___ to land at 7:15. => due // Horaire prévu.
? Don't worry, she's ___ to call you back — she always does. => bound/sure/certain // C'est sûr.
* You ___ to leave this room without permission! [are not|will not about|are not due] => are not // be to = ordre.
* I ___ going to call you, but I forgot. [am|was|will be] => was // Futur dans le passé.
`},
{ id: 'participle-clauses', lv: 5, title: 'Les propositions participiales', en: 'Participle clauses', body: `
# Raccourcir une phrase
Les participes permettent de condenser deux propositions qui ont le **même sujet**.
| Forme | Sens | Exemple
| -ing (actif, simultané) | Quand / comme… | Walking home, I met an old friend.
| Having + participe (antériorité) | Après avoir… | Having finished her work, she went out.
| participe passé (passif) | Étant… | Built in 1900, the house needs repairs.
> Not knowing what to do, I called my father. | Ne sachant pas quoi faire, j'ai appelé mon père.
> The man sitting next to me was snoring. | L'homme assis à côté de moi ronflait.
> Written in simple English, the book is easy to read. | Écrit en anglais simple, le livre se lit facilement.
! Attention au « participe flottant » : **Walking down the street, a car hit me** veut dire que la voiture marchait !
? ___ (finish) dinner, they went for a walk. => Having finished // Antériorité.
? ___ (feel) tired, she went to bed early. => Feeling // Cause / simultanéité.
? ___ (make) in Italy, these shoes are expensive. => Made // Sens passif.
* The girl ___ to Tom is my sister. [talks|talking|talked] => talking // Participe présent = qui parle.
* ___ the email, he realised he'd made a mistake. [Having sent|Sent|Sending to] => Having sent // Après avoir envoyé.
`},
{ id: 'advanced-articles-nouns', lv: 5, title: 'Noms composés et articles avancés', en: 'Advanced articles & compound nouns', body: `
# The + adjectif = un groupe
> The rich should help the poor. | Les riches devraient aider les pauvres.
> The French drink a lot of wine. | Les Français boivent beaucoup de vin.
# Pas d'article pour les institutions (fonction)
**go to school / church / prison / hospital / bed** : on y va pour la fonction. **the school** = le bâtiment.
> He's in hospital. (UK) | Il est hospitalisé.
> I went to the hospital to visit him. | Je suis allé à l'hôpital pour lui rendre visite.
# Noms composés
Le premier nom joue le rôle d'adjectif et reste au **singulier** : **a toothbrush, a bus stop, a ten-minute walk, a five-year-old boy**.
x a ten-minutes walk | a ten-minute walk
? ___ unemployed need more support. => The // The + adjectif = groupe.
* He was sent to ___ prison for three years. [the|—|a] => — // Institution : pas d'article.
? It's a ___ (two / hour) flight. => two-hour // Nom composé : singulier.
* She's a ___ girl. [six-years-old|six-year-old|six years old] => six-year-old // Adjectif composé.
* I go to ___ bed at 11. [the|—] => — // go to bed.
`},
{ id: 'emphasis-do', lv: 5, title: 'Insistance : do, so, such, the very', en: 'Emphasis', body: `
# Do / does / did d'insistance
> I do like your dress! | J'adore vraiment ta robe !
> He did tell me, I promise. | Il me l'a bien dit, je te le promets.
# So / such
**so + adjectif / adverbe** ; **such (a) + (adjectif) + nom**.
> It was so cold. / It was such a cold day. | Il faisait si froid. / C'était une journée si froide.
> They're such nice people. | Ce sont des gens tellement gentils.
# Intensifieurs
**absolutely** + adjectifs extrêmes (absolutely amazing, freezing, exhausted) ; **very** + adjectifs normaux (very good, cold, tired).
x very exhausted, absolutely tired | absolutely exhausted, very tired
x It was a so good film. | It was such a good film.
? It was ___ a beautiful day that we went to the beach. => such // such a + nom.
? The food was ___ delicious that I had seconds. => so // so + adjectif.
? I ___ (insistance) want to come, but I can't. => do // do d'insistance.
* The film was ___ terrifying. [very|absolutely] => absolutely // Adjectif extrême.
* They have ___ beautiful children. [so|such|such a] => such // such + nom pluriel.
`},
// ---------------- C2
{ id: 'hedging', lv: 6, title: 'Nuancer son propos (hedging)', en: 'Hedging & softening', body: `
# Pourquoi nuancer ?
En anglais (académique, professionnel, diplomatique), affirmer trop directement peut sembler brutal. On adoucit avec des verbes, des modaux et des adverbes.
| Procédé | Exemples
| Verbes | seem, appear, tend to, suggest, indicate
| Modaux | may, might, could, would
| Adverbes | arguably, possibly, presumably, relatively, somewhat
| Expressions | to some extent, it could be argued that, there is some evidence that
> The results seem to suggest a link. | Les résultats semblent indiquer un lien.
> This is arguably his best novel. | C'est sans doute son meilleur roman.
> It would appear that there has been a mistake. | Il semblerait qu'il y ait eu une erreur.
> I'd say it's somewhat expensive. | Je dirais que c'est un peu cher.
# Adoucir une critique ou un refus
> That's not quite what I had in mind. | Ce n'est pas tout à fait ce que j'avais en tête.
> I'm not sure that's the best idea. | Je ne suis pas sûr que ce soit la meilleure idée.
? The data ___ to indicate a slight improvement. => seems/appear/appears/seem // Verbe de prudence.
? It ___ be argued that the policy has failed. => could/might/may // Modal de prudence.
? This is, ___, the most important discovery of the century. => arguably // On peut soutenir que…
* Quelle phrase est la plus nuancée ? [This proves the theory.|This may support the theory.] => This may support the theory. // may + support = prudence.
* « Il semblerait que… » [It would appear that…|It is appearing that…] => It would appear that… // Structure figée.
`},
{ id: 'ellipsis-substitution', lv: 6, title: 'Ellipse et substitution', en: 'Ellipsis & substitution', body: `
# Éviter les répétitions
L'anglais natif évite de répéter : on remplace ou on supprime.
| Procédé | Exemple
| so / not | "Is it going to rain?" — "I hope not." / "I think so."
| one / ones | I don't like the red shirt; I prefer the blue one.
| do so | He promised to call, but he didn't do so.
| ellipse après auxiliaire | "Have you finished?" — "Yes, I have."
| ellipse après to | "Do you want to come?" — "I'd love to."
> "Will she come?" — "I'm afraid not." | « Elle viendra ? » — « J'ai bien peur que non. »
> She can speak Russian, but I can't. | Elle sait parler russe, mais pas moi.
> You don't have to come, but you can if you want to. | Tu n'es pas obligé de venir, mais tu peux si tu veux.
? "Is the shop open?" — "I don't think ___." => so // think so / don't think so.
? These shoes are too small. Do you have bigger ___? => ones // Substitution d'un pluriel.
? "Are you coming?" — "I'd like ___, but I can't." => to // Ellipse après to.
* "Did he pass?" — "I'm afraid ___." [no|not|don't] => not // I'm afraid not.
* He said he would apologise, and he did ___. [it|so|that] => so // do so.
`},
{ id: 'advanced-tenses-nuance', lv: 6, title: 'Nuances temporelles avancées', en: 'Advanced tense nuances', tense: true, body: `
# Le passé pour la distance et la politesse
> I was wondering if you could help me. | Je me demandais si vous pourriez m'aider.
> I wanted to ask you something. | Je voulais vous demander quelque chose.
# Le continu pour l'irritation (always + -ing)
> He's always leaving his socks on the floor! | Il laisse toujours traîner ses chaussettes !
# Le présent de narration (récits, blagues, résumés)
> So this man walks into a bar and orders a drink… | Alors un homme entre dans un bar et commande un verre…
# Le futur de supposition
> That'll be the postman. | Ça doit être le facteur.
> You'll have heard the news, I suppose. | Vous avez sans doute appris la nouvelle.
# Les verbes d'état au continu (changement de sens)
> I'm seeing a doctor tomorrow. (= rendez-vous) | J'ai rendez-vous chez le médecin demain.
> You're being very rude. (= comportement temporaire) | Tu es très impoli en ce moment.
> I'm loving this weather! (familier, enthousiasme) | J'adore ce temps !
? I ___ wondering if you were free on Friday. => was // Passé de politesse.
? She's always ___ (complain) about her job! => complaining // always + -ing = agacement.
? (doorbell) That ___ be Anna — she said she'd come. => will/'ll/must // Futur de supposition.
* Why ___ so difficult today? It's not like you. [are you being|are you] => are you being // Comportement temporaire.
* « Ça doit être le facteur » (on sonne) [That'll be the postman.|That is being the postman.] => That'll be the postman. // will de supposition.
`},
{ id: 'register-style', lv: 6, title: 'Registres : formel, neutre, familier', en: 'Register & style', body: `
| Familier | Neutre | Formel
| get | receive / obtain | acquire
| ask for | request | solicit
| find out | discover | ascertain
| put off | postpone | defer
| need | require | necessitate
| help | assist | facilitate
| enough | sufficient | adequate
| buy | purchase | procure
| tell | inform | notify
| about | approximately | circa
# Courriels formels
> I am writing to enquire about… | Je vous écris pour me renseigner sur…
> Please find attached… | Veuillez trouver ci-joint…
> I would be grateful if you could… | Je vous serais reconnaissant de bien vouloir…
> I look forward to hearing from you. | Dans l'attente de votre réponse.
> Yours sincerely / Yours faithfully | Cordialement / Veuillez agréer…
! **Yours faithfully** quand on ne connaît pas le nom (Dear Sir or Madam) ; **Yours sincerely** quand on le connaît (Dear Mr Smith).
# Familier
> gonna, wanna, gotta, kinda, ain't, y'all, cheers, mate | (à réserver à l'oral entre amis)
? (formel) We need to ___ the meeting until next week. (put off) => postpone/defer // Registre plus soutenu.
? I would be ___ if you could send me the details. => grateful // Formule de politesse.
? I look forward to ___ from you. => hearing // look forward to + -ing.
* Dear Sir or Madam, … Yours ___ [sincerely|faithfully] => faithfully // Destinataire inconnu.
* Version la plus formelle de « find out » : [discover|ascertain|get to know] => ascertain // Registre soutenu.
`},
{ id: 'collocations-advanced', lv: 6, title: 'Collocations et anglais idiomatique', en: 'Collocations', body: `
# Les mots qui vont ensemble
Une collocation est une association naturelle de mots. Les natifs ne disent pas « strong rain » mais **heavy rain**.
| Correct | Incorrect | Français
| heavy rain / traffic | strong rain | forte pluie, circulation dense
| strong coffee / wind | powerful coffee | café fort
| make a mistake | do a mistake | faire une erreur
| take a photo | make a photo | prendre une photo
| pay attention | give attention | faire attention
| catch a cold | take a cold | attraper un rhume
| a high price | an expensive price | un prix élevé
| commit a crime | make a crime | commettre un crime
| deeply regret | strongly regret | regretter profondément
| bitterly disappointed | strongly disappointed | amèrement déçu
| fast asleep / wide awake | — | profondément endormi / bien réveillé
| highly unlikely | strongly unlikely | très improbable
? There was ___ traffic on the motorway. => heavy // heavy traffic.
? Can you ___ a photo of us? => take // take a photo.
? It's highly ___ that he'll win. => unlikely // highly unlikely.
? The baby is fast ___. => asleep // fast asleep.
* She was bitterly ___ by the result. [disappointing|disappointed|sad] => disappointed // bitterly disappointed.
* He ___ a terrible crime. [made|did|committed] => committed // commit a crime.
`},
]
