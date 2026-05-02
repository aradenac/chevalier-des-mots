# TRACEABILITY RULES

La chaîne de traçabilité attendue est stricte.

- Un `NEED` doit être couvert par au moins un `STKREQ` ou un `SYSREQ`.
- Un `STKREQ` doit être couvert par au moins un `SYSREQ`.
- Un `SYSREQ` doit être couvert par au moins un `SWREQ`, ou directement par une preuve d'implémentation ou de test si le cas est simple.
- Un `SWREQ` doit être couvert par une implémentation.
- Un `SWREQ` testable doit aussi être couvert par un `utest` ou un `itest`.
- Un `VERREQ` doit être couvert par un script, une commande ou un test.
- Les tests doivent produire un résultat d'exécution via `npm test` ou `npm run verify`.
- OpenFastTrace valide la chaîne statique.
- Vitest valide les résultats d'exécution.
- Aucun validateur maison ne doit être créé.

Les annotations de lien gardent le format suivant :

- `// [impl->swreq~...~1]`
- `// [utest->swreq~...~1]`
- `<!-- [doc->sysreq~...~1] -->`

La traçabilité doit rester lisible par un humain et exploitable par OpenFastTrace sans interprétation supplémentaire.
