# Exigences de mode debug

## Périmètre

Le mode debug permet de sélectionner librement un niveau pour le tester sans compte joueur actif, sans sauvegarde de progression et sans mise à jour des statistiques. Il sert à vérifier rapidement les niveaux, les mécaniques de jeu et les contenus pédagogiques.

Le mode debug est accessible depuis l'interface normale du site, mais il ne fait pas partie de la progression joueur.

#### Le menu debug doit être accessible depuis l'interface normale

`req~debug.menu-access~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Le système doit proposer un accès au menu debug depuis l'interface normale du site.

Rationale: Les testeurs doivent pouvoir accéder rapidement au mode debug sans modifier l'URL, le code ou la configuration du navigateur.

Acceptance criteria:

- L'interface normale expose une action permettant d'ouvrir le menu debug.
- L'accès au menu debug est visible depuis un écran hors partie.
- L'accès au menu debug ne lance pas une partie normale.
- L'accès au menu debug ne crée pas de compte joueur.
- L'accès au menu debug ne sélectionne pas de compte joueur.
- L'accès au menu debug reste impossible si le prérequis global de voix française n'est pas satisfait.

Needs: impl, utest

#### Le mode debug doit proposer une sélection libre des niveaux

`req~debug.level-selector~2`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Le système doit fournir un menu debug permettant de voir l'ensemble des niveaux disponibles et d'en lancer un directement.

Rationale: Le concepteur ou testeur doit pouvoir tester rapidement un niveau précis sans parcourir toute la progression normale.

Acceptance criteria:

- Le mode debug propose une liste de tous les niveaux déclarés dans la campagne.
- Chaque entrée de la liste affiche au minimum le numéro ou index du niveau.
- Chaque entrée de la liste affiche le titre du niveau.
- Chaque entrée de la liste affiche le type du niveau.
- Le menu debug permet de lancer directement un niveau sélectionné.
- Le menu debug permet de sélectionner un niveau non encore accompli dans la progression normale.
- Le menu debug permet de sélectionner un niveau de tranchage.
- Le menu debug permet de sélectionner un niveau de dictée.
- Le menu debug permet de sélectionner un niveau cannon.
- Le menu debug ne remplace pas le lancement normal de la campagne.

Needs: impl, utest

#### Le mode debug ne doit pas nécessiter de compte joueur

`req~debug.no-account-required~1`

Status: approved  
Priority: high  
Verification: test  

Le système doit permettre de lancer un niveau depuis le mode debug sans compte joueur actif.

Rationale: Le mode debug doit permettre de tester les niveaux sans créer ou sélectionner un compte enfant.

Acceptance criteria:

- Le menu debug est accessible sans compte joueur actif.
- Un niveau lancé depuis le menu debug ne crée pas de compte joueur.
- Un niveau lancé depuis le menu debug n'exige pas de compte joueur sélectionné.
- Les erreurs d'absence de compte actif ne bloquent pas le lancement debug.
- Le lancement normal de la campagne continue d'exiger un compte actif selon les exigences de progression.

Needs: impl, utest

#### Le mode debug doit utiliser un personnage par défaut

`req~debug.default-character~1`

Status: approved  
Priority: medium  
Verification: test  
Additional verification: manual-review  

Lorsqu'un niveau est lancé depuis le mode debug sans personnage sélectionné, le système doit utiliser un personnage par défaut.

Rationale: Le mode debug doit permettre de tester un niveau rapidement sans passer par le flux normal de choix du personnage.

Acceptance criteria:

- Le lancement d'un niveau debug n'exige pas de sélection préalable de personnage.
- Le système associe un personnage par défaut à une session debug.
- Le personnage par défaut permet d'afficher les animations nécessaires au niveau.
- Le personnage par défaut ne modifie pas les préférences d'un compte joueur existant.
- Le personnage par défaut ne crée pas de donnée persistante de joueur.

Needs: impl, utest

#### Le mode debug ne doit pas modifier la progression

`req~debug.no-progression-update~1`

Status: approved  
Priority: high  
Verification: test  

Lorsqu'un niveau est lancé depuis le mode debug, le système ne doit pas modifier la progression sauvegardée d'un compte joueur.

Rationale: Le test libre d'un niveau ne doit pas débloquer artificiellement la campagne ni perturber la progression réelle d'un enfant.

Acceptance criteria:

- Terminer un niveau en mode debug ne modifie pas le plus haut niveau accompli.
- Terminer un niveau en mode debug ne débloque pas le niveau suivant dans la progression normale.
- Terminer un niveau en mode debug ne déclenche pas la sauvegarde automatique de progression.
- Terminer un niveau en mode debug ne modifie aucune progression de compte existant.
- Rejouer un niveau en mode debug ne réduit aucune progression existante.
- Terminer un niveau en mode debug enchaîné ne modifie aucune progression de compte existant.
- Terminer un niveau avec le raccourci de complétion maximale ne modifie aucune progression de compte existant.
- Ces garanties s'appliquent même si un compte joueur est actif en arrière-plan.

Needs: impl, utest

#### Le mode debug ne doit pas modifier les statistiques

`req~debug.no-statistics-update~1`

Status: approved  
Priority: high  
Verification: test  

Lorsqu'un niveau est lancé depuis le mode debug, le système ne doit pas créer ni modifier les statistiques joueur.

Rationale: Les essais de conception ou de test ne doivent pas polluer le Tableau des champions ni les meilleurs scores.

Acceptance criteria:

- Terminer un niveau en mode debug ne crée pas de score par niveau.
- Terminer un niveau en mode debug ne modifie pas le meilleur score d'un niveau.
- Terminer un niveau en mode debug ne modifie pas le score global.
- Terminer une dictée en mode debug ne modifie pas le nombre de tentatives enregistré.
- Terminer une dictée en mode debug ne modifie pas le nombre d'erreurs enregistré.
- Terminer un niveau en mode debug ne modifie pas le Tableau des champions.
- Terminer un niveau en mode debug enchaîné ne crée ni ne modifie les statistiques joueur.
- Terminer un niveau avec le raccourci de complétion maximale ne crée ni ne modifie les statistiques joueur.
- Ces garanties s'appliquent même si un compte joueur est actif en arrière-plan.

Needs: impl, utest

#### Le mode debug doit revenir au menu debug après un niveau par défaut

`req~debug.return-to-selector~2`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Après la fin d'un niveau lancé depuis le mode debug, le système doit revenir au menu debug par défaut, sans lancer automatiquement la progression normale.

Rationale: Le mode debug sert principalement à tester des niveaux isolés et à enchaîner librement plusieurs essais choisis par le testeur. Le retour au menu debug doit rester le comportement sûr et explicite lorsqu'aucune option d'enchaînement n'est activée.

Acceptance criteria:

- Terminer un niveau de tranchage en mode debug revient au menu debug lorsque l'option d'enchaînement debug est désactivée.
- Terminer un niveau de dictée en mode debug revient au menu debug lorsque l'option d'enchaînement debug est désactivée et que le joueur choisit de continuer.
- Terminer un niveau cannon en mode debug revient au menu debug lorsque l'option d'enchaînement debug est désactivée.
- L'option d'enchaînement debug est désactivée par défaut.
- La fin d'un niveau en mode debug ne revient pas automatiquement au Tableau des champions.
- Le retour au menu debug conserve la possibilité de sélectionner un autre niveau.
- Le menu debug propose une action permettant de quitter le mode debug et de revenir au menu principal.

Needs: impl, utest

#### Le mode debug doit respecter les prérequis techniques des niveaux

`req~debug.level-prerequisites~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Le système doit appliquer en mode debug les prérequis techniques nécessaires au type de niveau sélectionné.

Rationale: Le mode debug doit tester les niveaux dans des conditions fonctionnelles représentatives, sans contourner les prérequis critiques.

Acceptance criteria:

- Un niveau de tranchage peut être lancé en mode debug avec les mêmes prérequis techniques que dans la campagne normale.
- Un niveau de dictée lancé en mode debug exige une voix française disponible.
- Le mode debug ne peut pas être atteint si le prérequis global de voix française n'est pas satisfait.
- L'absence de compte actif ne bloque pas un niveau debug.
- Le mode debug ne contourne pas les erreurs techniques empêchant réellement le type de niveau de fonctionner.

Needs: impl, utest

#### Le mode debug doit permettre d'enchaîner les niveaux depuis un niveau sélectionné

`req~debug.chain-levels~2`

Status: approved  
Priority: medium  
Verification: test  
Additional verification: manual-review  

Le système doit proposer dans le menu debug une option permettant d'enchaîner les niveaux à partir du niveau sélectionné.

Rationale: Le testeur doit pouvoir vérifier le comportement réel de transition entre niveaux sans passer par le flux complet de progression joueur et sans modifier les données sauvegardées.

Acceptance criteria:

- Le menu debug propose une option intitulée « Enchaîner les niveaux après complétion » ou une formulation équivalente.
- L'option d'enchaînement debug est désactivée par défaut.
- Lorsque l'option est désactivée, un niveau lancé depuis le menu debug revient au menu debug après complétion.
- Lorsque l'option est activée, un niveau lancé depuis le menu debug conserve un contexte debug enchaîné.
- En contexte debug enchaîné, terminer un niveau affiche l'écran normal de fin de niveau.
- En contexte debug enchaîné, l'action Continuer depuis l'écran de fin de niveau lance le niveau suivant.
- L'enchaînement utilise l'ordre des niveaux de la campagne.
- L'enchaînement respecte le type du niveau suivant, notamment les niveaux de tranchage, les niveaux de dictée et les niveaux cannon.
- L'enchaînement ne nécessite pas de compte joueur actif.
- L'enchaînement utilise le personnage debug par défaut si aucun personnage n'est sélectionné.
- L'enchaînement ne modifie pas la progression sauvegardée.
- L'enchaînement ne crée ni ne modifie les statistiques joueur.
- L'enchaînement ne modifie aucune donnée de compte joueur, même si un compte joueur est actif en arrière-plan.

Needs: impl, utest

#### Le mode debug enchaîné doit signaler la fin de séquence

`req~debug.chain-end~1`

Status: approved  
Priority: medium  
Verification: test  
Additional verification: manual-review  

Lorsque le dernier niveau disponible est terminé en mode debug enchaîné, le système doit signaler la fin de la séquence debug puis revenir au menu debug.

Rationale: Le testeur doit comprendre que la campagne debug enchaînée est terminée sans être renvoyé silencieusement au menu ni boucler implicitement vers le premier niveau.

Acceptance criteria:

- Lorsque le niveau terminé est le dernier niveau de la campagne, le système ne tente pas de lancer un niveau inexistant.
- Lorsque le dernier niveau est terminé en mode debug enchaîné, le système affiche un message « Fin de séquence debug » ou une formulation équivalente.
- Après validation du message de fin de séquence debug, le système revient au menu debug.
- Le système ne boucle pas automatiquement vers le premier niveau.
- Le retour au menu debug conserve la possibilité de sélectionner un autre niveau.
- La fin de séquence debug ne modifie pas la progression sauvegardée.
- La fin de séquence debug ne crée ni ne modifie les statistiques joueur.

Needs: impl, utest

#### Le mode debug doit permettre de terminer un niveau avec la note maximale

`req~debug.max-score-completion-shortcut~2`

Status: approved  
Priority: medium  
Verification: test  
Additional verification: manual-review  

Le système doit fournir, pendant un niveau lancé en mode debug, un raccourci permettant de terminer immédiatement le niveau courant avec la note maximale.

Rationale: Le testeur doit pouvoir valider rapidement les écrans de fin de niveau, les transitions et l'enchaînement de campagne sans réussir manuellement chaque niveau.

Acceptance criteria:

- Le raccourci de complétion maximale est disponible uniquement pendant un niveau lancé en mode debug.
- Le raccourci par défaut est `Ctrl+Shift+D`.
- Le raccourci est modifiable par configuration.
- Le raccourci est ignoré hors contexte debug.
- Le raccourci termine le niveau courant en utilisant le flux normal de fin de niveau.
- Pour un niveau de tranchage, le raccourci produit la note maximale, actuellement `5 / 5`.
- Pour un niveau de dictée, le raccourci produit la note maximale, actuellement `5 / 5`.
- Pour un niveau cannon, le raccourci produit la note maximale, actuellement `5 / 5`.
- La note maximale ne dépend pas du taux de succès, du nombre d'erreurs ou du détail interne des statistiques du niveau.
- En mode debug isolé, la complétion maximale mène à l'écran de fin de niveau puis au retour au menu debug lorsque le joueur choisit de continuer.
- En mode debug enchaîné, la complétion maximale mène à l'écran de fin de niveau puis au niveau suivant lorsque le joueur choisit de continuer.
- Sur le dernier niveau en mode debug enchaîné, la complétion maximale mène à l'écran de fin de niveau puis à la fin de séquence debug.
- La complétion maximale ne modifie pas la progression sauvegardée.
- La complétion maximale ne crée ni ne modifie les statistiques joueur.
- La complétion maximale ne modifie aucune donnée de compte joueur, même si un compte joueur est actif en arrière-plan.

Needs: impl, utest


#### Le mode debug doit appliquer la musique du contexte testé

`req~debug.context-music~1`

Status: approved
Priority: low
Verification: manual-review
Additional verification: test

Lorsqu'un écran ou un niveau est lancé depuis le mode debug, le système doit appliquer les mêmes règles musicales que dans le flux normal du jeu.

Rationale: Le mode debug doit permettre de vérifier rapidement la musique associée aux menus et aux types de niveaux.

Acceptance criteria:
- Un niveau `slicing` lancé depuis le debug utilise la musique de tranchage.
- Un niveau `dictation` lancé depuis le debug utilise la musique de dictée.
- Un niveau `cannon` lancé depuis le debug utilise la musique cannon.
- Le retour au menu debug utilise une musique de menu ou coupe la musique de niveau selon la règle générale des menus.
- L'enchaînement debug met à jour la musique lorsque le type du niveau suivant change.
- Le mode debug ne crée pas de règle musicale différente de la campagne normale.
- Le contrôle de volume musique reste applicable en mode debug.
- Le bouton d'activation ou désactivation de la musique reste applicable en mode debug.

Needs: impl, utest


## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-03 | 2.1.0 | 1.3.0 | docs/requirements/debug.md | Added debug level selector requirements | Allow testing any level from the normal interface without account, progress update or statistics pollution |
| 2026-05-03 | 2.2.0 | 1.3.0 | docs/requirements/debug.md | Added optional debug level chaining and max-score completion shortcut requirements | Allow testers to validate post-level transitions and campaign chaining from debug mode without altering player progression or statistics |
| 2026-05-03 | 2.3.0 | 1.3.0 | docs/requirements/debug.md | Extended debug coverage to cannon levels for selection, isolated completion, chaining and max-score completion | Keep debug behavior aligned with the new autonomous cannon levels |
| 2026-05-03 | 2.2.0 | 1.4.0 | docs/requirements/debug.md | Added debug coverage for contextual music | Allow testers to validate music selection and music controls in debug mode |
