# Direction retenue : B · Tableau des départs

Choisie par l'utilisateur le 2026-09-14, parmi trois (A carnet de plongée, C lecture croisée).

## L'idée

Fernando vend des **départs**. Son objet naturel est donc le tableau des départs,
pris dans un autre transport : chaque place est un volet, vendue, en option ou
libre. Les clubs à relancer sont le quai, en dessous.

## Références mobilisées

- Tableau des départs à volets Solari : les places en volets, la colonne d'état
- Carnet de plongée : le vocabulaire des étapes, écrit comme des mentions et non des pastilles
- Are.na : la retenue du reste de l'interface, pour que le panneau soit le seul geste

## Tokens

### Palette

| Nom | Valeur | Origine et usage |
|---|---|---|
| hall | `#E8EDEC` | le hall de gare, clair et froid. Fond général |
| quai | `#F6F8F7` | la zone de travail, les relances |
| encre | `#0F2430` | le texte |
| attenue | `#56666D` | métadonnées |
| filet | `#C2CCCF` | séparations |
| tableau | `#0D2937` | le panneau, bleu nuit lagon plutôt que noir |
| volet | `#173A4B` | un volet |
| lettre | `#ECEEE4` | les lettres du panneau |
| jaune | `#F0BC2C` | le jaune des panneaux : **seulement les options et ce qui expire** |

### Typographie

- titrage : Archivo en largeur 62 à 75 %, capitales, graisse 700
- lecture : Archivo en largeur 87 à 100 %, graisse 400 à 600, 15 px
- données sur volets : Martian Mono 600, 14 px
- échelle : 11, 13, 15, 19, 34 px

### Structure

- rayons : 0 partout, 2 px sur les volets seulement
- ombres : aucune
- densité : compacte, c'est un outil
- mouvement : aucun. Les volets ne défilent pas, l'outil s'ouvre cent fois par jour

## Signature

**Le volet.** Il porte uniquement une donnée qui change : une date, un compte, une
place, un délai. Jamais une phrase, jamais un titre de navigation.

Ce qui la casserait : des volets partout (elle deviendrait un effet), les faire
défiler, ou mettre du jaune ailleurs que sur une option.

## Règles de la direction

1. Le panneau sombre est réservé aux départs. La navigation et les relances restent claires
2. Le jaune ne signifie qu'une chose : une option, ou une échéance
3. Les étapes du suivi sont des mentions en capitales sur fond de panneau, pas des pastilles colorées
4. Tout ce qui est prose reste en Archivo, jamais en mono

## Partis pris assumés

Aucun marqueur levé : la direction passe le check sans exemption.
