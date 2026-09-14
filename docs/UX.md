# UX : ce qui se décide avant la première couleur

> L'interface générée soigne l'écran nominal et oublie tout le reste. Le travail
> UX d'Esquisse porte précisément sur ce reste : les parcours, les états, la
> hiérarchie, ce qu'on voit en premier.

---

## Les livrables de l'étape UX

1. **Les utilisateurs et leurs tâches**, classées par fréquence. La tâche faite
   cinquante fois par jour dicte l'interface, pas celle qu'on montre en démo
2. **Les parcours** : pour chaque tâche fréquente, la suite des écrans et le
   nombre d'actions. On compte les clics
3. **L'inventaire des écrans**, et pour chacun : sa tâche, ce qu'on voit en
   premier, ses états
4. **Les wireframes** : HTML en niveaux de gris uniquement, blocs et vrais
   libellés. Aucune couleur, aucune police choisie. Le check le vérifie avec
   `--wireframe`

Un wireframe en gris force la hiérarchie à exister sans couleur. Si l'écran ne se
lit pas en gris, la couleur ne le sauvera pas.

---

## Les quatre états

Toute vue qui affiche des données en a quatre : **vide, en attente, en erreur,
rempli.** On dessine le vide en premier : c'est le premier écran d'un nouvel
utilisateur, et c'est toujours celui qu'on oublie.

- **Vide** : une phrase qui dit ce qui manque, un seul bouton qui en sort
- **En attente** : la mise en page ne saute pas, la place du contenu est tenue
- **En erreur** : ce qui a échoué, et ce que la personne peut faire
- **Rempli** : y compris avec trop de données. Une liste de 3 lignes et une liste
  de 3 000 ne se conçoivent pas pareil

---

## Par type de projet

### Vitrine

- Une action principale, une seule. Les autres sont classées
- Le haut de page est une thèse : l'objet le plus caractéristique du client, pas
  un grand titre générique avec trois chiffres
- Oubliés neuf fois sur dix : la confirmation d'envoi, la 404, l'envoi en panne

### Application

- L'écran est un outil, utilisé cent fois par jour : densité compacte, mouvement
  quasi nul, accent réservé à l'action et au statut
- Actions destructrices confirmées, et annulables quand c'est possible
- Erreurs de formulaire au champ concerné

### CRM et back-office

Le type le plus exposé au générique : tableau de bord à quatre cartes chiffrées,
graphique en courbe, liste. On l'évite en partant du travail réel.

- **Commencer par la question du matin.** « Qui dois-je relancer aujourd'hui ? »
  vaut mieux qu'un tableau de bord. Le premier écran répond à cette question
- **La liste est l'écran principal**, pas le tableau de bord : dense, triable,
  filtrable, avec les colonnes que le métier lit vraiment
- **La fiche** porte l'historique chronologique des échanges, et l'action
  suivante en tête, datée
- **Saisie rapide** : noter un appel doit prendre moins de dix secondes, sans
  quitter la liste
- **Les statuts sont du vocabulaire du métier**, pas « lead / prospect / client »
  par défaut
- **Clavier** : recherche globale, navigation dans la liste, raccourcis visibles
- Oubliés neuf fois sur dix : l'import de la liste existante (souvent un tableur),
  les doublons, ce qu'on voit quand rien n'est à relancer

### SaaS

Tout ce qui précède, plus : l'inscription va jusqu'au premier moment utile, la
page de tarifs dit ce qui arrive au dépassement, la résiliation se fait sans
écrire à un humain. Deux territoires : le site public et l'outil, dosés
différemment.
