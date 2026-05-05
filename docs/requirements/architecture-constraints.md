#### Centralisation d'un élément graphique réutilisable
`req~architecture.graphics.asset-module~1`

Status: approved  
Priority: medium  
Verification: inspection  

Chaque élément graphique réutilisable doit être défini dans un dossier ou module dédié qui regroupe sa déclaration, son apparence visuelle et ses animations.

Rationale: Cette contrainte rend chaque élément graphique modifiable sans rechercher ses définitions dans plusieurs zones non liées de l’arborescence.

Acceptance criteria:

- Chaque personnage possède un dossier ou module dédié.
- Chaque objet animé possède un dossier ou module dédié.
- Chaque effet visuel réutilisable possède un dossier ou module dédié.
- Le dossier ou module dédié contient la déclaration de l’élément graphique ou importe explicitement cette déclaration.
- Le dossier ou module dédié contient l’apparence visuelle de l’élément graphique ou importe explicitement cette apparence.
- Le dossier ou module dédié contient les animations de l’élément graphique ou importe explicitement ces animations.

Needs: impl
