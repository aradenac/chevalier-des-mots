# ADR-0004 - Speech synthesis optionnelle

La synthèse vocale reste optionnelle.

## Décision

Le jeu doit rester jouable si `speechSynthesis` n'est pas disponible, si `getVoices()` renvoie `[]` ou si `synthesis-failed` survient.

## Conséquences

- le texte reste la source de vérité;
- la voix améliore l'expérience mais ne conditionne pas la partie;
- Brave et d'autres navigateurs doivent être documentés explicitement.
