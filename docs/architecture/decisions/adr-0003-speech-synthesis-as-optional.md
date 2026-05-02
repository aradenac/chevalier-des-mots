# ADR-0003 - Speech Synthesis optionnelle

## Statut

Accepté.

## Contexte

Certaines configurations navigateur exposent `speechSynthesis` de manière incomplète.
Brave peut retourner une liste de voix vide ou une erreur de synthèse.

## Décision

La narration vocale est optionnelle.
Le jeu ne doit jamais dépendre de la voix pour rester jouable.

## Conséquences

- la base fiable reste WebAudio
- la narration peut être ignorée si l’API échoue
- un diagnostic clair informe l’utilisateur sans bloquer la partie

