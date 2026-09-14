# UX : CRM de prospection de clubs de plongée

## La décision de structure qui compte

**Pas de tableau de bord.** Le générique d'un CRM, c'est quatre cartes chiffrées,
une courbe et une liste. Fernando n'a pas besoin de savoir combien, il a besoin de
savoir **qui appeler maintenant et quoi lui proposer**. Le premier écran croise
donc les deux choses qu'il vend l'une contre l'autre : **les clubs à relancer** et
**les places à remplir**.

## Parcours

### P1. Le matin : qui relancer (chaque jour)

1. Ouvrir l'outil : **Aujourd'hui** s'affiche, clubs à relancer en tête
2. Lire la ligne : dernier échange, prochaine action prévue

**1 action.** Aucune navigation.

### P2. Noter un échange (plusieurs fois par jour)

1. Sur la ligne du club, « Noter un échange »
2. Choisir appel, mail ou rencontre, écrire une phrase
3. Choisir la date de la prochaine relance, enregistrer

**3 actions, sans quitter la liste.** La saisie s'ouvre dans la ligne.

### P3. Proposer des places (plusieurs fois par semaine)

1. Colonne « Départs à remplir » d'Aujourd'hui : places libres visibles sans clic
2. Ouvrir le départ pour voir les options posées et les niveaux requis

**1 à 2 actions.**

### P4. Poser une option (chaque semaine)

1. Depuis la fiche club ou le départ, « Poser une option »
2. Nombre de places, date d'expiration, enregistrer

**3 actions.** L'option apparaît dans « Options qui expirent » d'Aujourd'hui dès
sept jours avant l'échéance.

### P5. Préparer un appel (chaque semaine)

1. Cliquer le nom du club : la fiche s'ouvre, historique chronologique complet

**1 action.**

## Inventaire des écrans

| Écran | Tâche | Ce qu'on voit en premier | États |
|---|---|---|---|
| Aujourd'hui | P1, P2, P3 | Le premier club à relancer, et pourquoi | vide (rien à relancer), premier lancement (aucun club), attente, erreur, rempli |
| Fiche club | P5, P4 | La prochaine action, datée | attente, erreur, rempli, club sans échange |
| Départs | P3, P4 | Les départs qui ont encore des places | vide, attente, erreur, rempli |
| Clubs | recherche, filtres | La liste triée par prochaine relance | vide, filtre sans résultat, attente, erreur, rempli |
| Commissions | suivi mensuel | Le total du mois | vide, attente, erreur, rempli |
| Import | une fois | Le format attendu du tableur | fichier refusé, doublons trouvés, réussi |

## Wireframes produits

- `wireframes/aujourdhui.html` : l'écran principal, avec la saisie ouverte sur une ligne
- `wireframes/aujourdhui-vide.html` : rien à relancer, et premier lancement
- `wireframes/fiche-club.html` : la fiche et son historique
- `wireframes/departs.html` : les départs et leurs places

Clubs, Commissions et Import sont inventoriés mais pas dessinés ce soir.
