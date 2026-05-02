# Niveaux

Le projet contient 20 niveaux pédagogiques.
Ils sont définis dans `src/data/levels.js`, qui reste la source de vérité.

Cette page sert à comprendre l'intention pédagogique avant de modifier les données.
Elle ne remplace pas les tests de structure dans `tests/levels.test.js`.

## Structure d'un niveau

Chaque niveau contient au minimum :

- un identifiant unique;
- un titre;
- une instruction longue;
- une instruction courte;
- une difficulté;
- un seuil d'étoiles;
- une vitesse de chute;
- une limite de mots actifs;
- des cibles;
- des distracteurs.

## Les 20 niveaux

Les niveaux sont organisés comme une progression pédagogique, pas comme une simple montée de vitesse.

| Niv. | Titre | Focus |
| --- | --- | --- |
| 1 | Les mots mal écrits | orthographe de base |
| 2 | Les lettres en trop | lettres ajoutées par erreur |
| 3 | Les lettres manquantes | lettres oubliées |
| 4 | Les accents | accents absents ou faux |
| 5 | Les noms communs | reconnaître un nom |
| 6 | Les verbes simples | reconnaître une action |
| 7 | Les adjectifs | qualifier un nom |
| 8 | Les déterminants | mots placés devant un nom |
| 9 | Les pronoms personnels | je, tu, il, nous, etc. |
| 10 | Les adverbes | précision sur une action |
| 11 | Les prépositions | mots comme à, dans, avec |
| 12 | Les conjonctions | mots de liaison |
| 13 | Les verbes à l'infinitif | infinitif vs conjugué |
| 14 | Les verbes conjugués | phrase avec sujet + verbe |
| 15 | Les verbes au présent | conjugaison au présent |
| 16 | Les verbes au futur | conjugaison au futur |
| 17 | Les verbes au passé composé | passé composé avec avoir ou être |
| 18 | Les accords sujet-verbe | accord dans la phrase |
| 19 | Les homophones | a / à, son / sont |
| 20 | Le défi du chevalier | synthèse de plusieurs erreurs |

## Fiches détaillées

### Niveau 1 - Les mots mal écrits

- Objectif pédagogique : repérer une forme orthographique incorrecte dans un mot courant.
- Consigne : tranche les mots qui ne sont pas bien orthographiés.
- Cibles : `chatt`, `méson`, `chevau`, `lapain`.
- Distracteurs : `chat`, `maison`, `cheval`, `lapin`.
- Feedback attendu : valider la frappe et afficher la correction, par exemple `chatt -> chat`.
- Critères d'acceptation : le niveau contient au moins une cible et un distracteur; les corrections sont renseignées pour chaque cible; la réussite demande 5 étoiles.

### Niveau 2 - Les lettres en trop

- Objectif pédagogique : identifier une lettre doublée ou ajoutée par erreur.
- Consigne : tranche les mots qui ont une lettre en trop.
- Cibles : `arbbre`, `solleil`, `balllon`, `pommme`.
- Distracteurs : `arbre`, `soleil`, `ballon`, `pomme`.
- Feedback attendu : signaler la lettre en trop et afficher le mot corrigé, par exemple `solleil -> soleil`.
- Critères d'acceptation : chaque cible a une correction; chaque distracteur est déjà bien écrit; la réussite demande 5 étoiles.

### Niveau 3 - Les lettres manquantes

- Objectif pédagogique : repérer un mot incomplet auquel il manque une lettre.
- Consigne : tranche les mots auxquels il manque une lettre.
- Cibles : `cha`, `maisn`, `cheva`, `solei`.
- Distracteurs : `chat`, `maison`, `cheval`, `soleil`.
- Feedback attendu : indiquer la lettre ou la forme manquante, par exemple `solei -> soleil`.
- Critères d'acceptation : les cibles sont toutes des formes incomplètes; les distracteurs sont les formes complètes; la réussite demande 5 étoiles.

### Niveau 4 - Les accents

- Objectif pédagogique : reconnaître l'absence ou l'erreur d'accent sur des mots fréquents.
- Consigne : tranche les mots où l'accent est absent ou incorrect.
- Cibles : `ecole`, `elephant`, `fenetre`, `gateau`.
- Distracteurs : `école`, `éléphant`, `fenêtre`, `gâteau`.
- Feedback attendu : afficher la forme accentuée correcte, par exemple `fenetre -> fenêtre`.
- Critères d'acceptation : chaque cible teste un accent manquant; les distracteurs conservent les accents corrects; la réussite demande 5 étoiles.

### Niveau 5 - Les noms communs

- Objectif pédagogique : reconnaître un nom commun parmi plusieurs natures de mots.
- Consigne : tranche les noms communs : une personne, un animal, un lieu ou une chose.
- Cibles : `dragon`, `château`, `livre`, `jardin`.
- Distracteurs : `courir`, `beau`, `vite`, `elle`.
- Feedback attendu : confirmer que la cible est un nom commun ou expliquer la nature du distracteur touché.
- Critères d'acceptation : les cibles désignent des choses, lieux ou êtres; les distracteurs couvrent plusieurs autres catégories; la réussite demande 6 étoiles.

### Niveau 6 - Les verbes simples

- Objectif pédagogique : reconnaître un verbe à l'infinitif exprimant une action.
- Consigne : tranche les verbes : les mots qui disent une action.
- Cibles : `manger`, `sauter`, `dormir`, `chanter`.
- Distracteurs : `table`, `bleu`, `cartable`, `petit`.
- Feedback attendu : confirmer que la cible est un verbe ou nommer la catégorie du distracteur.
- Critères d'acceptation : les cibles sont des verbes simples; les distracteurs ne sont pas des actions; la réussite demande 6 étoiles.

### Niveau 7 - Les adjectifs

- Objectif pédagogique : reconnaître un mot qui qualifie ou précise un nom.
- Consigne : tranche les adjectifs : ils donnent une précision sur un nom.
- Cibles : `rapide`, `joyeux`, `grand`, `magique`.
- Distracteurs : `cheval`, `chanter`, `forêt`, `lentement`.
- Feedback attendu : confirmer l'adjectif ou expliquer que le distracteur est un nom, un verbe ou un adverbe.
- Critères d'acceptation : les cibles sont des adjectifs isolés; les distracteurs mélangent plusieurs natures grammaticales; la réussite demande 6 étoiles.

### Niveau 8 - Les déterminants

- Objectif pédagogique : reconnaître les mots qui peuvent se placer devant un nom.
- Consigne : tranche les déterminants placés devant un nom.
- Cibles : `le`, `une`, `des`, `mon`.
- Distracteurs : `dragon`, `courir`, `joli`, `nous`.
- Feedback attendu : confirmer le déterminant ou expliquer la catégorie du mot touché par erreur.
- Critères d'acceptation : les cibles sont des déterminants fréquents; les distracteurs ne peuvent pas jouer ce rôle seuls; la réussite demande 6 étoiles.

### Niveau 9 - Les pronoms personnels

- Objectif pédagogique : identifier les pronoms personnels sujets.
- Consigne : tranche les pronoms personnels : je, tu, il, nous...
- Cibles : `je`, `tu`, `nous`, `elles`.
- Distracteurs : `maison`, `avec`, `rapide`, `chanter`.
- Feedback attendu : confirmer le pronom ou expliquer la nature du distracteur.
- Critères d'acceptation : les cibles sont des pronoms personnels; les distracteurs couvrent nom, préposition, adjectif et verbe; la réussite demande 6 étoiles.

### Niveau 10 - Les adverbes

- Objectif pédagogique : reconnaître un mot qui précise souvent une action.
- Consigne : tranche les adverbes : ils précisent souvent un verbe.
- Cibles : `vite`, `lentement`, `souvent`, `demain`.
- Distracteurs : `rapide`, `dragon`, `sauter`, `petit`.
- Feedback attendu : confirmer l'adverbe ou expliquer la confusion possible avec adjectif, nom ou verbe.
- Critères d'acceptation : les cibles sont des adverbes ou emplois adverbiaux; les distracteurs ne sont pas des adverbes; la réussite demande 6 étoiles.

### Niveau 11 - Les prépositions

- Objectif pédagogique : reconnaître les mots qui introduisent un complément.
- Consigne : tranche les prépositions : à, de, dans, avec...
- Cibles : `dans`, `avec`, `chez`, `pour`.
- Distracteurs : `courir`, `nous`, `le`, `joyeux`.
- Feedback attendu : confirmer la préposition ou nommer la nature du distracteur.
- Critères d'acceptation : les cibles sont des prépositions courantes; les distracteurs testent la confusion avec verbe, pronom, déterminant et adjectif; la réussite demande 6 étoiles.

### Niveau 12 - Les conjonctions

- Objectif pédagogique : reconnaître les mots qui relient des mots ou des propositions.
- Consigne : tranche les conjonctions qui relient des mots ou des phrases.
- Cibles : `et`, `mais`, `ou`, `car`.
- Distracteurs : `dans`, `vite`, `maison`, `elle`.
- Feedback attendu : confirmer la conjonction ou expliquer la nature du distracteur touché.
- Critères d'acceptation : les cibles sont des conjonctions fréquentes; les distracteurs ne sont pas des mots de liaison de même nature; la réussite demande 6 étoiles.

### Niveau 13 - Les verbes à l'infinitif

- Objectif pédagogique : distinguer l'infinitif d'une forme conjuguée.
- Consigne : tranche les verbes à l'infinitif : ils finissent souvent par -er, -ir, -re.
- Cibles : `manger`, `finir`, `prendre`, `voir`.
- Distracteurs : `je mange`, `nous finissons`, `tu prends`, `ils voient`.
- Feedback attendu : confirmer l'infinitif ou rappeler que le distracteur est conjugué avec un sujet.
- Critères d'acceptation : les cibles sont des infinitifs; les distracteurs sont des formes conjuguées; la réussite demande 7 étoiles.

### Niveau 14 - Les verbes conjugués

- Objectif pédagogique : reconnaître une forme verbale conjuguée associée à un sujet.
- Consigne : tranche les verbes conjugués avec un sujet.
- Cibles : `je joue`, `tu lis`, `nous chantons`, `elles courent`.
- Distracteurs : `jouer`, `lire`, `chanter`, `courir`.
- Feedback attendu : confirmer la conjugaison ou expliquer que le distracteur est à l'infinitif.
- Critères d'acceptation : les cibles contiennent un sujet et un verbe conjugué; les distracteurs sont des infinitifs; la réussite demande 7 étoiles.

### Niveau 15 - Les verbes au présent

- Objectif pédagogique : identifier le présent parmi d'autres temps.
- Consigne : tranche les verbes conjugués au présent.
- Cibles : `je chante`, `nous lisons`, `tu regardes`, `elles jouent`.
- Distracteurs : `je chanterai`, `nous avons lu`, `tu regarderas`, `elles ont joué`.
- Feedback attendu : confirmer le présent ou indiquer si le distracteur est au futur ou au passé composé.
- Critères d'acceptation : les cibles sont au présent; les distracteurs couvrent futur et passé composé; la réussite demande 7 étoiles.

### Niveau 16 - Les verbes au futur

- Objectif pédagogique : identifier le futur simple parmi des formes au présent.
- Consigne : tranche les verbes conjugués au futur.
- Cibles : `je marcherai`, `tu finiras`, `nous irons`, `elles auront`.
- Distracteurs : `je marche`, `tu finis`, `nous allons`, `elles ont`.
- Feedback attendu : confirmer le futur ou rappeler que le distracteur est au présent.
- Critères d'acceptation : les cibles sont au futur; les distracteurs sont au présent; la réussite demande 7 étoiles.

### Niveau 17 - Les verbes au passé composé

- Objectif pédagogique : reconnaître une forme au passé composé construite avec `avoir` ou `être`.
- Consigne : tranche les verbes au passé composé avec avoir ou être.
- Cibles : `j'ai chanté`, `tu es parti`, `nous avons vu`, `elles sont venues`.
- Distracteurs : `je chante`, `tu partiras`, `nous voyons`, `elles viendront`.
- Feedback attendu : confirmer le passé composé ou indiquer le temps du distracteur.
- Critères d'acceptation : les cibles contiennent un auxiliaire et un participe passé; les distracteurs sont au présent ou au futur; la réussite demande 7 étoiles.

### Niveau 18 - Les accords sujet-verbe

- Objectif pédagogique : repérer une phrase où le verbe ne s'accorde pas avec son sujet.
- Consigne : tranche les phrases où le sujet et le verbe ne sont pas accordés.
- Cibles : `Les enfants joue`, `Le chat dorment`, `Nous mange`, `Tu regardent`.
- Distracteurs : `Les enfants jouent`, `Le chat dort`, `Nous mangeons`, `Tu regardes`.
- Feedback attendu : afficher la phrase corrigée, par exemple `Les enfants joue -> Les enfants jouent`.
- Critères d'acceptation : chaque cible contient une erreur d'accord; chaque distracteur est déjà correct; la réussite demande 7 étoiles.

### Niveau 19 - Les homophones

- Objectif pédagogique : choisir le bon homophone dans une phrase courte.
- Consigne : tranche les phrases où l'homophone n'est pas le bon.
- Cibles : `Il à un chien`, `Je vais a Paris`, `Sont vélo est rouge`, `Ils son contents`.
- Distracteurs : `Il a un chien`, `Je vais à Paris`, `Son vélo est rouge`, `Ils sont contents`.
- Feedback attendu : afficher la phrase corrigée, par exemple `Je vais a Paris -> Je vais à Paris`.
- Critères d'acceptation : les cibles contiennent un homophone faux; les distracteurs sont les phrases correctes correspondantes; la réussite demande 8 étoiles.

### Niveau 20 - Le défi du chevalier

- Objectif pédagogique : réinvestir plusieurs règles dans une mission de synthèse.
- Consigne : tranche toutes les erreurs : orthographe, nature des mots, conjugaison et accords.
- Cibles : `Le cheval courent vite`, `Les fleurs son belles`, `J'est mangé une pomme`, `Le dragon magik`, `Nous irons au chateau`.
- Distracteurs : `Le cheval court vite`, `Les fleurs sont belles`, `J'ai mangé une pomme`, `Le dragon magique`, `Nous irons au château`.
- Feedback attendu : nommer le type d'erreur et afficher la correction, par exemple `Le dragon magik -> Le dragon magique`.
- Critères d'acceptation : le niveau mélange plusieurs catégories d'erreurs; les phrases correctes ne doivent pas être des cibles; la réussite demande 10 étoiles.

## Critères globaux d'acceptation

- 20 niveaux sont présents.
- Chaque niveau a une mission lisible.
- Chaque niveau contient au moins une cible et un distracteur.
- Chaque cible erronée avec correction visible renseigne `correction`.
- La progression augmente la charge progressivement avec `starsToWin`, `maxActiveWords` et `fallSpeed`.
- Une modification de niveau est validée avec `npm test`.
