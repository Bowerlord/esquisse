---
description: Proposer trois directions vraiment distinctes, rendues sur le même écran, et faire choisir
---

# /esquisse:directions

Lis `esquisse/cadrage.md`, `esquisse/ux.md`, `esquisse/references.md` et
`docs/ANTI-SLOP.md`. Si le plugin `frontend-design` est installé, charge sa skill.

## Trois directions, pas trois variantes

Une direction se définit sur quatre axes :

- **Palette** : 4 à 6 couleurs nommées, avec l'origine de chacune
- **Typographie** : titrage, lecture, données, avec la raison du choix
- **Structure** : comment l'écran est découpé et ce qu'on voit en premier, en
  une phrase et un croquis ASCII
- **Signature** : le seul élément dont on se souviendra, tiré du métier

**Règle de distance : deux directions diffèrent sur au moins trois axes.** Changer
la palette d'une même structure n'est pas une nouvelle direction, c'est du
theming. Chaque direction s'appuie sur des références différentes du panier.

## Avant de dessiner : le test du même prompt

Pour chaque direction, demande-toi si un générateur quelconque arriverait au même
endroit avec « <type> moderne pour <métier> ». Si un axe y ressemble, change-le,
et écris ce que tu as changé et pourquoi. Écarte les trois rendus par défaut
(crème et terracotta, noir et accent acide, quotidien à filets fins) sauf si le
cadrage les demande.

## Rendre, pas décrire

Chaque direction est **rendue sur le même écran clé**, celui de la tâche la plus
fréquente, dans `esquisse/directions/<a|b|c>-<nom>.html`. HTML autonome, polices
Google Fonts autorisées, vraies données. On choisit sur une image, jamais sur un
paragraphe.

## Vérification

```
node <plugin>/scripts/check-slop.mjs esquisse/directions --captures esquisse/captures/directions
```

Une direction qui échoue ne se montre pas : corrige-la d'abord. Puis regarde les
captures et applique le test de substitution de `ANTI-SLOP.md`.

## Faire choisir

Présente les trois captures, chacune avec ses quatre axes et les références
dont elle vient. Recommande-en une, en le disant. L'utilisateur peut mélanger :
« la structure de A avec la palette de C » est une réponse valable, à condition
de revérifier la cohérence.

## Ce que tu écris

`esquisse/direction.md` : la direction retenue, ses tokens (palette, polices,
échelle, rayons, espacements, ombres), sa signature, et une section
« Partis pris assumés » qui lève les marqueurs volontaires. Et dans
`esquisse/validation.md` :

```
direction: <nom> validée le <date>
```

Puis : `/esquisse:maquettes`.
