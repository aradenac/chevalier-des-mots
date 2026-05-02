# Dépannage

## Son absent

Vérifier :

- volume système;
- autorisation audio du navigateur;
- interaction utilisateur préalable;
- périphérique de sortie sélectionné.

## Voix absente

Cause possible :

- Brave expose `speechSynthesis` mais aucune voix exploitable;
- `getVoices()` retourne `[]`;
- `synthesis-failed` survient au moment de parler.

`uman~cdm.troubleshooting-audio-voice~1`

Needs: req

## Ce que le jeu doit faire

- afficher un diagnostic clair;
- garder la consigne écrite visible;
- continuer la partie;
- ne jamais bloquer la jouabilité.

## Exemple concret

Si la voix ne parle pas, le joueur doit encore pouvoir finir le niveau au clavier.

## Critères d'acceptation

- l'erreur audio ou voix ne bloque pas le jeu;
- le diagnostic reste lisible;
- Brave est mentionné explicitement dans l'aide;
- la correction reste texte d'abord.
