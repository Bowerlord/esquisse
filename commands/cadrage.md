---
description: Cadrer le projet en une conversation courte, puis écrire esquisse/cadrage.md
---

# /esquisse:cadrage

Première étape. On ne dessine rien ici, on comprend ce qu'on va dessiner.

## Ce que tu établis

1. **Le type** : vitrine, application, CRM ou back-office, SaaS
2. **Le client et son métier**, dans ses mots
3. **Les utilisateurs**, et pour chacun les trois tâches les plus fréquentes
4. **Le contenu réel** : ce qui existe (textes, données, exports, logo, photos)
5. **Le vocabulaire du métier** : les mots, unités et documents que ce client
   emploie et qu'un concurrent n'emploierait pas. C'est la matière première
   de l'anti-slop, ne le bâcle pas
6. **Les contraintes** : appareils, techno cible, délai
7. **Le hors périmètre**

## Comment tu poses les questions

Une question à la fois, avec deux ou trois réponses concrètes tirées du contexte,
plus une option ouverte. Si l'outil `AskUserQuestion` est disponible, utilise-le,
en groupant jusqu'à quatre questions.

**Tu tranches quand il ne tranche pas.** Sur une réponse vague ou « comme tu
veux », tu choisis en cohérence avec le métier, tu annonces le choix en une
phrase avec sa raison, et tu l'inscris au tableau « Décisions prises sans lui ».

**Tu ne tranches jamais ce qui engage le client dans le monde réel** : un prix,
une promesse, une mention légale, la destination d'une donnée.

**Tu refuses l'adjectif vide.** « Moderne », « épuré », « professionnel » ne sont
pas des réponses : demande ce que ça veut dire concrètement pour lui.

## Ce que tu écris

`esquisse/cadrage.md` :

```markdown
# Cadrage : <projet>

- type: vitrine | app | crm | saas

## Métier
## Utilisateurs et tâches
| Utilisateur | Tâche | Fréquence |
## Contenu réel disponible
## Vocabulaire du métier
## Contraintes
## Hors périmètre
## Décisions prises sans lui
| Point | Choix | Raison |
```

Puis : `/esquisse:ux`.
