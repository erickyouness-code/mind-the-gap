// Builds two outputs from build/: dist/ (standalone site) and artifact/ (claude.ai artifact page)
import fs from 'fs'
const css = fs.readFileSync('build/app.css', 'utf8')
const js = fs.readFileSync('build/app.js', 'utf8').replace(/<\/script/gi, '<\\/script')
const head = `<title>Mind the Gap</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Apprendre l'anglais de A1 à C2 : grammaire, tous les temps, 9 500 mots, jeux et révisions espacées.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;700&display=swap">
<style>${css}</style>`
const body = `<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>${js}</script>`
fs.mkdirSync('artifact/data', { recursive: true }); fs.mkdirSync('dist/data', { recursive: true })
fs.writeFileSync('artifact/index.html', head + '\n' + body + '\n')
fs.writeFileSync('dist/index.html', `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0F1730">${head}</head><body>${body}</body></html>\n`)
for (const f of ['words.json', 'sentences.json']) { fs.copyFileSync('public/data/' + f, 'artifact/data/' + f); fs.copyFileSync('public/data/' + f, 'dist/data/' + f) }
console.log('ok', fs.statSync('artifact/index.html').size)
