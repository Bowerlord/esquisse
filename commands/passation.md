---
description: Transformer les maquettes validées en contrat de construction pour le code
---

# /esquisse:passation

Les maquettes sont validées. Cette étape écrit ce dont le code a besoin pour ne
pas trahir le design au moment de l'implémentation, là où il dérive le plus.

## Ce que tu écris

`esquisse/passation.md` :

1. **Les tokens** de `direction.md`, traduits dans la techno cible du cadrage
   (variables CSS, thème Tailwind, thème de composants)
2. **La correspondance écran → maquette → route**
3. **Les composants récurrents**, avec leurs états et la maquette qui les montre
4. **La signature** : où elle apparaît, et ce qui la casserait
5. **Les partis pris assumés**, pour qu'un développeur ne les « corrige » pas

## La règle pour la suite

Pendant le développement, relance le check sur l'application servie :

```
node <plugin>/scripts/check-slop.mjs http://localhost:3000/ --captures esquisse/captures/app
```

Un marqueur qui apparaît dans le code et n'était pas dans les maquettes est une
dérive, pas un détail.
