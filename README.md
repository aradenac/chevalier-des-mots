# Le Chevalier des Mots

## Lancer le jeu dans Google Chrome

Depuis la racine du projet, lance :

```bash
npm install && (npm run dev -- --port 5173 --strictPort > /tmp/chevalier-des-mots-vite.log 2>&1 &) && sleep 2 && google-chrome http://127.0.0.1:5173/
```

Si ta distribution expose Chrome sous le nom `google-chrome-stable`, remplace `google-chrome` par `google-chrome-stable`.
