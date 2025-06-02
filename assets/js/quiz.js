// Base de données des questions
const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        answers: ["Londres", "Berlin", "Paris", "Madrid"],
        correct: 2,
        explanation: "Paris est la capitale et la plus grande ville de France."
    },
    {
        question: "Combien y a-t-il de continents sur Terre ?",
        answers: ["5", "6", "7", "8"],
        correct: 2,
        explanation: "Il y a 7 continents : Afrique, Antarctique, Asie, Europe, Amérique du Nord, Océanie et Amérique du Sud."
    },
    {
        question: "Qui a peint 'La Joconde' ?",
        answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correct: 1,
        explanation: "La Joconde a été peinte par Leonardo da Vinci entre 1503 et 1519."
    },
    {
        question: "Quelle est la planète la plus proche du Soleil ?",
        answers: ["Vénus", "Mercure", "Mars", "Terre"],
        correct: 1,
        explanation: "Mercure est la planète la plus proche du Soleil dans notre système solaire."
    },
    {
        question: "En quelle année a eu lieu la Révolution française ?",
        answers: ["1789", "1792", "1799", "1804"],
        correct: 0,
        explanation: "La Révolution française a commencé en 1789 avec la prise de la Bastille le 14 juillet."
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        answers: ["Océan Atlantique", "Océan Indien", "Océan Arctique", "Océan Pacifique"],
        correct: 3,
        explanation: "L'océan Pacifique est le plus grand océan du monde, couvrant environ un tiers de la surface de la Terre."
    },
    {
        question: "Combien d'os y a-t-il dans le corps humain adulte ?",
        answers: ["206", "208", "210", "212"],
        correct: 0,
        explanation: "Le corps humain adulte compte environ 206 os."
    },
    {
        question: "Quelle est la langue la plus parlée au monde ?",
        answers: ["Anglais", "Espagnol", "Chinois mandarin", "Hindi"],
        correct: 2,
        explanation: "Le chinois mandarin est la langue la plus parlée au monde avec plus d'un milliard de locuteurs."
    },
    {
        question: "Quel animal est le symbole de la WWF ?",
        answers: ["Tigre", "Éléphant", "Panda géant", "Baleine"],
        correct: 2,
        explanation: "Le panda géant est le symbole emblématique du WWF (World Wildlife Fund) depuis 1961."
    },
    {
        question: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
        answers: ["1967", "1968", "1969", "1970"],
        correct: 2,
        explanation: "Neil Armstrong et Buzz Aldrin ont marché sur la Lune pour la première fois le 20 juillet 1969 lors de la mission Apollo 11."
    }
];

// Variables du jeu
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let gameStartTime;
let userAnswers = [];
let isAnswered = false;

// Éléments DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const reviewScreen = document.getElementById('review-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const performanceMessage = document.getElementById('performance-message');
const resultDetails = document.getElementById('result-details');
const reviewContent = document.getElementById('review-content');

// Gestionnaires d'événements
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);
reviewBtn.addEventListener('click', showReview);
backToResultsBtn.addEventListener('click', showResults);

// Fonction pour démarrer le jeu
function startGame() {
    hideAllScreens();
    gameScreen.classList.add('active');
    
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    gameStartTime = Date.now();
    
    // Mélanger les questions pour plus de variété
    shuffleArray(questions);
    
    showQuestion();
}

// Fonction pour afficher une question
function showQuestion() {
    isAnswered = false;
    const question = questions[currentQuestionIndex];
    
    // Mettre à jour l'interface
    questionText.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    updateProgress();
    updateScore();
    
    // Générer les options de réponse
    generateAnswerOptions(question);
    
    // Démarrer le timer
    startTimer();
    
    // Cacher le bouton suivant
    nextBtn.style.display = 'none';
}

// Fonction pour générer les options de réponse
function generateAnswerOptions(question) {
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.innerHTML = `
            <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
            <span>${answer}</span>
        `;
        
        answerElement.addEventListener('click', () => selectAnswer(index, answerElement));
        answersContainer.appendChild(answerElement);
    });
}

// Fonction pour sélectionner une réponse
function selectAnswer(selectedIndex, selectedElement) {
    if (isAnswered) return;
    
    isAnswered = true;
    clearInterval(timer);
    
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Enregistrer la réponse de l'utilisateur
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        userAnswer: selectedIndex,
        isCorrect: isCorrect,
        timeSpent: 30 - timeLeft
    });
    
    // Désactiver toutes les options
    const allOptions = document.querySelectorAll('.answer-option');
    allOptions.forEach(option => option.classList.add('disabled'));
    
    // Marquer la réponse sélectionnée
    selectedElement.classList.add('selected');
    
    // Afficher la bonne réponse et marquer les réponses
    setTimeout(() => {
        allOptions.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Mettre à jour le score
        if (isCorrect) {
            score++;
            updateScore();
            showFeedback('Correct ! 🎉', 'success');
        } else {
            showFeedback('Incorrect ! 😔', 'error');
        }
        
        // Afficher le bouton suivant après un délai
        setTimeout(() => {
            nextBtn.style.display = 'block';
        }, 1000);
    }, 500);
}

// Fonction pour afficher un feedback
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'success' ? '#2ed573' : '#ff4757'};
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: feedbackAnim 2s ease-in-out forwards;
    `;
    
    // Ajouter l'animation CSS
    if (!document.querySelector('#feedback-style')) {
        const style = document.createElement('style');
        style.id = 'feedback-style';
        style.textContent = `
            @keyframes feedbackAnim {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Fonction pour passer à la question suivante
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// Fonction pour démarrer le timer
function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 10) {
            timerDisplay.classList.add('warning');
        }
        
        if (timeLeft === 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

// Fonction appelée quand le temps est écoulé
function timeUp() {
    if (isAnswered) return;
    
    isAnswered = true;
    
    // Enregistrer comme réponse incorrecte
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        userAnswer: -1, // -1 indique pas de réponse
        isCorrect: false,
        timeSpent: 30
    });
    
    // Afficher la bonne réponse
    const question = questions[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.answer-option');
    
    allOptions.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === question.correct) {
            option.classList.add('correct');
        }
    });
    
    showFeedback('Temps écoulé ! ⏰', 'error');
    
    setTimeout(() => {
        nextBtn.style.display = 'block';
    }, 1000);
}

// Fonction pour mettre à jour l'affichage du timer
function updateTimerDisplay() {
    timerDisplay.textContent = `⏱️ ${timeLeft}s`;
    timerDisplay.classList.toggle('warning', timeLeft <= 10);
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Fonction pour mettre à jour le score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Fonction pour terminer le jeu
function endGame() {
    hideAllScreens();
    resultScreen.classList.add('active');
    
    const gameEndTime = Date.now();
    const totalTime = Math.round((gameEndTime - gameStartTime) / 1000);
    
    // Calculer les statistiques
    const percentage = Math.round((score / questions.length) * 100);
    const correctAnswers = score;
    const incorrectAnswers = questions.length - score;
    const averageTime = Math.round(totalTime / questions.length);
    
    // Afficher le score final
    finalScore.textContent = `${score}/${questions.length}`;
    
    // Message de performance
    let performanceClass = '';
    let message = '';
    
    if (percentage >= 80) {
        performanceClass = 'performance-excellent';
        message = '🏆 Excellent ! Vous maîtrisez le sujet !';
    } else if (percentage >= 60) {
        performanceClass = 'performance-good';
        message = '👍 Bien joué ! Vous avez de bonnes connaissances !';
    } else {
        performanceClass = 'performance-average';
        message = '📚 Continuez à apprendre ! Vous pouvez faire mieux !';
    }
    
    performanceMessage.className = `performance-message ${performanceClass}`;
    performanceMessage.textContent = message;
    
    // Détails des résultats
    resultDetails.innerHTML = `
        <h3>📊 Statistiques détaillées</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
            <div style="text-align: center; padding: 15px; background: #f0f3ff; border-radius: 10px;">
                <div style="font-size: 2rem; color: #2ed573; font-weight: bold;">${correctAnswers}</div>
                <div style="color: #666;">Bonnes réponses</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #fff0f0; border-radius: 10px;">
                <div style="font-size: 2rem; color: #ff4757; font-weight: bold;">${incorrectAnswers}</div>
                <div style="color: #666;">Mauvaises réponses</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #f0fff0; border-radius: 10px;">
                <div style="font-size: 2rem; color: #667eea; font-weight: bold;">${percentage}%</div>
                <div style="color: #666;">Pourcentage</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #fff8f0; border-radius: 10px;">
                <div style="font-size: 2rem; color: #f39c12; font-weight: bold;">${totalTime}s</div>
                <div style="color: #666;">Temps total</div>
            </div>
        </div>
    `;
}

// Fonction pour afficher l'écran de révision
function showReview() {
    hideAllScreens();
    reviewScreen.classList.add('active');
    
    reviewContent.innerHTML = '';
    
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        
        const isCorrect = userAnswer.isCorrect;
        const userAnswerText = userAnswer.userAnswer === -1 
            ? 'Pas de réponse (temps écoulé)' 
            : question.answers[userAnswer.userAnswer];
        const correctAnswerText = question.answers[question.correct];
        
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}: ${question.question}</h3>
            <div class="review-answers">
                ${question.answers.map((answer, ansIndex) => {
                    let className = 'review-answer';
                    if (ansIndex === question.correct) className += ' correct-answer';
                    if (ansIndex === userAnswer.userAnswer && !isCorrect) className += ' wrong-answer';
                    if (ansIndex === userAnswer.userAnswer) className += ' user-answer';
                    
                    return `<div class="${className}">
                        <span class="answer-letter">${String.fromCharCode(65 + ansIndex)}</span>
                        ${answer}
                        ${ansIndex === question.correct ? ' ✓' : ''}
                        ${ansIndex === userAnswer.userAnswer ? ' (Votre réponse)' : ''}
                    </div>`;
                }).join('')}
            </div>
            <div class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </div>
            <p style="margin-top: 10px; font-style: italic; color: #666;">
                💡 ${question.explanation}
            </p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #888;">
                ⏱️ Temps de réponse: ${userAnswer.timeSpent}s
            </p>
        `;
        
        reviewContent.appendChild(questionDiv);
    });
}

// Fonction pour afficher les résultats
function showResults() {
    hideAllScreens();
    resultScreen.classList.add('active');
}

// Fonction pour redémarrer le jeu
function restartGame() {
    hideAllScreens();
    startScreen.classList.add('active');
    
    // Réinitialiser le timer display
    timerDisplay.classList.remove('warning');
    clearInterval(timer);
}

// Fonction pour cacher tous les écrans
function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

// Fonction utilitaire pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Gestion des raccourcis clavier
document.addEventListener('keydown', (e) => {
    if (gameScreen.classList.contains('active') && !isAnswered) {
        const key = e.key.toLowerCase();
        if (['a', 'b', 'c', 'd'].includes(key)) {
            const index = key.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
            const options = document.querySelectorAll('.answer-option');
            if (options[index]) {
                selectAnswer(index, options[index]);
            }
        }
    }
    
    if (e.key === 'Enter') {
        if (startScreen.classList.contains('active')) {
            startGame();
        } else if (nextBtn.style.display !== 'none' && gameScreen.classList.contains('active')) {
            nextQuestion();
        }
    }
});

// Initialisation
console.log('🎯 Mini-Jeu de Quiz chargé avec succès !');
console.log('📝 Utilisez les touches A, B, C, D pour répondre rapidement !');
console.log('⚡ Appuyez sur Entrée pour commencer ou passer à la question suivante !');
