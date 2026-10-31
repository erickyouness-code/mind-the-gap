// Grammar lessons A1–A2. Mini-markup, parsed by src/lib/lesson.ts:
// "# " section, "= " formula, "> en | fr" example, "! " tip, "x wrong | right" common mistake,
// "| a | b" table row (first row = header), "? q ___ => ans1/ans2 // why" gap exercise,
// "* q [a|b|c] => b // why" multiple choice. Other lines = paragraphs (**bold**, `code`).
import type { RawLesson } from './types'

export const grammarA: RawLesson[] = [
{ id: 'be-present', lv: 1, title: 'Le verbe « to be » au présent', en: 'To be — present', tense: false, body: `
# À quoi ça sert
**To be** veut dire « être ». C'est le verbe le plus important de l'anglais : il sert à dire qui on est, comment on va, l'âge, le métier, la nationalité, où l'on se trouve.
! En anglais, on dit **I am 20** (« je suis 20 ») et non « j'ai 20 ans ». De même : **I am hungry** (j'ai faim), **I am cold** (j'ai froid), **I am right** (j'ai raison).
# Conjugaison
| Forme pleine | Contraction | Négation | Question
| I am | I'm | I'm not | Am I…?
| you are | you're | you aren't | Are you…?
| he / she / it is | he's / she's / it's | he isn't | Is he…?
| we are | we're | we aren't | Are we…?
| they are | they're | they aren't | Are they…?
= Sujet + am / is / are + complément
> I'm a student. | Je suis étudiant.
> She is 25 years old. | Elle a 25 ans.
> They aren't at home. | Ils ne sont pas à la maison.
> Are you tired? — Yes, I am. | Tu es fatigué ? — Oui.
# Réponses courtes
On répond avec **Yes, + sujet + verbe** ou **No, + sujet + verbe + not**. On ne contracte jamais une réponse courte positive : **Yes, I am** (jamais « Yes, I'm »).
> Is it cold? — No, it isn't. | Il fait froid ? — Non.
x I have 30 years. | I am 30 (years old).
x I am agree. | I agree.
? I ___ from France. => am/'m // Avec I, on utilise toujours am.
? My brother ___ a doctor. => is/'s // He / she / it / un nom singulier → is.
? We ___ late! Hurry up! => are/'re // We → are.
? ___ you hungry? => Are // Question : on inverse le verbe et le sujet.
* They ___ my friends. [is|am|are] => are // They → are.
* « J'ai froid » se dit : [I have cold|I am cold|I'm having cold] => I am cold // Les sensations physiques utilisent to be.
* Is she English? — No, she ___. [isn't|not|doesn't] => isn't // Réponse courte : No, she isn't.
* Quelle réponse courte est correcte ? [Yes, I'm.|Yes, I am.|Yes, am.] => Yes, I am. // Pas de contraction en fin de réponse courte positive.
`},
{ id: 'pronouns-possessives', lv: 1, title: 'Pronoms et possessifs', en: 'Pronouns & possessives', body: `
# Les pronoms personnels
| Sujet | Complément | Adj. possessif | Pronom possessif
| I (je) | me | my (mon, ma, mes) | mine (le mien)
| you (tu/vous) | you | your | yours
| he (il) | him | his | his
| she (elle) | her | her | hers
| it (il/elle, chose/animal) | it | its | —
| we (nous) | us | our | ours
| they (ils/elles) | them | their | theirs
! **It** s'utilise pour les objets et les animaux. Une table n'est ni masculine ni féminine en anglais.
# Le possessif s'accorde avec le possesseur
En français, « sa » s'accorde avec l'objet. En anglais, **his / her** dépend de la personne qui possède.
> Paul loves his mother. | Paul aime sa mère.
> Julie loves her father. | Julie aime son père.
> The dog is eating its food. | Le chien mange sa nourriture.
> This book is mine, not yours. | Ce livre est à moi, pas à toi.
x Julie and his brother | Julie and her brother
x it's tail (= it is) | its tail
? Marie is calling ___ mother. => her // Le possesseur est Marie (féminin) → her.
? Tom and Lisa love ___ new house. => their // Possesseurs pluriels → their.
? Can you help ___? I'm lost. => me // Pronom complément de I → me.
? That bag isn't hers, it's ___ (à moi). => mine // Pronom possessif de I → mine.
* The cat is licking ___ paws. [it's|its|his] => its // its = possessif ; it's = it is.
* I see ___ every day. (eux) [they|them|their] => them // Pronom complément → them.
* John lost ___ keys. [her|his|its] => his // John est un homme → his.
`},
{ id: 'articles', lv: 1, title: 'Les articles a, an, the', en: 'Articles', body: `
# A / An : un, une
On utilise **a** devant un son consonne et **an** devant un son voyelle. C'est le **son** qui compte, pas la lettre.
> a car, a dog, a university (/juː/) | une voiture, un chien, une université
> an apple, an egg, an hour (h muet) | une pomme, un œuf, une heure
# The : le, la, les
**The** est le même au singulier et au pluriel. On l'utilise quand on parle d'une chose précise, déjà connue ou unique.
> The sun is hot. | Le soleil est chaud.
> I bought a dress. The dress is red. | J'ai acheté une robe. La robe est rouge.
# Pas d'article (généralités)
Pour parler **en général**, l'anglais n'utilise pas d'article, alors que le français dit « le, la, les ».
> I love cats. | J'aime les chats.
> Life is beautiful. | La vie est belle.
> She plays tennis and speaks English. | Elle joue au tennis et parle anglais.
! Métiers : **She is a nurse** (elle est infirmière) — l'anglais exige « a ».
x I like the music. (en général) | I like music.
x He is teacher. | He is a teacher.
? She is ___ engineer. => an // engineer commence par un son voyelle.
? I need ___ umbrella. => an // umbrella commence par un son voyelle.
? It's ___ honour to meet you. => an // Le h de honour est muet.
* ___ dogs are loyal animals. (en général) [The|A|—] => — // Généralité au pluriel : pas d'article.
* He's ___ European citizen. [a|an|the] => a // European se prononce /jʊə/ : son consonne.
* Can you close ___ door, please? [a|the|—] => the // Une porte précise, connue de tous.
`},
{ id: 'plurals', lv: 1, title: 'Le pluriel des noms', en: 'Plural nouns', body: `
# Règle générale : + s
> a book → two books | un livre → deux livres
# Cas particuliers
| Terminaison | Règle | Exemple
| -s, -ss, -sh, -ch, -x, -o | + es | bus → buses, box → boxes, potato → potatoes
| consonne + y | y → ies | city → cities, baby → babies
| voyelle + y | + s | day → days, boy → boys
| -f / -fe | → ves | knife → knives, wife → wives, leaf → leaves
# Pluriels irréguliers
| Singulier | Pluriel
| man | men
| woman | women
| child | children
| person | people
| foot | feet
| tooth | teeth
| mouse | mice
| sheep / fish | sheep / fish
! **People** est déjà un pluriel : **people are**, jamais « people is ».
? one child, three ___ => children // Pluriel irrégulier.
? a city, two ___ => cities // consonne + y → ies.
? a knife, four ___ => knives // -fe → ves.
? a box, many ___ => boxes // -x → es.
* The people here ___ very friendly. [is|are] => are // people = pluriel.
* one foot, two ___ [foots|feet|feets] => feet // Pluriel irrégulier.
* a toy, some ___ [toies|toys] => toys // voyelle + y → s simplement.
`},
{ id: 'present-simple', lv: 1, title: 'Le présent simple', en: 'Present simple', tense: true, body: `
# Quand l'utiliser
- Habitudes et routines : **I get up at 7.**
- Vérités générales : **Water boils at 100°C.**
- Goûts, opinions, états : **She likes jazz.**
- Horaires fixes : **The train leaves at 9.**
# Forme affirmative
= Sujet + verbe (base) — avec **-s** à la 3e personne (he / she / it)
| Sujet | Verbe
| I / you / we / they | work
| he / she / it | work**s**
> He works in a bank. | Il travaille dans une banque.
> My parents live in Lyon. | Mes parents habitent à Lyon.
Orthographe du -s : **go → goes, watch → watches, study → studies, have → has**.
# Négation et question : l'auxiliaire do / does
= Sujet + don't / doesn't + verbe (base)
= Do / Does + sujet + verbe (base) ?
> I don't eat meat. | Je ne mange pas de viande.
> She doesn't speak Spanish. | Elle ne parle pas espagnol.
> Do you like coffee? — Yes, I do. | Tu aimes le café ? — Oui.
> Where does he live? | Où habite-t-il ?
! Avec **does / doesn't**, le verbe perd son -s : **She doesn't work** (pas « doesn't works »).
# Mots-clés
**always, usually, often, sometimes, rarely, never, every day, on Mondays, once a week**
x She work in Paris. | She works in Paris.
x Does he likes it? | Does he like it?
x I am agree with you. | I agree with you.
? She ___ (watch) TV every evening. => watches // 3e personne + -ch → -es.
? My father ___ (not / drink) coffee. => doesn't drink/does not drink // Négation à la 3e personne → doesn't + base.
? ___ you speak English? => Do // Question avec you → Do.
? He ___ (study) medicine. => studies // consonne + y → ies.
? Where ___ your sister work? => does // 3e personne → does.
* The shop ___ at 9 a.m. every day. [open|opens|is opening] => opens // Horaire fixe, 3e personne.
* They ___ live here. [doesn't|don't|isn't] => don't // they → don't.
* Does she ___ chocolate? [likes|like|liking] => like // Après does : verbe à la base.
`},
{ id: 'there-is', lv: 1, title: 'There is / There are', en: 'There is / there are', body: `
# Il y a
**There is** (singulier) et **there are** (pluriel) traduisent « il y a » pour dire que quelque chose existe ou se trouve quelque part.
| | Singulier | Pluriel
| Affirmatif | There is (there's) a cat. | There are two cats.
| Négatif | There isn't a cat. | There aren't any cats.
| Question | Is there a cat? | Are there any cats?
> There's a bakery near my house. | Il y a une boulangerie près de chez moi.
> Are there any questions? | Y a-t-il des questions ?
> There were a lot of people. | Il y avait beaucoup de monde.
! Pour « il y a + durée » (passé), on utilise **ago** : **two years ago** = il y a deux ans.
x It has a problem. (il y a) | There is a problem.
? ___ a lot of tourists in summer. => There are // tourists = pluriel.
? ___ there a bank near here? => Is // Question au singulier.
? There ___ any milk in the fridge. => isn't/is not // milk est indénombrable → singulier.
* I met him three years ___. [ago|there are|before] => ago // « il y a + durée » = ago.
* ___ two bedrooms in my flat. [There is|There are|It has] => There are // Pluriel.
`},
{ id: 'have-got', lv: 1, title: 'Have / have got (avoir)', en: 'Have & have got', body: `
# Deux façons de dire « avoir »
**Have got** est très courant en anglais britannique ; **have** est universel.
| | have got | have
| Affirmatif | I've got a car. / She's got a car. | I have a car. / She has a car.
| Négatif | I haven't got a car. | I don't have a car.
| Question | Have you got a car? | Do you have a car?
> She's got blue eyes. | Elle a les yeux bleus.
> Do you have any brothers or sisters? | As-tu des frères et sœurs ?
# Have dans des expressions (sans got)
**have breakfast / lunch / dinner** (prendre le repas), **have a shower** (prendre une douche), **have a good time** (s'amuser), **have a look** (jeter un œil).
> We have lunch at noon. | Nous déjeunons à midi.
x I have got breakfast at 8. | I have breakfast at 8.
? He ___ got two sisters. => has/'s // he → has got.
? ___ you got a pen? => Have // Question avec have got.
? We don't ___ much time. => have // Négation avec do → have.
* She ___ a shower every morning. [has got|has|have] => has // Action/habitude : have sans got.
* I ___ any money. [haven't got|don't got|hasn't] => haven't got // Négatif de have got.
`},
{ id: 'can', lv: 1, title: 'Can / can\'t (capacité, permission)', en: 'Can', body: `
# Pouvoir, savoir faire
**Can** exprime la capacité (savoir faire), la possibilité et la permission. Il est invariable : pas de -s, pas de « to ».
= Sujet + can / can't + verbe (base)
> I can swim. | Je sais nager.
> She can't come tonight. | Elle ne peut pas venir ce soir.
> Can I open the window? | Je peux ouvrir la fenêtre ?
> Can you help me, please? | Peux-tu m'aider, s'il te plaît ?
# Au passé : could
> When I was five, I could read. | À cinq ans, je savais lire.
! Plus poli : **Could you…?** / **May I…?**
x He cans swim. | He can swim.
x I can to drive. | I can drive.
? She ___ (savoir) play the piano. => can // Capacité → can + base.
? I'm sorry, I ___ come to your party. => can't/cannot // Impossibilité → can't.
? When he was young, he ___ run very fast. => could // Capacité dans le passé → could.
* ___ I use your phone? [Can|Do|Am] => Can // Demande de permission.
* He can ___ three languages. [speaks|speak|to speak] => speak // can + base verbale.
`},
{ id: 'questions', lv: 1, title: 'Poser des questions', en: 'Questions & question words', body: `
# Les mots interrogatifs
| Anglais | Français
| What | Que / quoi / quel
| Who | Qui
| Where | Où
| When | Quand
| Why | Pourquoi
| How | Comment
| Which | Lequel / quel (choix limité)
| Whose | À qui
| How much / How many | Combien (indénombrable / dénombrable)
| How old / How long / How often | Quel âge / Combien de temps / À quelle fréquence
# La structure
= Mot interrogatif + auxiliaire + sujet + verbe ?
> Where do you live? | Où habites-tu ?
> What is your name? | Comment t'appelles-tu ?
> Why are you laughing? | Pourquoi tu ris ?
> How often do you go to the gym? | Tu vas à la salle tous les combien ?
! Quand **who / what** est le sujet, pas d'auxiliaire : **Who called you?** (Qui t'a appelé ?)
x Where you live? | Where do you live?
x How many money? | How much money?
? ___ do you get up? — At 7. => When/What time // On demande une heure.
? ___ is your favourite colour? => What // Quoi / quel.
? ___ old are you? => How // Âge → How old.
? ___ bag is this? — It's Tom's. => Whose // À qui ?
* How ___ sugar do you want? [many|much] => much // sugar est indénombrable.
* ___ wrote this book? [Who|Who did|Whom did] => Who // who est sujet : pas d'auxiliaire.
* Where ___ she work? [do|does|is] => does // 3e personne → does.
`},
{ id: 'imperative', lv: 1, title: 'L\'impératif', en: 'Imperative', body: `
# Donner un ordre, un conseil, une instruction
On utilise le verbe à la base, sans sujet. Négation : **Don't + verbe**. Pour proposer : **Let's + verbe**.
> Open the door. | Ouvre / Ouvrez la porte.
> Don't touch that! | Ne touche pas à ça !
> Let's go to the beach. | Allons à la plage.
> Please sit down. | Asseyez-vous, je vous prie.
! Ajouter **please** rend la phrase beaucoup plus polie.
? ___ worry, everything will be fine. => Don't // Négation de l'impératif.
? ___ go to the cinema tonight! (allons) => Let's // Proposition → Let's.
* ___ the window, please. [Close|Closes|To close] => Close // Impératif = base verbale.
* ___ late tomorrow! [Not be|Don't be|Be not] => Don't be // Don't + base, même avec be.
`},
{ id: 'prepositions-time-place', lv: 1, title: 'In, on, at (temps et lieu)', en: 'Prepositions of time & place', body: `
# Le temps
| Préposition | Usage | Exemples
| at | heure précise, moments | at 6 o'clock, at night, at the weekend (UK), at Christmas
| on | jours, dates | on Monday, on 14 July, on my birthday
| in | mois, années, saisons, parties du jour | in May, in 2024, in summer, in the morning
> The meeting is at 10 on Friday. | La réunion est à 10 h vendredi.
> I was born in 1998. | Je suis né en 1998.
# Le lieu
| Préposition | Usage | Exemples
| at | un point, une adresse, un lieu d'activité | at the station, at home, at work, at school
| on | une surface, une ligne, un étage | on the table, on the wall, on the 3rd floor
| in | à l'intérieur, villes, pays | in the box, in London, in France
> She's at work. | Elle est au travail.
> The keys are on the table. | Les clés sont sur la table.
> I live in Paris. | J'habite à Paris.
! **in Paris** mais **at the airport** : une ville est un espace, un aéroport est un point de rendez-vous.
x I live at Paris. | I live in Paris.
x See you in Monday. | See you on Monday.
? My birthday is ___ June. => in // Mois → in.
? The film starts ___ 8:30. => at // Heure précise → at.
? I'll see you ___ Tuesday. => on // Jour → on.
? There's a picture ___ the wall. => on // Surface → on.
* She lives ___ Canada. [at|on|in] => in // Pays → in.
* I usually read ___ night. [in|at|on] => at // at night (expression fixe).
* We're meeting ___ the cinema. [at|on] => at // Lieu de rendez-vous → at.
`},
{ id: 'demonstratives', lv: 1, title: 'This, that, these, those', en: 'Demonstratives', body: `
# Proche ou éloigné ?
| | Proche (ici) | Éloigné (là-bas)
| Singulier | this (ce…-ci) | that (ce…-là)
| Pluriel | these (ces…-ci) | those (ces…-là)
> This is my brother. | Voici mon frère.
> I don't like those shoes. | Je n'aime pas ces chaussures-là.
> Who's that? | C'est qui, ça ?
! Au téléphone : **Hello, this is Anna.** (C'est Anna.)
? ___ apples here are delicious. => These // Proche + pluriel.
? Look at ___ bird over there! => that // Éloigné + singulier.
* I love ___ jeans you're wearing. [this|these|that] => these // jeans est pluriel.
* ___ houses on the hill are very old. [Those|That|This] => Those // Éloigné + pluriel.
`},
{ id: 'possessive-s', lv: 1, title: 'Le cas possessif (\'s)', en: 'Possessive \'s', body: `
# Exprimer l'appartenance
En anglais, on place le possesseur **avant** l'objet, avec **'s**.
= possesseur + 's + objet possédé
> Peter's car | la voiture de Peter
> my sister's room | la chambre de ma sœur
> my parents' house | la maison de mes parents (pluriel en -s → ' seul)
> the children's toys | les jouets des enfants (pluriel irrégulier → 's)
! Pour les objets, on préfère souvent **of** : **the end of the film**, **the top of the page**.
? the bike of Tom → ___ bike => Tom's // possesseur + 's.
? the room of my brothers → my ___ room => brothers' // pluriel en -s → '.
* the toys of the children [the children's toys|the childrens' toys] => the children's toys // children (pluriel irrégulier) + 's.
* « la fin du film » [the film's end|the end of the film] => the end of the film // Pour les choses, of est plus naturel.
`},
// ---------------- A2
{ id: 'present-continuous', lv: 2, title: 'Le présent continu (be + -ing)', en: 'Present continuous', tense: true, body: `
# Quand l'utiliser
- Action **en cours** au moment où l'on parle : **I'm cooking.** (Je suis en train de cuisiner.)
- Situation **temporaire** : **She's living with friends this month.**
- Projet **déjà organisé** dans le futur : **We're flying to Rome on Friday.**
- Changement en cours : **Prices are rising.**
= Sujet + am / is / are + verbe-ing
> What are you doing? — I'm reading. | Que fais-tu ? — Je lis.
> It isn't raining any more. | Il ne pleut plus.
> Are they coming tonight? | Ils viennent ce soir ?
# Orthographe du -ing
| Règle | Exemple
| e muet → on l'enlève | make → making, write → writing
| CVC accentué → double consonne | run → running, swim → swimming, stop → stopping
| -ie → -ying | lie → lying, die → dying
# Verbes d'état : pas de forme -ing
Les verbes qui expriment un état, un goût ou une pensée ne se mettent normalement pas à la forme continue : **know, like, love, hate, want, need, believe, understand, seem, own**.
x I am knowing the answer. | I know the answer.
x I'm wanting a coffee. | I want a coffee.
# Mots-clés
**now, right now, at the moment, currently, today, this week, Look! Listen!**
? Be quiet! The baby ___ (sleep). => is sleeping/'s sleeping // Action en cours.
? Look! It ___ (snow)! => is snowing/'s snowing // Look! → action en cours.
? They ___ (not / work) today. => aren't working/are not working // Négation au présent continu.
? ___ you ___ (listen) to me? => Are, listening // Structure : Are + sujet + -ing ?
* I ___ what you mean. [understand|am understanding] => understand // understand est un verbe d'état.
* He ___ (run) in the park right now. [runs|is runing|is running] => is running // run → running (double n).
`},
{ id: 'simple-vs-continuous', lv: 2, title: 'Présent simple ou continu ?', en: 'Present simple vs continuous', tense: true, body: `
# La différence clé
| Présent simple | Présent continu
| habitude, vérité, permanent | en ce moment, temporaire
| I work in Lyon. | I'm working in Paris this month.
| He usually drives to work. | Today he's taking the bus.
| What do you do? (ton métier) | What are you doing? (maintenant)
> She plays the guitar, but she isn't playing now. | Elle joue de la guitare, mais elle n'en joue pas en ce moment.
! Certains verbes changent de sens : **I think it's good** (opinion) / **I'm thinking about it** (réflexion en cours). **I have a car** (possession) / **I'm having lunch** (action).
? Water ___ (boil) at 100 degrees. => boils // Vérité générale.
? Shh! I ___ (talk) on the phone. => am talking/'m talking // En ce moment.
? He usually ___ (wear) jeans, but today he ___ (wear) a suit. => wears, is wearing/wears, 's wearing // Habitude / aujourd'hui.
* What ___ for a living? — I'm a nurse. [are you doing|do you do] => do you do // Question sur le métier → présent simple.
* I ___ about moving to Canada. [think|'m thinking] => 'm thinking // Réflexion en cours.
* She ___ two cars. [has|is having] => has // Possession : verbe d'état.
`},
{ id: 'past-be', lv: 2, title: 'Was / were (passé de « to be »)', en: 'Past of be', tense: true, body: `
| Affirmatif | Négatif | Question
| I / he / she / it was | wasn't | Was I / he…?
| you / we / they were | weren't | Were you…?
> I was tired yesterday. | J'étais fatigué hier.
> We weren't at home. | Nous n'étions pas à la maison.
> Where were you last night? | Où étais-tu hier soir ?
> There was a problem. / There were many people. | Il y avait un problème. / Il y avait beaucoup de monde.
? I ___ at the cinema last night. => was // I → was.
? They ___ very happy. => were // they → were.
? ___ she at work yesterday? => Was // Question, she → Was.
* There ___ a lot of cars on the road. [was|were] => were // cars = pluriel.
* You ___ late this morning. [wasn't|weren't] => weren't // you → were / weren't.
`},
{ id: 'past-simple', lv: 2, title: 'Le prétérit (past simple)', en: 'Past simple', tense: true, body: `
# Quand l'utiliser
Pour une action **terminée** dans le passé, à un moment **précis ou connu**. Il correspond au passé composé et au passé simple français.
> I visited London last year. | J'ai visité Londres l'année dernière.
> She called me two hours ago. | Elle m'a appelé il y a deux heures.
# Verbes réguliers : + ed
| Règle | Exemple
| règle générale | work → worked, play → played
| e final → + d | live → lived
| consonne + y → ied | study → studied
| CVC accentué → double | stop → stopped, plan → planned
# Verbes irréguliers
Il faut les apprendre ! **go → went, see → saw, buy → bought, eat → ate, take → took…** (voir la liste complète dans la section Verbes irréguliers).
# Négation et question : did
= Sujet + didn't + verbe (base)
= (Mot interrogatif) + Did + sujet + verbe (base) ?
> I didn't see him. | Je ne l'ai pas vu.
> Did you go out last night? — No, I didn't. | Tu es sorti hier soir ? — Non.
> What did she say? | Qu'est-ce qu'elle a dit ?
! Après **did / didn't**, le verbe revient à la base : **Did you go?** (pas « Did you went? »).
# Prononciation de -ed
| Son | Après | Exemples
| /t/ | p, k, f, s, sh, ch | stopped, worked, laughed, washed
| /d/ | sons voisés et voyelles | played, lived, called
| /ɪd/ | t, d | wanted, needed, decided
# Mots-clés
**yesterday, last week / month / year, ago, in 2010, when I was young**
x I didn't went. | I didn't go.
x Did she called you? | Did she call you?
? We ___ (watch) a great film last night. => watched // Régulier : + ed.
? She ___ (go) to Spain in 2019. => went // go → went.
? I ___ (not / see) the news. => didn't see/did not see // didn't + base.
? ___ you ___ (enjoy) the party? => Did, enjoy // Did + sujet + base.
? He ___ (buy) a new phone yesterday. => bought // buy → bought.
? They ___ (stop) the car. => stopped // CVC → double consonne.
* Where ___ you go on holiday? [did|were|do] => did // Question au passé → did.
* « wanted » se prononce avec un son… [/t/|/d/|/ɪd/] => /ɪd/ // Après t ou d → /ɪd/.
* I ___ him yesterday. [meet|met|meeted] => met // meet → met (irrégulier).
`},
{ id: 'future-will-going', lv: 2, title: 'Le futur : will ou be going to ?', en: 'Will vs be going to', tense: true, body: `
# Will
= Sujet + will ('ll) + verbe (base) — négation : won't
- Décision prise **sur le moment** : **I'm thirsty. — I'll get you some water.**
- Prédiction basée sur une **opinion** : **I think it will rain tomorrow.**
- Promesse, offre, refus : **I'll help you. / I won't tell anyone.**
> I'll call you later. | Je t'appellerai plus tard.
> She won't be happy. | Elle ne sera pas contente.
# Be going to
= Sujet + am / is / are + going to + verbe (base)
- **Intention** déjà décidée : **I'm going to learn Japanese next year.**
- Prédiction basée sur une **preuve visible** : **Look at those clouds! It's going to rain.**
> We're going to buy a house. | Nous allons acheter une maison.
> Be careful, you're going to fall! | Attention, tu vas tomber !
! Le présent continu sert aussi pour les **rendez-vous fixés** : **I'm meeting Sam at 6.**
? The phone is ringing. — OK, I ___ answer it. => 'll/will // Décision immédiate.
? I've decided: I ___ (go) to study abroad. => am going to go/'m going to go/am going to/'m going to // Intention déjà décidée.
? Don't worry, I ___ (not / tell) anybody. => won't tell/will not tell // Promesse → won't.
* Look at that car! It ___ crash! [will|is going to] => is going to // Preuve visible.
* I think Brazil ___ win the World Cup. [will|is going to] => will // Opinion → will.
* « Je vais t'aider » (offre spontanée) [I'll help you.|I help you.] => I'll help you. // Offre spontanée → will.
`},
{ id: 'comparatives', lv: 2, title: 'Comparatifs et superlatifs', en: 'Comparatives & superlatives', body: `
# Formation
| Adjectif | Comparatif | Superlatif
| court (1 syllabe) : tall | taller (than) | the tallest
| en -y : happy | happier | the happiest
| CVC : big | bigger | the biggest
| long (2+ syllabes) : expensive | more expensive | the most expensive
| good | better | the best
| bad | worse | the worst
| far | farther / further | the farthest / furthest
> My brother is taller than me. | Mon frère est plus grand que moi.
> It's the most beautiful city in the world. | C'est la plus belle ville du monde.
# Égalité et infériorité
> She's as tall as her mother. | Elle est aussi grande que sa mère.
> This film isn't as good as the book. | Ce film n'est pas aussi bon que le livre.
> This one is less expensive. | Celui-ci est moins cher.
# Plus… plus…
> The more you practise, the better you get. | Plus tu t'entraînes, plus tu progresses.
x more big | bigger
x the most good | the best
x in the world's (superlatif + of / in) | the best restaurant in town
? This exercise is ___ (easy) than the last one. => easier // easy → easier.
? Everest is ___ (high) mountain in the world. => the highest // Superlatif court.
? Today is ___ (bad) day of my life! => the worst // bad → worst.
? Gold is ___ (expensive) than silver. => more expensive // Adjectif long.
* He runs as fast ___ me. [than|as|that] => as // as … as.
* The ___ you sleep, the more tired you feel. [less|least|fewer] => less // the less… the more.
`},
{ id: 'countables', lv: 2, title: 'Some, any, much, many, a lot of', en: 'Countable & uncountable', body: `
# Dénombrable ou indénombrable ?
**Dénombrables** : on peut les compter (an apple, two apples). **Indénombrables** : pas de pluriel, pas de « a » : **water, money, bread, advice, information, news, furniture, luggage, homework**.
! Pièges pour les francophones : **information, advice, news, furniture, luggage** sont indénombrables : **some advice** (des conseils), **a piece of advice** (un conseil).
| | Dénombrable | Indénombrable
| beaucoup (négatif / question) | many | much
| beaucoup (affirmatif courant) | a lot of / lots of | a lot of / lots of
| peu | few / a few | little / a little
| combien ? | How many…? | How much…?
# Some / any
**Some** : phrases affirmatives et offres / demandes. **Any** : négations et questions.
> There's some milk in the fridge. | Il y a du lait dans le frigo.
> Do you have any brothers? | As-tu des frères ?
> Would you like some tea? | Voulez-vous du thé ?
> I don't have any money. | Je n'ai pas d'argent.
# A few / few, a little / little
**a few / a little** = un peu, quelques-uns (positif) ; **few / little** = peu (négatif).
x an information, informations | some information, a piece of information
x How much people? | How many people?
? I don't have ___ time. => much/any // Négation + indénombrable.
? How ___ brothers have you got? => many // brothers est dénombrable.
? Can you give me ___ advice? => some // advice est indénombrable ; demande → some.
? There were very ___ people at the concert, it was almost empty. => few // peu (sens négatif) + dénombrable.
* She has ___ friends in London, so she's never lonely. [a few|few|a little] => a few // Quelques (positif).
* Is there ___ sugar left? [some|any|many] => any // Question → any.
* I need ___ information about the hotel. [an|some|many] => some // information est indénombrable.
`},
{ id: 'frequency-adverbs', lv: 2, title: 'Adverbes de fréquence', en: 'Adverbs of frequency', body: `
| 100 % → 0 % | Français
| always | toujours
| usually | d'habitude
| often | souvent
| sometimes | parfois
| rarely / seldom | rarement
| never | jamais
# Place dans la phrase
L'adverbe se place **avant le verbe principal** mais **après to be**.
> I usually get up early. | Je me lève généralement tôt.
> She is always late. | Elle est toujours en retard.
> We have never been to Japan. | Nous ne sommes jamais allés au Japon.
x I go always to school by bus. | I always go to school by bus.
? (often) He plays football. → He ___ football. => often plays // Avant le verbe principal.
? (never) She is late. → She ___ late. => is never // Après be.
* I ___ breakfast. [eat never|never eat|never eats] => never eat // Avant le verbe.
* They ___ happy. [are always|always are] => are always // Après be.
`},
{ id: 'obligation', lv: 2, title: 'Must, have to, should', en: 'Obligation & advice', body: `
| Modal | Sens | Exemple
| must | obligation personnelle / forte | I must call my mum.
| have to | obligation extérieure (règle) | I have to wear a uniform.
| mustn't | interdiction | You mustn't smoke here.
| don't have to | absence d'obligation | You don't have to come.
| should / shouldn't | conseil | You should see a doctor.
> You must be home by midnight. | Tu dois être rentré avant minuit.
> She has to work on Saturdays. | Elle doit travailler le samedi.
> We don't have to pay; it's free. | On n'est pas obligés de payer, c'est gratuit.
> You shouldn't eat so much sugar. | Tu ne devrais pas manger autant de sucre.
! **mustn't** ≠ **don't have to** ! « You mustn't go » = tu ne dois pas y aller (interdit) ; « You don't have to go » = tu n'es pas obligé.
! Au passé : **had to** (I had to leave early). Must n'a pas de passé.
? You ___ smoke in the hospital. It's forbidden. => mustn't/must not // Interdiction.
? Tomorrow is Sunday, so I ___ get up early. (pas obligé) => don't have to/do not have to // Absence d'obligation.
? You look tired. You ___ go to bed. => should // Conseil.
? Yesterday I ___ (devoir) work late. => had to // Passé de must / have to.
* She ___ wear glasses to drive. It's the law. [has to|should|mustn't] => has to // Obligation extérieure (loi).
* You ___ tell her. It's a secret! [don't have to|mustn't] => mustn't // Interdiction.
`},
{ id: 'object-pronouns-reflexive', lv: 2, title: 'Pronoms réfléchis et réciproques', en: 'Reflexive pronouns', body: `
| Sujet | Réfléchi
| I | myself
| you | yourself / yourselves
| he / she / it | himself / herself / itself
| we | ourselves
| they | themselves
> I cut myself. | Je me suis coupé.
> She made the cake herself. | Elle a fait le gâteau elle-même.
> They looked at each other. | Ils se sont regardés (l'un l'autre).
! Beaucoup de verbes pronominaux français ne le sont pas en anglais : **se lever = get up, se souvenir = remember, se sentir = feel, se dépêcher = hurry, se marier = get married**.
x I feel myself tired. | I feel tired.
x We met ourselves yesterday. | We met yesterday.
? Did you enjoy ___ at the party? (you singulier) => yourself // Réfléchi de you (singulier).
? He hurt ___ playing football. => himself // Réfléchi de he.
* Paul and Anna love ___. (l'un l'autre) [themselves|each other] => each other // Réciproque.
* « Je me lève à 7 h » [I get up at 7.|I get myself up at 7.] => I get up at 7. // get up n'est pas pronominal.
`},
{ id: 'present-cont-future', lv: 2, title: 'Exprimer le futur avec le présent', en: 'Present for future', tense: true, body: `
# Présent continu = rendez-vous organisé
> I'm seeing the dentist on Monday. | Je vais chez le dentiste lundi.
> What are you doing this weekend? | Qu'est-ce que tu fais ce week-end ?
# Présent simple = horaire officiel
> The plane takes off at 6:45. | L'avion décolle à 6 h 45.
> The course starts next Monday. | Le cours commence lundi prochain.
# Après when, as soon as, before, after, until : présent (pas will)
> I'll call you when I arrive. | Je t'appellerai quand j'arriverai.
x When I will arrive, I'll call you. | When I arrive, I'll call you.
? I'll tell him as soon as he ___ (get) home. => gets // Après as soon as → présent.
? We ___ (have) dinner with Tom tonight — it's booked. => are having/'re having // Rendez-vous organisé.
* The train ___ at 10:15 tomorrow. [leaves|will leaving] => leaves // Horaire → présent simple.
* Wait here until I ___ back. [come|will come] => come // Après until → présent.
`},
{ id: 'prepositions-movement', lv: 2, title: 'Prépositions de mouvement', en: 'Prepositions of movement', body: `
| Préposition | Sens | Exemple
| to | vers, à | I go to work by bus.
| into / out of | dans / hors de | She ran into the room.
| across | en traversant (une surface) | We walked across the bridge.
| through | à travers (un volume) | The train goes through the tunnel.
| along | le long de | Walk along the river.
| up / down | en montant / descendant | He climbed up the hill.
| past | devant (en passant) | Go past the church.
| over / under | par-dessus / sous | The cat jumped over the wall.
| towards | en direction de | He walked towards me.
! **go home** : pas de « to » devant home. Et **arrive in** (ville) / **arrive at** (lieu précis), jamais « arrive to ».
x I go to home. | I go home.
? We arrived ___ London at midnight. => in // arrive in + ville.
? The thief climbed ___ the window. => through // à travers.
* She swam ___ the lake. [across|through|along] => across // D'une rive à l'autre.
* Get ___ the car! (sors) [out of|out|off] => out of // out of + lieu.
`},
{ id: 'adjectives-adverbs', lv: 2, title: 'Adjectifs et adverbes (-ly)', en: 'Adjectives vs adverbs', body: `
# L'adjectif décrit un nom, l'adverbe décrit une action
> She is a careful driver. → She drives carefully. | C'est une conductrice prudente → Elle conduit prudemment.
| Adjectif | Adverbe
| quick | quickly
| easy | easily
| good | **well**
| fast | fast
| hard | hard (hardly = à peine !)
| late | late (lately = récemment)
# Place de l'adjectif
L'adjectif se place **avant le nom** et ne s'accorde jamais : **a red car, two red cars**.
# Adjectifs en -ed / -ing
**-ed** = ce qu'on ressent ; **-ing** = ce qui provoque le sentiment.
> I'm bored. This film is boring. | Je m'ennuie. Ce film est ennuyeux.
> She was surprised by the surprising news. | Elle a été surprise par cette nouvelle surprenante.
x She speaks English very good. | She speaks English very well.
x a car red / reds cars | a red car / red cars
x I'm boring. (= je suis ennuyeux !) | I'm bored.
? He plays the piano very ___ (good). => well // Adverbe de good → well.
? Please drive ___ (slow). => slowly // Adverbe → slowly.
? The lesson was very ___ (interest). => interesting // Ce qui provoque l'intérêt.
? I'm ___ (tire). I need to sleep. => tired // Ce que je ressens.
* She works very ___. [hard|hardly] => hard // hardly = à peine.
* I was really ___ by the end of the film. [confusing|confused] => confused // Sentiment ressenti → -ed.
`},
]
