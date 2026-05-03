# Règles de rédaction des exigences

## Objectif

Cette page définit les règles obligatoires pour écrire, relire et modifier les exigences du projet.
Elle s'applique à toute modification de `docs/requirements/` et sert de référence commune pour la phase `SPEC REVIEW`.

Les règles sont inspirées des pratiques de rédaction d'exigences décrites par ISO/IEC/IEEE 29148, l'INCOSE Guide to Writing Requirements, la NASA Appendix C et le style EARS.

## Langage normatif

Les mots-clés normatifs ont le sens suivant :

- `doit` : obligation vérifiable.
- `ne doit pas` : interdiction vérifiable.
- `peut` : capacité optionnelle autorisée.
- `devrait` : objectif souhaitable, interdit dans l'énoncé normatif d'une exigence `approved`.
- `sera` : formulation interdite dans l'énoncé normatif.

Une exigence `approved` doit utiliser `doit` ou `ne doit pas` dans son énoncé normatif.

Les termes `devrait`, `pourrait`, `sera`, `normalement`, `si possible` ne doivent pas apparaître dans l'énoncé normatif d'une exigence `approved`.

## Patrons de phrase autorisés

1. Exigence permanente :
   `Le système doit <comportement vérifiable>.`

2. Exigence événementielle :
   `Lorsque <événement>, le système doit <réponse observable>.`

3. Exigence conditionnelle :
   `Si <condition>, le système doit <réponse observable>.`

4. Exigence d'état :
   `Pendant <état>, le système doit <comportement observable>.`

5. Exigence d'option :
   `Le système peut <comportement optionnel>, à condition que <contrainte obligatoire>.`

## Termes à éviter

Les termes suivants sont à éviter dans l'énoncé normatif d'une exigence :

- rapide
- intuitif
- facile
- agréable
- robuste
- adapté
- suffisant
- correctement
- efficacement
- au mieux
- si possible
- autant que possible
- normalement

Ces termes peuvent apparaître dans `Rationale`, mais pas comme critère normatif non mesurable.

## Structure obligatoire d'une exigence

Chaque exigence doit suivre ce gabarit :

```markdown
#### Titre court
`req~domain.slug~1`

Status: approved
Priority: high|medium|low
Verification: test|manual-review|inspection|command

Énoncé normatif avec "doit" ou "ne doit pas".

Rationale:
Justification courte.

Acceptance criteria:
- Critère observable 1.
- Critère observable 2.

Needs:
- impl
- utest
```

## Cohérence entre Verification et Needs

- `Verification: test` implique généralement `Needs: impl, utest`.
- `Verification: command` implique généralement `Needs: impl`.
- `Verification: manual-review` ou `inspection` implique généralement `Needs: impl`.
- Ne pas indiquer `utest` si aucun test automatisé pertinent n'est attendu.
- Ne pas créer de faux test pour satisfaire la traçabilité.

## Règles de qualité

Avant validation, chaque exigence doit respecter cette checklist :

- une seule obligation principale par exigence ;
- un sujet explicite ;
- un comportement observable ;
- une exigence atomique ;
- une formulation non ambiguë ;
- aucun détail d'implémentation dans une exigence produit ;
- des critères d'acceptation vérifiables ;
- une méthode de vérification cohérente ;
- un ID stable ;
- des liens OpenFastTrace maintenus.

## Règles de modification

- Une correction rédactionnelle sans changement de sens conserve le même identifiant.
- Un changement de portée ou de comportement crée une nouvelle version d'identifiant.
- Toute modification de spec doit mettre à jour le `Change history` de la page.
- Toute modification de spec doit respecter ces règles avant commit.

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-03 | 1.3.0 | 1.2.0 | docs/requirements/writing-rules.md | Added requirement writing rules | Keep requirement authoring constraints versioned in the repository |
