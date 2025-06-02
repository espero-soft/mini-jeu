# 🧠 Mini-Jeu de Quiz - Guide d'Utilisation

## 📖 Description

Un jeu de quiz interactif développé en JavaScript vanilla pour tester vos connaissances en culture générale. Le jeu propose 10 questions à choix multiples avec un système de score, un timer, et une interface moderne et intuitive.

## 🎯 Fonctionnalités

### ✨ Fonctionnalités Principales

- **Questions à choix multiples** : 10 questions de culture générale
- **Système de score** : Comptage des bonnes réponses en temps réel
- **Timer par question** : 30 secondes pour répondre à chaque question
- **Progression visuelle** : Barre de progression et compteur de questions
- **Feedback immédiat** : Indication visuelle des bonnes/mauvaises réponses
- **Révision des réponses** : Possibilité de revoir toutes les questions avec les explications

### 🎨 Interface Utilisateur

- **Design moderne** : Interface responsive avec dégradés et animations
- **Animations fluides** : Transitions et effets visuels attractifs
- **Responsive** : Adapté aux ordinateurs, tablettes et téléphones
- **Accessibilité** : Support des raccourcis clavier

### 📊 Statistiques Détaillées

- Score final et pourcentage
- Temps total et temps moyen par question
- Nombre de bonnes/mauvaises réponses
- Messages de performance personnalisés

## 🎮 Comment Jouer

### 🚀 Démarrage

1. Ouvrez le fichier `index.html` dans votre navigateur
2. Cliquez sur "Commencer le Quiz" ou appuyez sur Entrée
3. Lisez attentivement chaque question

### 🎯 Répondre aux Questions

- **Clic** : Cliquez sur la réponse de votre choix
- **Clavier** : Utilisez les touches A, B, C, D pour répondre rapidement
- **Timer** : Vous avez 30 secondes par question
- **Feedback** : Recevez un feedback immédiat après chaque réponse

### 📈 Navigation

- **Entrée** : Commencer le quiz ou passer à la question suivante
- **Questions suivantes** : Cliquez sur "Question Suivante" après avoir répondu
- **Fin de partie** : Consultez vos résultats et statistiques

### 🔍 Après le Quiz

- **Résultats** : Visualisez votre score et vos statistiques
- **Révision** : Cliquez sur "Voir les Réponses" pour réviser
- **Recommencer** : Cliquez sur "Recommencer" pour un nouveau quiz

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique de la page
- **CSS3** :
  - Flexbox et Grid pour la mise en page
  - Animations et transitions CSS
  - Design responsive avec media queries
  - Variables CSS pour la cohérence des couleurs
- **JavaScript ES6+** :
  - Gestion des événements
  - Manipulation du DOM
  - Gestion du temps et des timers
  - Logique de jeu et calcul des scores

## 📁 Structure du Projet

```
mini-jeu/
├── index.html          # Structure HTML principale
├── README.md          # Documentation (ce fichier)
└── assets/            # Dossier des ressources
    ├── css/           # Fichiers de style
    │   └── styles.css # Styles CSS et animations
    └── js/            # Fichiers JavaScript
        └── quiz.js    # Logique JavaScript du jeu
```

## 🎨 Personnalisation

### 🔧 Ajouter des Questions

Pour ajouter de nouvelles questions, modifiez le tableau `questions` dans `assets/js/quiz.js` :

```javascript
{
    question: "Votre question ici ?",
    answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    correct: 2, // Index de la bonne réponse (0-3)
    explanation: "Explication de la réponse correcte"
}
```

### ⏱️ Modifier le Timer

Changez la variable `timeLeft` dans la fonction `startTimer()` pour ajuster le temps par question.

### 🎨 Personnaliser l'Apparence

- Modifiez les couleurs dans les variables CSS au début de `assets/css/styles.css`
- Ajustez les animations en modifiant les `@keyframes`
- Changez les polices dans la propriété `font-family`

## 🎯 Améliorations Possibles

- **Catégories de questions** : Permettre de choisir différents thèmes
- **Niveaux de difficulté** : Questions faciles, moyennes, difficiles
- **Multijoueur** : Système de quiz à plusieurs joueurs
- **Sauvegarde des scores** : Historique des performances
- **Son** : Effets sonores pour les bonnes/mauvaises réponses
- **Images** : Support d'images dans les questions
- **Base de données** : Questions stockées dans une base de données

## 🐛 Résolution des Problèmes

### Le quiz ne se charge pas

- Vérifiez que tous les fichiers sont dans la bonne structure de dossiers
- Assurez-vous que JavaScript est activé dans votre navigateur
- Ouvrez la console (F12) pour voir les erreurs éventuelles
- Vérifiez que les chemins vers les fichiers CSS et JS sont corrects dans `index.html`

### L'affichage est cassé

- Vérifiez que le fichier CSS est bien lié dans l'HTML (`assets/css/styles.css`)
- Actualisez la page (Ctrl+F5 ou Cmd+Shift+R)
- Vérifiez la structure des dossiers `assets/css/` et `assets/js/`

### Le timer ne fonctionne pas

- Vérifiez que JavaScript n'est pas bloqué par votre navigateur
- Testez dans un autre navigateur

## 📝 Licence

Ce projet est libre d'utilisation pour des fins éducatives et personnelles. N'hésitez pas à le modifier et l'améliorer selon vos besoins !

## 🤝 Contribution

Vous pouvez contribuer en :

- Ajoutant de nouvelles questions
- Améliorant le design
- Optimisant le code
- Signalant des bugs
- Proposant de nouvelles fonctionnalités

---

**Amusez-vous bien avec le quiz ! 🎉**
