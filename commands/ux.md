---
description: Concevoir les parcours, les écrans et leurs états, puis les wireframes en gris
---

# /esquisse:ux

Lis d'abord `esquisse/cadrage.md` et `docs/UX.md`.

**Aucune couleur, aucune police choisie à cette étape.** On décide de ce qui
existe et de ce qu'on voit en premier. L'apparence vient après, et elle ne
rattrape jamais une hiérarchie absente.

## Ce que tu produis

### 1. `esquisse/ux.md`

- **Les parcours** des tâches fréquentes, écran par écran, avec le nombre
  d'actions. Si une tâche fréquente dépasse trois actions, justifie ou simplifie
- **L'inventaire des écrans** : pour chacun sa tâche, ce qu'on voit en premier,
  et ses quatre états (vide, attente, erreur, rempli) quand il affiche des données
- **Les décisions de structure** qui ne sont pas évidentes, avec leur raison

### 2. `esquisse/wireframes/*.html`

Un fichier par écran clé. HTML autonome, niveaux de gris uniquement, police
système, **vrais libellés et vraies données tirées du cadrage**. L'état vide de
l'écran principal a son propre fichier.

## Vérification

```
node <plugin>/scripts/check-slop.mjs esquisse/wireframes --wireframe --captures esquisse/captures/wireframes
```

`--wireframe` refuse toute couleur saturée. Regarde les captures : si l'écran ne
se lit pas en gris, reprends la hiérarchie.

## Validation

Montre les wireframes à l'utilisateur et demande-lui de valider les parcours.
Inscris sa réponse dans `esquisse/validation.md` :

```
ux: validée le <date>
```

Puis : `/esquisse:references`.
