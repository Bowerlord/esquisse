---
description: Dessiner tous les écrans et leurs états dans la direction choisie, puis les critiquer sur capture
---

# /esquisse:maquettes

Lis `esquisse/ux.md`, `esquisse/direction.md` et `docs/ANTI-SLOP.md`.

## Ce que tu produis

`esquisse/maquettes/*.html` : chaque écran de l'inventaire UX, **et ses états**.
L'état vide de l'écran principal est une maquette à part entière, pas une note.

- Tous les tokens viennent de `direction.md`. Rien d'autre. Si un écran en
  demande un nouveau, ajoute-le dans `direction.md` en le disant
- Une feuille de style partagée `esquisse/maquettes/systeme.css`, pour que le
  système soit un système et pas une suite de pages
- Vraies données, vrais libellés, vocabulaire du cadrage
- Responsive jusqu'au téléphone, focus clavier visible, mouvement réduit respecté

## La boucle de critique, obligatoire

Pour chaque écran :

1. `node <plugin>/scripts/check-slop.mjs esquisse/maquettes --mobile --captures esquisse/captures/maquettes`
2. **Regarde les captures, bureau et téléphone.** Pas le code : les captures. Sur
   téléphone, vérifie que ce que l'UX met en premier est bien au-dessus de la ligne
   de flottaison : aucun script ne le voit
3. **Test de substitution** : l'écran tient-il avec un autre client ? Si oui, où
   placer le détail que seul ce client aurait ?
4. **Le miroir** : retire un accessoire
5. Recommence jusqu'à un check vert et un écran que tu défendrais

## Validation

Montre les maquettes. Quand l'utilisateur valide, inscris dans
`esquisse/validation.md` :

```
maquettes: validées le <date>
```

**C'est cette ligne qui autorise l'écriture du code applicatif.** Avant elle, le
hook d'Esquisse refuse toute écriture de fichier source hors du dossier
`esquisse/`.

Puis : `/esquisse:passation`.
