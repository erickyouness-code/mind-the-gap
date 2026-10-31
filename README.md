# Mind the Gap — apprendre l'anglais de A1 à C2

Application web complète pour francophones : 62 leçons de grammaire (tous les temps), 9 521 mots classés par niveau CECRL avec traductions et exemples, 17 900 phrases bilingues, 13 jeux, répétition espacée, test de niveau, examens de fin de niveau, conjugueur, 148 verbes irréguliers, phrasal verbs, idiomes, faux amis, situations de la vie courante, prononciation.

## Lancer
    npm install
    npx vite build && node scripts/assemble.mjs
    npx serve dist        # ou n'importe quel serveur statique sur le dossier dist/

## Structure
- `src/content/` : grammaire (`grammar1/2/3.ts`, mini-syntaxe décrite en tête de `grammar1.ts`), verbes irréguliers, expressions, situations, prononciation.
- `public/data/` : `words.json` et `sentences.json`, générés par `scripts/build_data.py`.
- `src/lib/` : stockage et répétition espacée (`store.ts`), conjugueur, synthèse vocale, sauvegarde cloud optionnelle.
- `src/screens/`, `src/games/` : interface.

## Sources des données
Niveaux : CEFR-J Wordlist 1.5 et Octanove C1/C2 · Traductions : Wiktionary (CC BY-SA 4.0, via LangSwap) et FreeDict · Phrases : Tatoeba (CC BY 2.0 FR) · Fréquences : FrequencyWords (OpenSubtitles).
