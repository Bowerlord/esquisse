# Cadrage : CRM de prospection de clubs de plongée

- type: crm

## Métier

Fernando est **agent commercial** pour un opérateur de croisières plongée aux
Maldives. Il ne possède pas les bateaux : il vend les places de **deux bateaux**
et touche **3 % de commission**. Son canal qui marche est le **B2B** : il démarche
des clubs de plongée pour qu'ils proposent une croisière à leurs membres, en
voyage de groupe. Le bouche-à-oreille entre clubs fait le reste.

Ce qu'il vend n'est donc pas une place à un plongeur, c'est **un voyage de club**,
décidé collectivement, souvent des mois à l'avance.

## Utilisateurs et tâches

| Utilisateur | Tâche | Fréquence |
|---|---|---|
| Fernando | Savoir quel club relancer aujourd'hui | chaque matin |
| Fernando | Noter un appel, un mail ou une rencontre | plusieurs fois par jour |
| Fernando | Voir les places libres d'un départ pour les proposer | plusieurs fois par semaine |
| Fernando | Poser une option de places pour un club, et la suivre jusqu'à expiration | chaque semaine |
| Fernando | Relire tout l'historique d'un club avant un appel | chaque semaine |
| Fernando | Suivre ses commissions | chaque mois |
| Fernando | Importer sa liste de clubs existante | une fois |

## Contenu réel disponible

- Le modèle économique ci-dessus, établi le 2026-09-03
- Aucune donnée client réelle : **les clubs, contacts, dates et effectifs des
  maquettes sont des exemples**, écrits pour être plausibles et marqués comme tels
  dans le README. Ce ne sont pas des chiffres présentés comme vrais

## Vocabulaire du métier

- **Club** plutôt que « compte » ou « lead ». Un club a un **président** et souvent
  un **responsable des sorties**, qui ne sont pas la même personne
- **Réunion de bureau**, **assemblée générale** : les moments où le voyage se décide
- **Départ**, **croisière**, **itinéraire** (atolls), **places**, **cabines**
- **Option** : des places bloquées pour un club, avec une date d'expiration
- **Niveaux** : N1, N2, N3, Open Water, Advanced. **Nitrox**. Ils conditionnent
  l'itinéraire proposable
- **Nombre de plongées** d'un départ, **Malé** comme point de départ

## Contraintes

- Un seul utilisateur, souvent au téléphone : la saisie doit tenir d'une main,
  pendant ou juste après l'appel
- Ordinateur au bureau, téléphone en déplacement dans les clubs
- Maquettes en HTML statique ce soir, techno cible non décidée

## Hors périmètre

- La réservation et le paiement : ils passent par l'outil de l'opérateur
- L'envoi d'e-mails depuis le CRM
- Plusieurs utilisateurs

## Décisions prises sans lui

| Point | Choix | Raison |
|---|---|---|
| Premier écran | « Aujourd'hui », pas un tableau de bord | La question du matin est « qui relancer », pas « combien » |
| Étapes du suivi | À contacter, Premier échange, Présenté en bureau, Option posée, Groupe confirmé, Pas cette saison | Elles suivent la manière dont un club décide réellement, collectivement |
| Noms des bateaux | « Bateau 1 » et « Bateau 2 » | Les vrais noms ne sont pas connus, on n'en invente pas |
| Hypothèse à vérifier avec lui | Les clubs décident de leur voyage en réunion de bureau ou en AG | Non confirmé, c'est ce qui justifie l'étape « Présenté en bureau » |
