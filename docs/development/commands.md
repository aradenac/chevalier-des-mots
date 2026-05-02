# Commandes

Cette page regroupe les commandes utiles.

<!-- [doc->req~documentation.static-readable-site~1] -->
<!-- [doc->req~traceability.openfasttrace-validation~1] -->

## NPM

```bash
npm install
npm run dev
npm run build
npm test
```

## Documentation

```bash
npm run docs:serve
npm run docs:build
```

## Traçabilité

```bash
npm run trace
```

## Vérification avant commit

```bash
npm test
npm run build
npm run docs:build
npm run trace
```

## Critères d'acceptation

- les commandes sont copiables sans modification;
- les commandes docs restent distinctes des commandes du jeu;
- les commandes de trace utilisent OpenFastTrace via `tools/trace.sh`;
- les vérifications restent reproductibles.
