import type { RawLesson } from './types'

export const grammarB: RawLesson[] = [
{ id: 'past-continuous', lv: 3, title: 'Le passé continu (was / were + -ing)', en: 'Past continuous', tense: true, body: `
# Quand l'utiliser
- Action **en cours** à un moment précis du passé : **At 8 p.m. I was having dinner.**
- Décor d'une histoire, interrompu par une action courte (prétérit) : **I was walking home when it started to rain.**
- Deux actions longues simultanées : **While I was cooking, he was watching TV.**
Il correspond souvent à l'**imparfait** français.
= Sujet + was / were + verbe-ing
> What were you doing at midnight? | Que faisais-tu à minuit ?
> She wasn't listening. | Elle n'écoutait pas.
> The phone rang while I was taking a shower. | Le téléphone a sonné pendant que je prenais une douche.
! **when** + action courte (prétérit) ; **while** + action longue (continu).
x When I was arriving, he left. | When I arrived, he was leaving.
? I ___ (sleep) when you called. => was sleeping // Action en cours interrompue.
? They ___ (play) football when it started to rain. => were playing // Action longue + interruption.
? What ___ you ___ (do) at 10 last night? => were, doing // were + sujet + -ing.
* While she ___, the baby woke up. [cooked|was cooking] => was cooking // while + action longue.
* I ___ my keys while I was running. [was losing|lost] => lost // Action courte → prétérit.
`},
{ id: 'present-perfect', lv: 3, title: 'Le present perfect (have + participe passé)', en: 'Present perfect simple', tense: true, body: `
# Le lien passé–présent
Le present perfect relie le passé au **présent**. On ne précise **pas quand** l'action a eu lieu.
= Sujet + have / has + participe passé
- **Expérience** de vie : **I have been to Japan.** (Je suis déjà allé au Japon.)
- Action passée avec un **résultat présent** : **I've lost my keys.** (je ne les ai plus)
- Situation qui **dure jusqu'à maintenant** (avec for / since) : **I've lived here for ten years.**
> Have you ever eaten sushi? | As-tu déjà mangé des sushis ?
> She has just left. | Elle vient de partir.
> I haven't finished yet. | Je n'ai pas encore fini.
# Mots-clés
| Mot | Sens | Place
| ever | déjà (question) / jamais | avant le participe
| never | jamais | avant le participe
| just | venir de | avant le participe
| already | déjà | avant le participe
| yet | encore (nég.) / déjà (question) | en fin de phrase
| for | depuis + durée | for two years
| since | depuis + point de départ | since 2015, since Monday
! **Depuis** se traduit par le present perfect, pas par le présent : **I've known her for years** (je la connais depuis des années).
x I live here since 2010. | I've lived here since 2010.
x I know him for five years. | I've known him for five years.
? I ___ (never / see) the sea. => have never seen/'ve never seen // Expérience → have + never + participe.
? She ___ (just / finish) her homework. => has just finished/'s just finished // Résultat récent.
? We've lived in Nantes ___ 2018. => since // Point de départ → since.
? They've been married ___ twenty years. => for // Durée → for.
? Have you finished ___? => yet // yet en fin de question.
* ___ you ever ___ to Canada? [Did / go|Have / been|Have / went] => Have / been // Expérience → present perfect.
* I've known Tom ___ we were children. [for|since|during] => since // Point de départ.
`},
{ id: 'perfect-vs-past', lv: 3, title: 'Present perfect ou prétérit ?', en: 'Present perfect vs past simple', tense: true, body: `
# La question à se poser : QUAND ?
| Prétérit | Present perfect
| moment **précis / terminé** | moment **non précisé** / période non terminée
| I saw him yesterday. | I've seen him (récemment, peu importe quand).
| I went to Rome in 2019. | I've been to Rome twice.
| She worked there for 5 years (elle n'y travaille plus). | She has worked there for 5 years (elle y travaille encore).
> I lost my phone last week. | J'ai perdu mon téléphone la semaine dernière.
> I've lost my phone. Can you call it? | J'ai perdu mon téléphone. Tu peux l'appeler ?
! Avec **yesterday, last…, ago, in 2010, when…** → toujours le **prétérit**.
! **this morning** : present perfect s'il est encore le matin, prétérit si c'est l'après-midi.
x I have seen him yesterday. | I saw him yesterday.
x When have you arrived? | When did you arrive?
? I ___ (visit) Spain three times. => have visited/'ve visited // Nombre de fois, sans date → present perfect.
? I ___ (visit) Spain in 2015. => visited // Date précise → prétérit.
? ___ you ___ (see) Anna yesterday? => Did, see // yesterday → prétérit.
? Shakespeare ___ (write) many plays. => wrote // Personne décédée : période terminée.
* I ___ my homework. Can I go out now? [finished|have finished] => have finished // Résultat présent.
* When ___ you ___ to London? [have / moved|did / move] => did / move // Question When → prétérit.
`},
{ id: 'present-perfect-continuous', lv: 3, title: 'Le present perfect continu', en: 'Present perfect continuous', tense: true, body: `
= Sujet + have / has been + verbe-ing
- Insiste sur la **durée** d'une action qui continue : **I've been waiting for an hour!**
- Action récente avec des **traces visibles** : **You're out of breath. Have you been running?**
> It has been raining all day. | Il pleut depuis ce matin / toute la journée.
> How long have you been learning English? | Depuis combien de temps apprends-tu l'anglais ?
# Simple ou continu ?
| Present perfect simple | Present perfect continu
| résultat, quantité | durée, activité
| I've written three emails. | I've been writing emails all morning.
! Les verbes d'état (know, like, be…) restent au simple : **I've known her for years.**
? I'm tired. I ___ (work) all day. => have been working/'ve been working // Durée, activité.
? How long ___ you ___ (wait)? => have, been waiting // How long + continu.
? She ___ (read) four books this month. => has read/'s read // Quantité → simple.
* Your eyes are red. ___ ? [Have you cried|Have you been crying] => Have you been crying // Traces visibles.
* I ___ him since 2010. [have been knowing|have known] => have known // know = verbe d'état.
`},
{ id: 'used-to', lv: 3, title: 'Used to / would (habitudes passées)', en: 'Used to & would', body: `
= Sujet + used to + verbe (base)
**Used to** décrit une habitude ou un état **passé qui n'existe plus**. Souvent traduit par l'imparfait.
> I used to smoke, but I stopped. | Je fumais, mais j'ai arrêté.
> Did you use to play tennis? | Tu jouais au tennis avant ?
> There used to be a cinema here. | Il y avait un cinéma ici avant.
# Would (actions répétées, récit)
> When I was a child, we would go to the beach every Sunday. | Enfant, nous allions à la plage chaque dimanche.
! **would** ne s'utilise pas pour les états : **I used to have long hair** (pas « I would have long hair »).
# Attention : be / get used to + -ing
**be used to doing** = être habitué à ; **get used to doing** = s'habituer à.
> I'm used to getting up early. | J'ai l'habitude de me lever tôt.
> You'll get used to driving on the left. | Tu t'habitueras à conduire à gauche.
? I ___ live in Paris, but now I live in Lyon. => used to // Situation passée terminée.
? Did you ___ have a pet? => use to // Après did → use to.
? She's used to ___ (work) at night. => working // be used to + -ing.
* We ___ have a dog when I was young. [used to|would|use to] => used to // État/possession passée.
* I can't get used to ___ in this noise. [sleep|sleeping] => sleeping // get used to + -ing.
`},
{ id: 'conditionals-0-1', lv: 3, title: 'Conditionnels 0 et 1 (if + présent)', en: 'Zero & first conditional', tense: true, body: `
# Conditionnel 0 : vérités générales
= If + présent, présent
> If you heat ice, it melts. | Si on chauffe de la glace, elle fond.
# Conditionnel 1 : situation réelle / probable
= If + présent, will + verbe (base)
> If it rains, we'll stay at home. | S'il pleut, nous resterons à la maison.
> If you don't hurry, you'll miss the bus. | Si tu ne te dépêches pas, tu vas rater le bus.
> I'll call you if I need help. | Je t'appellerai si j'ai besoin d'aide.
! Jamais de **will** après **if** (comme en français : « si j'ai » et pas « si j'aurai »).
# Unless = if… not
> You won't pass unless you study. | Tu ne réussiras pas à moins de travailler.
x If it will rain, I'll stay home. | If it rains, I'll stay home.
? If you ___ (mix) red and blue, you get purple. => mix // Vérité générale → présent.
? If I ___ (see) him, I'll tell him. => see // Après if → présent.
? We ___ (go) to the beach if the weather is nice. => will go/'ll go // Conséquence → will.
* ___ you work harder, you won't succeed. [If|Unless|When] => Unless // unless = if not.
* If she ___ late again, she'll lose her job. [is|will be] => is // Pas de will après if.
`},
{ id: 'conditional-2', lv: 3, title: 'Conditionnel 2 (if + prétérit)', en: 'Second conditional', tense: true, body: `
# Situation imaginaire ou peu probable (présent / futur)
= If + prétérit, would + verbe (base)
> If I won the lottery, I would travel around the world. | Si je gagnais au loto, je ferais le tour du monde.
> If I had more time, I'd learn the guitar. | Si j'avais plus de temps, j'apprendrais la guitare.
> What would you do if you saw a ghost? | Que ferais-tu si tu voyais un fantôme ?
# If I were you (conseil)
Avec be, on utilise souvent **were** pour toutes les personnes.
> If I were you, I'd accept the offer. | À ta place, j'accepterais l'offre.
! Comme en français : **si + imparfait → conditionnel**. Jamais de would après if.
x If I would have money, I would buy it. | If I had money, I would buy it.
? If I ___ (be) rich, I'd buy a house in Italy. => were/was // If + prétérit (were est plus soutenu).
? She ___ (help) you if she had time. => would help/'d help // Conséquence → would.
? If we ___ (live) by the sea, we'd go swimming every day. => lived // If + prétérit.
* If I ___ you, I'd see a doctor. [am|were|would be] => were // If I were you.
* What ___ you do if you lost your job? [will|would] => would // Hypothèse → would.
`},
{ id: 'passive-basic', lv: 3, title: 'La voix passive', en: 'Passive voice', tense: true, body: `
# Formation
= Sujet + be (au temps voulu) + participe passé (+ by + agent)
On utilise le passif quand l'action est plus importante que celui qui la fait, ou quand on ne le connaît pas. Souvent traduit par **« on »** en français.
| Temps | Actif | Passif
| Présent | They make cars here. | Cars are made here.
| Prétérit | Someone stole my bike. | My bike was stolen.
| Present perfect | They have built a bridge. | A bridge has been built.
| Futur | They will open a shop. | A shop will be opened.
| Modal | You must do it. | It must be done.
> English is spoken all over the world. | On parle anglais partout dans le monde.
> The Mona Lisa was painted by Leonardo da Vinci. | La Joconde a été peinte par Léonard de Vinci.
> I was told that the shop was closed. | On m'a dit que le magasin était fermé.
x I was explained the problem. | The problem was explained to me.
? This house ___ (build) in 1850. => was built // Prétérit passif.
? Rice ___ (grow) in China. => is grown // Présent passif.
? The thief ___ (arrest) yesterday. => was arrested // Prétérit passif.
? The results ___ (publish) next week. => will be published // Futur passif.
* « On m'a volé mon portefeuille » [My wallet was stolen.|My wallet stole.] => My wallet was stolen. // on → passif.
* The emails have ___ sent. [be|been|being] => been // have been + participe.
`},
{ id: 'gerund-infinitive', lv: 3, title: 'Gérondif ou infinitif ?', en: 'Gerund vs infinitive', body: `
# Verbe + -ing
Après **enjoy, finish, mind, avoid, suggest, keep, consider, practise, miss, can't stand, give up, look forward to**, et après une préposition.
> I enjoy reading. | J'aime lire.
> She's good at drawing. | Elle est douée en dessin.
> I'm looking forward to seeing you. | J'ai hâte de te voir.
# Verbe + to + base
Après **want, decide, hope, plan, learn, need, promise, refuse, agree, afford, manage, would like**.
> I want to go home. | Je veux rentrer.
> They decided to move. | Ils ont décidé de déménager.
# Les deux, avec un changement de sens
| Verbe | + -ing | + to
| stop | arrêter de faire (I stopped smoking) | s'arrêter pour faire (I stopped to smoke)
| remember | se souvenir d'avoir fait | penser à faire
| try | essayer (pour voir) | s'efforcer de
! Le gérondif peut être **sujet** : **Swimming is good for you.** (Nager, c'est bon pour la santé.)
x I enjoy to dance. | I enjoy dancing.
x I look forward to see you. | I look forward to seeing you.
? I've finished ___ (write) the report. => writing // finish + -ing.
? She decided ___ (study) law. => to study // decide + to.
? Do you mind ___ (open) the window? => opening // mind + -ing.
? Remember ___ (lock) the door when you leave! => to lock // Penser à faire.
* He stopped ___ to answer the phone. (s'est arrêté pour) [walking|to walk] => walking // stop + -ing : il a arrêté de marcher pour répondre.
* I can't afford ___ a new car. [buying|to buy] => to buy // afford + to.
`},
{ id: 'relative-clauses', lv: 3, title: 'Les propositions relatives', en: 'Relative clauses', body: `
| Pronom | Pour | Exemple
| who | personnes | The man who lives next door is a pilot.
| which | choses, animaux | The car which I bought is red.
| that | personnes ou choses (relative essentielle) | The film that we saw was great.
| whose | possession (dont) | The girl whose bag was stolen…
| where | lieu (où) | The town where I grew up…
| when | temps (où) | The day when we met…
> She's the woman who helped me. | C'est la femme qui m'a aidé.
> This is the book (that) I told you about. | Voici le livre dont je t'ai parlé.
# Omettre le pronom
Quand le pronom est **complément** (pas sujet), on peut l'omettre : **The man (who) I met** / **The film (that) we watched**.
# Relatives non essentielles (avec virgules)
Elles ajoutent une info. On n'utilise jamais **that** et on ne peut pas omettre le pronom.
> My brother, who lives in Berlin, is an architect. | Mon frère, qui vit à Berlin, est architecte.
x The man which… | The man who…
x My car, that is old, … | My car, which is old, …
? That's the hotel ___ we stayed last year. => where // Lieu.
? I have a friend ___ father is a famous singer. => whose // Possession.
? The people ___ live upstairs are noisy. => who/that // Personnes, sujet.
* Paris, ___ is the capital of France, is beautiful. [that|which|who] => which // Relative non essentielle → which.
* The pizza ___ we ordered was cold. [who|which|where] => which // Chose.
`},
{ id: 'modals-possibility', lv: 3, title: 'May, might, could (possibilité)', en: 'Modals of possibility', body: `
| Modal | Certitude | Exemple
| will | ~100 % | She will be there.
| must | quasi certain (déduction) | He must be tired after that trip.
| may | possible (~50 %) | It may rain later.
| might / could | possible (moins sûr) | She might come, I don't know.
| can't | impossible (déduction) | That can't be true!
> He may be at home. | Il est peut-être chez lui.
> We might go to Spain this summer. | On ira peut-être en Espagne cet été.
> You must be joking! | Tu plaisantes !
! Le contraire de **must** (déduction) est **can't**, pas « mustn't ».
? Take an umbrella. It ___ rain. => may/might/could // Possibilité.
? She's been working for 12 hours. She ___ be exhausted. => must // Déduction quasi certaine.
? That ___ be Tom — he's in Australia! => can't/cannot // Impossibilité.
* I'm not sure. I ___ go to the party. [must|might|can't] => might // Incertitude.
* He has three Ferraris. He ___ be very rich. [must|can't|might not] => must // Déduction logique.
`},
{ id: 'question-tags', lv: 3, title: 'Les question tags', en: 'Question tags', body: `
# « …n'est-ce pas ? »
On reprend l'**auxiliaire** et le **pronom**. Phrase affirmative → tag négatif ; phrase négative → tag affirmatif.
> You're French, aren't you? | Tu es français, n'est-ce pas ?
> She doesn't eat meat, does she? | Elle ne mange pas de viande, si ?
> They went home, didn't they? | Ils sont rentrés, non ?
> You can swim, can't you? | Tu sais nager, hein ?
# Cas particuliers
**I am → aren't I?** · **Let's → shall we?** · Impératif → **will you?**
> I'm late, aren't I? | Je suis en retard, non ?
> Let's go, shall we? | On y va ?
? It's cold today, ___? => isn't it // is → isn't it.
? You live in Lyon, ___? => don't you // présent simple → do.
? She hasn't called, ___? => has she // Négatif → tag positif.
? He went to the party, ___? => didn't he // Prétérit → did.
* I'm right, ___? [amn't I|aren't I|am I not] => aren't I // Exception : aren't I.
* Let's have a break, ___? [shall we|will we|don't we] => shall we // Let's → shall we.
`},
{ id: 'reported-requests-say-tell', lv: 3, title: 'Say ou tell ? Make ou do ?', en: 'Say/tell, make/do', body: `
# Say / tell
**Tell** est suivi de la personne : **tell someone something**. **Say** est suivi de ce qui est dit : **say something (to someone)**.
> She told me the truth. | Elle m'a dit la vérité.
> He said that he was tired. | Il a dit qu'il était fatigué.
> He said hello to me. | Il m'a dit bonjour.
Expressions avec tell : **tell the truth, tell a lie, tell a story, tell a joke, tell the time**.
# Make / do
**Make** = créer, fabriquer, produire. **Do** = activité, tâche, travail.
| make | do
| make a cake, make a mistake | do homework, do the housework
| make a decision, make money | do business, do exercise
| make a noise, make friends | do your best, do a favour
| make a phone call, make the bed | do the dishes, do the shopping
x She said me… | She told me… / She said to me…
x I did a mistake. | I made a mistake.
? Can you ___ me a favour? => do // do a favour.
? He ___ a lot of mistakes in his test. => made // make a mistake.
? Don't ___ lies! => tell // tell a lie.
? She ___ that she was hungry. => said // say + ce qui est dit.
* I need to ___ a decision. [do|make] => make // make a decision.
* Could you ___ me the way to the station? [say|tell] => tell // tell + personne.
`},
// ---------------- B2
{ id: 'past-perfect', lv: 4, title: 'Le plus-que-parfait (past perfect)', en: 'Past perfect simple & continuous', tense: true, body: `
# Le passé du passé
= Sujet + had + participe passé
On l'utilise pour une action **antérieure** à une autre action passée. C'est le plus-que-parfait français.
> When I arrived, the film had already started. | Quand je suis arrivé, le film avait déjà commencé.
> She had never seen snow before she moved to Canada. | Elle n'avait jamais vu la neige avant de s'installer au Canada.
# Past perfect continu
= Sujet + had been + verbe-ing
Pour insister sur la **durée** avant un moment passé.
> I had been waiting for two hours when he finally called. | J'attendais depuis deux heures quand il a enfin appelé.
| Ordre des événements | Phrase
| 1. le train part → 2. j'arrive | When I got to the station, the train had left.
| 1. j'arrive → 2. le train part | When I got to the station, the train left.
? By the time we arrived, they ___ (eat) everything. => had eaten/'d eaten // Action antérieure.
? I didn't recognise her because she ___ (change) so much. => had changed/'d changed // Antériorité.
? He was tired because he ___ (run) for an hour. => had been running/'d been running // Durée avant un moment passé.
* I realised I ___ my wallet at home. [left|had left] => had left // L'oubli est antérieur.
* She ___ there for ten years before she got promoted. [had been working|has been working] => had been working // Durée avant un moment passé.
`},
{ id: 'future-continuous-perfect', lv: 4, title: 'Futur continu et futur antérieur', en: 'Future continuous & future perfect', tense: true, body: `
# Futur continu : will be + -ing
Action **en cours** à un moment du futur.
> This time tomorrow, I'll be lying on the beach. | Demain à cette heure-ci, je serai allongé sur la plage.
> Will you be using the car tonight? | Tu auras besoin de la voiture ce soir ?
# Futur antérieur : will have + participe passé
Action **terminée avant** un moment du futur.
> By 2030, I will have finished my studies. | D'ici 2030, j'aurai terminé mes études.
> Don't call at 6 — I won't have arrived yet. | N'appelle pas à 6 h, je ne serai pas encore arrivé.
# Futur antérieur continu : will have been + -ing
> By June, I'll have been working here for 10 years. | En juin, cela fera 10 ans que je travaille ici.
! **by** = au plus tard, d'ici. Signal typique du futur antérieur.
? At 9 tonight, I ___ (watch) the match. => will be watching/'ll be watching // En cours à un moment futur.
? By the end of the year, we ___ (save) €5,000. => will have saved/'ll have saved // Terminé avant un moment futur.
? By next month, she ___ (work) here for a year. => will have been working/'ll have been working // Durée jusqu'à un point futur.
* Don't phone between 8 and 9; we ___ dinner. [will have|will be having] => will be having // En cours.
* By the time you get here, I ___ the cake. [will finish|will have finished] => will have finished // Terminé avant.
`},
{ id: 'conditional-3-mixed', lv: 4, title: 'Conditionnel 3 et conditionnels mixtes', en: 'Third & mixed conditionals', tense: true, body: `
# Conditionnel 3 : regret sur le passé
= If + past perfect, would have + participe passé
> If I had studied, I would have passed the exam. | Si j'avais étudié, j'aurais réussi l'examen.
> If you hadn't helped me, I would have failed. | Si tu ne m'avais pas aidé, j'aurais échoué.
> We wouldn't have got lost if we had taken a map. | On ne se serait pas perdus si on avait pris une carte.
# Conditionnels mixtes
Condition passée → conséquence **présente** :
= If + past perfect, would + verbe (base)
> If I had taken that job, I would be rich now. | Si j'avais accepté ce poste, je serais riche aujourd'hui.
Condition présente → conséquence **passée** :
> If I were braver, I would have told her. | Si j'étais plus courageux, je le lui aurais dit.
| Type | Condition | Conséquence
| 0 | If + présent | présent
| 1 | If + présent | will + base
| 2 | If + prétérit | would + base
| 3 | If + past perfect | would have + participe
x If I would have known… | If I had known…
? If she ___ (leave) earlier, she wouldn't have missed the train. => had left/'d left // Conditionnel 3.
? If I had known you were coming, I ___ (bake) a cake. => would have baked/'d have baked // Conditionnel 3.
? If I had gone to bed earlier, I ___ (not / be) so tired now. => wouldn't be/would not be // Mixte : conséquence présente.
* If we ___ the bus, we would have arrived on time. [caught|had caught] => had caught // If + past perfect.
* If he spoke Spanish, he ___ the job last year. [would get|would have got] => would have got // Mixte : conséquence passée.
`},
{ id: 'reported-speech', lv: 4, title: 'Le discours indirect', en: 'Reported speech', body: `
# Le recul des temps
Quand le verbe introducteur est au passé (**said, told, asked**), on « recule » le temps d'un cran.
| Discours direct | Discours indirect
| présent : "I am tired." | prétérit : She said she was tired.
| présent continu : "I'm working." | passé continu : He said he was working.
| prétérit : "I saw it." | past perfect : She said she had seen it.
| present perfect : "I've finished." | past perfect : He said he had finished.
| will : "I'll come." | would : She said she would come.
| can : "I can help." | could : He said he could help.
| must : "I must go." | had to : She said she had to go.
# Les repères changent aussi
**now → then, today → that day, tomorrow → the next day, yesterday → the day before, here → there, this → that, ago → before**.
# Questions et ordres rapportés
Pas d'inversion dans une question rapportée ; **if / whether** pour les questions fermées.
> "Where do you live?" → He asked me where I lived. | Il m'a demandé où j'habitais.
> "Are you OK?" → She asked if I was OK. | Elle m'a demandé si j'allais bien.
> "Sit down." → He told me to sit down. | Il m'a dit de m'asseoir.
> "Don't shout." → She told us not to shout. | Elle nous a dit de ne pas crier.
x He asked me where did I live. | He asked me where I lived.
? "I like pizza." → She said she ___ pizza. => liked // présent → prétérit.
? "I will call you." → He said he ___ call me. => would // will → would.
? "We have finished." → They said they ___ finished. => had // present perfect → past perfect.
? "Do you speak French?" → She asked me ___ I spoke French. => if/whether // Question fermée.
* "Close the door." → He told me ___ the door. [close|to close|closing] => to close // Ordre → tell + to.
* He asked me where ___. [was the station|the station was] => the station was // Pas d'inversion.
`},
{ id: 'passive-advanced', lv: 4, title: 'Passif avancé et « have something done »', en: 'Advanced passive', body: `
# Le passif à tous les temps
| Temps | Exemple
| présent continu | The road is being repaired.
| passé continu | The room was being cleaned.
| past perfect | The tickets had been sold out.
| infinitif | It needs to be done today.
| gérondif | I hate being interrupted.
# Structures impersonnelles
> It is said that he is a millionaire. / He is said to be a millionaire. | On dit qu'il est millionnaire.
> She is believed to have left the country. | On pense qu'elle a quitté le pays.
# Faire faire : have / get something done
= have / get + objet + participe passé
> I had my hair cut yesterday. | Je me suis fait couper les cheveux hier.
> We're getting the kitchen painted. | Nous faisons repeindre la cuisine.
> He had his car stolen. | Il s'est fait voler sa voiture.
x I cut my hair at the hairdresser's. | I had my hair cut at the hairdresser's.
? The bridge ___ (repair) at the moment. => is being repaired // Passif au présent continu.
? I need to have my eyes ___ (test). => tested // have + objet + participe.
? He is said ___ (be) the best chef in town. => to be // be said to + base.
* She hates ___ told what to do. [being|been|be] => being // Gérondif passif.
* We're going to ___ our house painted. [make|have|do] => have // have something done.
`},
{ id: 'wish', lv: 4, title: 'Wish / if only (souhaits et regrets)', en: 'Wish & if only', tense: true, body: `
| Structure | Sens | Exemple
| wish + prétérit | regret sur le présent | I wish I had more time. (J'aimerais avoir plus de temps.)
| wish + past perfect | regret sur le passé | I wish I hadn't said that. (Je regrette d'avoir dit ça.)
| wish + would | agacement / souhait de changement | I wish you would stop talking! (Si seulement tu arrêtais !)
| wish + could | capacité souhaitée | I wish I could fly.
> If only I knew the answer! | Si seulement je connaissais la réponse !
> She wishes she had studied medicine. | Elle regrette de ne pas avoir fait médecine.
! Avec be : **I wish I were taller** (were plus soutenu, was accepté à l'oral).
? I wish I ___ (be) on holiday right now. => were/was // Regret présent → prétérit.
? I wish I ___ (not / eat) so much last night. => hadn't eaten/had not eaten // Regret passé.
? I wish it ___ (stop) raining! => would stop // Souhait de changement.
* If only I ___ his number, I could call him. [know|knew|had known] => knew // Regret présent.
* She wishes she ___ to the party yesterday. [went|had gone] => had gone // Regret passé.
`},
{ id: 'modals-past', lv: 4, title: 'Modaux au passé (should have, must have…)', en: 'Past modals', tense: true, body: `
= Modal + have + participe passé
| Structure | Sens | Exemple
| should have done | reproche / regret | You should have told me. (Tu aurais dû me le dire.)
| shouldn't have done | reproche | I shouldn't have eaten so much.
| must have done | déduction certaine | He must have forgotten. (Il a dû oublier.)
| can't / couldn't have done | impossibilité | She can't have seen us.
| might / may / could have done | possibilité passée | They might have missed the bus.
| could have done | possibilité non réalisée | You could have been killed!
| needn't have done | inutile (mais fait) | You needn't have bought flowers.
> The ground is wet. It must have rained. | Le sol est mouillé. Il a dû pleuvoir.
> I could have won if I had trained more. | J'aurais pu gagner si je m'étais plus entraîné.
? You ___ (should / call) me, I was worried! => should have called // Reproche.
? He isn't answering. He ___ (must / fall) asleep. => must have fallen // Déduction.
? She ___ (can't / write) this; she doesn't speak English. => can't have written/cannot have written // Impossibilité.
* I'm not sure where they are. They ___ the train. [must have missed|might have missed] => might have missed // Simple possibilité.
* You ___ have come — the meeting was cancelled. [needn't|mustn't] => needn't // Inutile.
`},
{ id: 'phrasal-verbs-grammar', lv: 4, title: 'Les phrasal verbs : mode d\'emploi', en: 'Phrasal verbs', body: `
# Qu'est-ce que c'est ?
Un verbe + une particule (**up, out, off, on, away, down, back…**) qui change le sens : **give** (donner) → **give up** (abandonner).
# Séparables ou non ?
Beaucoup sont **séparables** : le complément peut se placer avant ou après la particule. Mais si c'est un **pronom**, il se place **obligatoirement au milieu**.
> Turn off the light. / Turn the light off. / Turn it off. | Éteins la lumière.
x Turn off it. | Turn it off.
Certains sont **inséparables** : **look after, get over, come across, run into, look for**.
> She looks after her little brother. | Elle s'occupe de son petit frère.
# Les particules ont souvent un sens
| Particule | Idée | Exemples
| up | achèvement, augmentation | eat up, use up, grow up, speak up
| out | vers l'extérieur, jusqu'au bout | find out, run out, work out
| off | départ, arrêt | take off, turn off, set off, call off
| on | continuité | carry on, go on, keep on
| back | retour | come back, call back, pay back
| down | diminution, écrit | slow down, calm down, write down
? Can you pick ___ the kids from school? => up // pick up = aller chercher.
? We've run ___ of milk. => out // run out of = être à court.
? The match was called ___ because of the rain. => off // call off = annuler.
? Please write it ___ so you don't forget. => down // write down = noter.
* This music is too loud. Can you turn ___? [down it|it down] => it down // Pronom au milieu.
* I'm looking ___ my glasses. Have you seen them? [after|for|up] => for // look for = chercher.
`},
{ id: 'linking-words', lv: 4, title: 'Les connecteurs logiques', en: 'Linking words', body: `
| Idée | Connecteurs | Construction
| Opposition | although, even though, though | + sujet + verbe
| Opposition | despite, in spite of | + nom ou -ing
| Opposition | however, nevertheless | en début de phrase + virgule
| Opposition | whereas, while | contraste entre deux faits
| Cause | because, as, since | + sujet + verbe
| Cause | because of, due to | + nom
| Conséquence | so, therefore, as a result, consequently |
| But | to, in order to, so as to | + base verbale
| But | so that | + sujet + can / could / would
| Addition | moreover, furthermore, in addition, besides |
> Although it was raining, we went out. | Bien qu'il pleuve, nous sommes sortis.
> Despite the rain, we went out. | Malgré la pluie, nous sommes sortis.
> He was ill. However, he went to work. | Il était malade. Pourtant, il est allé travailler.
> I'm learning English in order to work abroad. | J'apprends l'anglais pour travailler à l'étranger.
x Despite it was raining… | Although it was raining… / Despite the rain…
x For to learn… | To learn… / In order to learn…
? ___ being tired, she finished the race. => Despite/In spite of // + -ing.
? ___ he's rich, he isn't happy. => Although/Even though/Though // + sujet + verbe.
? The flight was cancelled ___ the storm. => because of/due to // + nom.
? I'm saving money ___ I can buy a car. => so that // so that + sujet + can.
* I like tea, ___ my wife prefers coffee. [whereas|despite|so that] => whereas // Contraste.
* The project was expensive. ___, it was a success. [Although|However|Despite] => However // Début de phrase + virgule.
`},
{ id: 'quantifiers-advanced', lv: 4, title: 'Both, either, neither, all, none, each', en: 'Quantifiers', body: `
| Mot | Sens | Exemple
| both (… and) | les deux | Both my parents are teachers.
| either (… or) | l'un ou l'autre | You can choose either option.
| neither (… nor) | ni l'un ni l'autre | Neither answer is correct.
| all | tous | All the students passed.
| none (of) | aucun | None of my friends came.
| each | chaque (individuellement) | Each child got a present.
| every | chaque (tous) | I go there every day.
> I like both tea and coffee. | J'aime le thé et le café.
> Neither Tom nor Anna was there. | Ni Tom ni Anna n'étaient là.
> "I don't like it." — "Me neither. / Neither do I." | « Je n'aime pas ça. » — « Moi non plus. »
> "I love it." — "So do I. / Me too." | « J'adore. » — « Moi aussi. »
? "I can't swim." — "___ can I." => Neither/Nor // Moi non plus.
? "I'm hungry." — "___ am I." => So // Moi aussi.
? ___ of my two brothers lives in Paris; they both live in Lyon. => Neither // Aucun des deux.
* You can have ___ cake or ice cream, not both. [either|neither|both] => either // either … or.
* ___ of the guests arrived on time; they were all late. [None|Neither|Nobody] => None // Aucun (plus de deux).
`},
{ id: 'causative-make-let', lv: 4, title: 'Make, let, allow, get (faire faire, laisser)', en: 'Make, let, allow', body: `
| Verbe | Sens | Construction
| make sb do | obliger à / faire faire | My mum made me tidy my room.
| let sb do | laisser faire | My parents let me stay out late.
| allow sb to do | permettre de | We aren't allowed to use phones.
| get sb to do | persuader de | I got him to fix my bike.
> Don't make me laugh! | Ne me fais pas rire !
> Let me help you. | Laisse-moi t'aider.
! **make** et **let** sont suivis de la base sans « to ». Au passif : **I was made to wait** (avec to !).
x She made me to wait. | She made me wait.
x Let me to explain. | Let me explain.
? The teacher made us ___ (rewrite) the essay. => rewrite // make + base.
? They don't allow people ___ (smoke) here. => to smoke // allow + to.
? I finally got my brother ___ (help) me. => to help // get + to.
* My parents never ___ me watch TV at night. [let|allowed|made to] => let // let + base.
* We were made ___ for two hours. [wait|to wait|waiting] => to wait // Passif de make → to.
`},
]
