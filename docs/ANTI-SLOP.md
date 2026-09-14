# Anti-slop : la règle qui passe avant toutes les autres

> Une interface générée se reconnaît en une seconde. Pas parce qu'elle est laide :
> parce qu'elle n'a rien décidé. Elle ressemble à la moyenne de tout ce qui existe.
>
> Esquisse existe pour produire l'inverse : une interface qu'on ne peut pas
> confondre avec celle d'un autre produit. Chaque commande applique ce fichier.

---

## Le test de substitution

Remplace le nom du client par celui d'un concurrent, ou d'un métier voisin.
**Si l'écran tient encore, il est générique.** Il faut au moins un élément que
seul ce client pourrait porter : ses unités, ses documents, ses objets, son
vocabulaire, sa manière de classer.

C'est le test le plus important de ce fichier, et il ne se délègue à aucun script.

## Le test du même prompt

Avant de montrer une direction, pose-toi la question : si on demandait « une
interface de CRM moderne » à n'importe quel générateur, arriverait-il au même
endroit ? Si oui, ce n'est pas une direction, c'est une moyenne. Revois l'axe qui
ressemble, dis ce que tu as changé et pourquoi.

---

## D'où vient la créativité : voler juste

On ne crée pas à partir de rien, et le générique naît justement de là : sans
référence, le modèle retombe sur sa moyenne.

**Esquisse s'inspire de designs existants, uniques, et le dit.** Trois règles :

1. **Plusieurs sources, jamais une.** Copier un seul produit donne un pastiche.
   Croiser trois sources qui n'ont rien à voir donne une identité
2. **On vole des idées de structure, pas des palettes.** Comment la page est
   découpée, ce qui porte l'attention, un geste typographique, une manière de
   montrer une donnée. Jamais le jeu de couleurs d'un produit
3. **Au moins une source hors écran**, prise dans le monde du client : un
   document de métier, un instrument, une signalétique, un emballage, une carte

**Références épuisées, refusées comme source principale :** Linear, Notion,
Stripe, Vercel, Apple, Airbnb, Raycast, Arc. Ils ont été copiés au point de
devenir eux-mêmes des marqueurs. Voir `docs/REFERENCES.md`.

---

## Les marqueurs

Détectés par `scripts/check-slop.mjs` sur le rendu réel, pas sur le code source.
**Aucun n'est interdit dans l'absolu.** Ils bloquent quand personne ne les a
choisis. Un parti pris écrit dans `esquisse/direction.md`, section
« Partis pris assumés », lève le marqueur correspondant.

### Visuels

| Identifiant | Signature |
|---|---|
| `police-defaut` | La face dominante est Inter, Roboto, Arial, Helvetica, system-ui, Segoe UI, Poppins, Montserrat, Open Sans, Space Grotesk ou Geist |
| `creme-terracotta` | Fond proche de `#F4F1EA`, titrage serif, accent terracotta |
| `noir-acide` | Fond presque noir et un seul accent vert acide ou vermillon |
| `degrade-violet` | Dégradé qui part d'un violet ou d'un indigo |
| `verre-depoli` | `backdrop-filter: blur` sur fond translucide |
| `rayon-unique` | Tous les blocs arrondis ont le même rayon |
| `cartes-ombrees` | Plus de huit blocs arrondis portent une ombre : tout est une carte |
| `tout-centre` | Plus de la moitié du texte est centré |

### Structurels

| Identifiant | Signature |
|---|---|
| `badge-pilule` | Petite pilule arrondie posée au-dessus du titre principal |
| `trio-icones` | Trois colonnes identiques icône, titre, phrase |
| `numerotation-deco` | 01 / 02 / 03 alors que le contenu n'est pas une séquence (avertissement) |
| `emoji-section` | Emoji en tête de titre |

### Rédactionnels

| Identifiant | Signature |
|---|---|
| `formule-creuse` | « Transformez votre… », « Libérez le potentiel », « sans effort », « révolutionnaire », « unlock », « seamless » |
| `faux-contenu` | Lorem ipsum, John Doe, « Votre texte ici », chiffres ronds inventés |

### D'étape

| Identifiant | Signature |
|---|---|
| `couleur-en-wireframe` | Une couleur saturée dans un wireframe (option `--wireframe`) |
| `debordement-telephone` | La page défile de côté à 390 px de large (option `--mobile`) |

---

## Ce que le script ne voit pas

Le script attrape les réflexes. Il ne sait pas dire si une interface a une idée.
Deux contrôles restent humains, et ils sont obligatoires à chaque rendu :

- **Le test de substitution**, ci-dessus
- **Le miroir** : regarder la capture, et retirer un accessoire. Une ombre, un
  filet, une couleur, une animation. L'audace se dépense à un seul endroit
