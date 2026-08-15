# PROMPTS.md

## 1. Outils d'IA sollicités

Dans le cadre de la réalisation du projet, plusieurs outils d'intelligence artificielle ont été utilisés. Chaque outil a été sollicité pour des tâches spécifiques selon ses capacités.

| Outil        | Utilisation principale                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| **ChatGPT**  | Réflexion, génération de contenu, aide à la conception, résolution de problèmes et amélioration des prompts |
| **Claude**   | Analyse, structuration des idées, génération et amélioration du contenu                                     |
| **Stitch**   | Génération et exploration des interfaces utilisateur à partir de descriptions textuelles                    |
| **Lovable**  | Génération et développement de l'application/interface à partir de prompts                                  |
| **Figma AI** | Création, amélioration et exploration des maquettes et éléments d'interface                                 |

---

## 2. Séquence des prompts significatifs

### 2.1. ChatGPT — Analyse et conception

ChatGPT a principalement été utilisé au début du projet afin de clarifier les besoins, structurer les fonctionnalités et définir une première approche du projet.

**Prompt initial :**

> "Je souhaite concevoir une application permettant de [décrire brièvement le besoin]. Propose-moi une structure fonctionnelle de l'application avec les principales fonctionnalités, les différentes pages et le parcours utilisateur."

Ce prompt a permis d'obtenir une première proposition d'architecture fonctionnelle.

**Prompt d'amélioration :**

> "Analyse cette proposition et identifie les fonctionnalités qui pourraient être améliorées, supprimées ou ajoutées afin de rendre l'expérience utilisateur plus simple et intuitive."

Cette étape a permis de revoir certaines fonctionnalités et de simplifier le parcours utilisateur.

---

### 2.2. Claude — Structuration et amélioration

Claude a ensuite été utilisé pour analyser les propositions obtenues et améliorer leur cohérence.

**Prompt utilisé :**

> "À partir de cette description du projet, propose une structure claire des fonctionnalités et organise-les par priorité. Identifie également les éventuels problèmes de cohérence ou les fonctionnalités manquantes."

Claude a permis d'obtenir une seconde analyse du projet et de comparer différentes approches.

Un autre prompt a été utilisé pour améliorer les contenus :

> "Réécris cette description afin qu'elle soit plus claire, concise et adaptée à une application destinée aux utilisateurs finaux."

Les propositions obtenues ont ensuite été comparées avec celles produites par ChatGPT.

---

### 2.3. Stitch — Exploration de l'interface

Stitch a été utilisé principalement pour explorer rapidement différentes possibilités de design et de structure d'interface.

**Prompt utilisé :**

> "Create a modern and clean interface for [nom de la fonctionnalité]. The interface should be simple, intuitive and responsive. Use a clear visual hierarchy and provide an easy navigation experience."

Plusieurs variantes ont été générées afin de comparer différentes organisations des éléments de l'interface.

Les propositions générées par Stitch ont servi de base pour réfléchir à la disposition des composants et à l'expérience utilisateur.

---

### 2.4. Lovable — Génération de l'application

Lovable a été utilisé pour transformer les spécifications fonctionnelles et les idées d'interface en une première version fonctionnelle de l'application.

**Prompt principal :**

> "Create a responsive web application for [description du projet]. The application should include [liste des fonctionnalités principales]. Use a modern, clean and intuitive design. The navigation should be simple and the interface should be responsive on desktop and mobile."

Des prompts supplémentaires ont ensuite été utilisés pour améliorer progressivement l'application.

**Exemple :**

> "Improve the dashboard layout. Make the hierarchy clearer, improve spacing between components and make the interface more consistent. Keep the existing functionality unchanged."

Puis :

> "Make the application responsive for mobile devices. Adapt the navigation, cards, buttons and forms while maintaining the desktop experience."

Cette approche a permis d'effectuer plusieurs itérations directement à partir des résultats générés.

---

### 2.5. Figma AI — Maquettes et amélioration visuelle

Figma AI a été utilisé pour explorer et améliorer les aspects visuels de l'interface.

**Prompt utilisé :**

> "Generate a modern dashboard interface based on the following requirements: [description]. Use a clean layout, consistent spacing, accessible typography and a coherent color palette."

Figma AI a également été utilisé pour tester différentes variantes de composants et de mises en page.

Les résultats ont ensuite été ajustés manuellement dans Figma afin d'obtenir une interface cohérente avec les objectifs du projet.

---

## 3. Ajustements manuels effectués

Les résultats générés par les différentes IA n'ont pas été utilisés tels quels. Plusieurs modifications manuelles ont été nécessaires.

### 3.1. Ajustements fonctionnels

Certaines fonctionnalités proposées par les IA ne correspondaient pas exactement aux besoins du projet.

**Modifications réalisées :**

* Suppression des fonctionnalités inutiles ou trop complexes.
* Ajout de fonctionnalités spécifiques au projet.
* Modification de certains parcours utilisateurs.
* Réorganisation des pages et des fonctionnalités.
* Adaptation des formulaires aux besoins réels.

**Pourquoi ?**

Les IA proposent généralement des solutions génériques basées sur les informations fournies dans le prompt. Une validation humaine était donc nécessaire afin de vérifier que chaque fonctionnalité correspondait réellement aux besoins du projet.

---

### 3.2. Ajustements de l'interface

Plusieurs éléments graphiques ont également été modifiés manuellement :

* couleurs ;
* typographies ;
* tailles des textes ;
* espacements ;
* dimensions des composants ;
* disposition des éléments ;
* boutons et formulaires ;
* navigation ;
* responsive design.

**Pourquoi ?**

Les propositions générées automatiquement pouvaient être visuellement intéressantes mais ne respectaient pas toujours les choix graphiques ou les contraintes du projet.

---

### 3.3. Ajustements du code

Dans la version générée avec Lovable, certains éléments ont été corrigés ou adaptés manuellement.

Les principales interventions concernaient :

* la correction de certains comportements ;
* l'ajustement de la logique de certaines fonctionnalités ;
* la modification de composants ;
* la gestion de certains cas particuliers ;
* l'amélioration de la responsivité ;
* la correction de problèmes d'affichage.

**Pourquoi ?**

Le code généré automatiquement constitue une bonne base de développement, mais il nécessite une vérification et parfois des corrections pour répondre précisément aux besoins fonctionnels du projet.

---

## 4. Limites rencontrées avec les outils

L'utilisation des différentes IA a également présenté certaines limites.

### 4.1. Compréhension du contexte

Les IA peuvent mal interpréter certaines consignes lorsque le contexte du projet est complexe ou insuffisamment détaillé.

Par exemple, un prompt trop général peut conduire à une fonctionnalité différente de celle attendue.

**Solution :**

Les prompts ont été progressivement détaillés en ajoutant :

* le contexte ;
* les objectifs ;
* les contraintes ;
* les fonctionnalités attendues ;
* les éléments à ne pas modifier.

---

### 4.2. Résultats différents selon les outils

Un même prompt peut produire des résultats très différents selon l'outil utilisé.

ChatGPT et Claude peuvent proposer des architectures ou des raisonnements différents, tandis que Stitch, Figma AI et Lovable sont davantage orientés vers la conception ou la génération d'interfaces.

Il a donc été nécessaire de comparer les résultats avant de retenir une solution.

---

### 4.3. Génération parfois trop générique

Certaines propositions étaient pertinentes mais trop génériques pour répondre précisément aux besoins du projet.

Des prompts supplémentaires ont donc été nécessaires afin d'obtenir des résultats plus spécifiques.

---

### 4.4. Nécessité d'une validation humaine

Les résultats générés par l'IA ont toujours été vérifiés avant leur intégration au projet.

L'IA a principalement servi comme **outil d'assistance et d'accélération**, et non comme remplacement complet de la réflexion, de la conception et de la validation humaine.

---

## 5. Synthèse de l'utilisation des IA

Le processus global peut être résumé comme suit :

**ChatGPT → Claude → Stitch → Figma AI → Lovable → Ajustements manuels → Validation finale**

Les différentes IA ont été utilisées de manière complémentaire :

* **ChatGPT** : réflexion et conception ;
* **Claude** : analyse et structuration ;
* **Stitch** : exploration des interfaces ;
* **Figma AI** : conception et amélioration visuelle ;
* **Lovable** : génération de l'application ;
* **Intervention humaine** : validation, correction et adaptation finale.

Cette approche a permis d'accélérer les différentes phases du projet tout en conservant un contrôle humain sur les décisions fonctionnelles, techniques et graphiques.
