# Vue d'ensemble du système

Le projet est un jeu éducatif web en Vanilla JS. Le joueur incarne un chevalier qui tranche des mots pour apprendre à reconnaître des formes linguistiques correctes ou incorrectes.

Le périmètre couvre le jeu jouable dans un navigateur, la documentation d'exigences et la validation de traçabilité. Le projet ne prévoit pas de compte utilisateur, pas de backend, pas de sauvegarde distante et pas de synchronisation réseau.

La hiérarchie de spécification attendue est la suivante :
NEED -> STKREQ -> SYSREQ -> SWREQ -> impl -> utest/itest -> résultat d'exécution.

Les VERREQ portent les besoins de vérification et restent reliés aux commandes et scripts qui produisent les preuves locales.

Cette hiérarchie sert à garder un lien lisible entre le besoin pédagogique, l'exigence produit, la conception logicielle, l'implémentation, la preuve de test et la validation finale.

Le référentiel de vérité reste `docs/requirements/`. MkDocs ne sert qu'à rendre ce contenu consultable en HTML statique via `site/index.html`.
