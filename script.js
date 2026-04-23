// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedAnswers = 0;
let userAnswers = [];
let shuffledQuestions = [];
let selectedOption = null;
let timerInterval = null;
let timeLeft = 900; // 15 minutes in seconds
let quizStarted = false;
let quizEnded = false;

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    explanations: document.getElementById('explanations-screen')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showScreen('start');
});

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Show Screen
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// Start Quiz
function startQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    skippedAnswers = 0;
    userAnswers = [];
    selectedOption = null;
    timeLeft = 900;
    quizStarted = true;
    quizEnded = false;
    
    // Shuffle questions and options
    shuffledQuestions = shuffleArray(questionBank).map(q => ({
        ...q,
        options: shuffleArray(q.options.map((opt, i) => ({ text: opt, originalIndex: i })))
    }));
    
    // Update UI
    document.getElementById('live-score').textContent = '0';
    document.getElementById('timer').textContent = '15:00';
    document.getElementById('timer-bar').style.width = '100%';
    document.getElementById('timer').classList.remove('warning', 'danger');
    
    showScreen('quiz');
    loadQuestion();
    startTimer();
}

// Start Timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 300) {
            document.getElementById('timer').classList.add('warning');
            document.getElementById('timer').classList.remove('danger');
        }
        if (timeLeft <= 60) {
            document.getElementById('timer').classList.add('danger');
            document.getElementById('timer').classList.remove('warning');
        }
        
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// Update Timer Display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const percentage = (timeLeft / 900) * 100;
    document.getElementById('timer-bar').style.width = percentage + '%';
}

// Load Question
function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length || quizEnded) {
        endQuiz();
        return;
    }
    
    const question = shuffledQuestions[currentQuestionIndex];
    selectedOption = null;
    
    // Update question number
    document.getElementById('current-q').textContent = currentQuestionIndex + 1;
    document.getElementById('q-number').textContent = `Q${currentQuestionIndex + 1}`;
    document.getElementById('question-text').textContent = question.question;
    
    // Update live score
    document.getElementById('live-score').textContent = score;
    
    // Generate options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.onclick = () => selectOption(index, button);
        
        const letterSpan = document.createElement('span');
        letterSpan.className = 'option-letter';
        letterSpan.textContent = ['A', 'B', 'C', 'D'][index];
        
        const textSpan = document.createElement('span');
        textSpan.textContent = option.text;
        
        button.appendChild(letterSpan);
        button.appendChild(textSpan);
        optionsContainer.appendChild(button);
    });
    
    // Reset submit button
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submit Answer ✓';
    
    // Add animation
    document.getElementById('question-card').style.animation = 'none';
    setTimeout(() => {
        document.getElementById('question-card').style.animation = 'slideIn 0.3s ease-out';
    }, 10);
}

// Select Option
function selectOption(index, button) {
    if (quizEnded) return;
    
    // Remove previous selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to current
    button.classList.add('selected');
    selectedOption = index;
    
    // Enable submit button
    document.getElementById('submit-btn').disabled = false;
}

// Submit Answer
function submitAnswer() {
    if (selectedOption === null || quizEnded) return;
    
    const question = shuffledQuestions[currentQuestionIndex];
    const selectedOptionData = question.options[selectedOption];
    const isCorrect = selectedOptionData.originalIndex === question.correct;
    
    // Record answer
    userAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        selected: selectedOption,
        selectedText: selectedOptionData.text,
        isCorrect: isCorrect,
        correctAnswer: question.options.find(opt => opt.originalIndex === question.correct).text,
        explanation: question.explanation
    };
    
    // Update score
    if (isCorrect) {
        score += 4; // 4 marks for correct
        correctAnswers++;
        // Brief celebration effect
        buttonEffect(true);
    } else {
        score = Math.max(0, score - 1); // -1 for wrong (minimum 0)
        wrongAnswers++;
        buttonEffect(false);
    }
    
    // Move to next question
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= shuffledQuestions.length) {
            endQuiz();
        } else {
            loadQuestion();
        }
    }, 500);
}

// Button Effect
function buttonEffect(isCorrect) {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.style.transform = 'scale(0.95)';
    submitBtn.style.background = isCorrect ? '#48bb78' : '#f56565';
    
    setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
        submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 300);
}

// Skip Question
function skipQuestion() {
    if (quizEnded) return;
    
    // Record skipped
    userAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        selected: null,
        selectedText: 'Skipped',
        isCorrect: false,
        correctAnswer: shuffledQuestions[currentQuestionIndex].options.find(opt => opt.originalIndex === shuffledQuestions[currentQuestionIndex].correct).text,
        explanation: shuffledQuestions[currentQuestionIndex].explanation
    };
    
    skippedAnswers++;
    
    // Move to next question
    currentQuestionIndex++;
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

// End Quiz
function endQuiz() {
    quizEnded = true;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Fill remaining answers as skipped
    for (let i = currentQuestionIndex; i < shuffledQuestions.length; i++) {
        if (!userAnswers[i]) {
            userAnswers[i] = {
                questionIndex: i,
                selected: null,
                selectedText: 'Time Up - Skipped',
                isCorrect: false,
                correctAnswer: shuffledQuestions[i].options.find(opt => opt.originalIndex === shuffledQuestions[i].correct).text,
                explanation: shuffledQuestions[i].explanation
            };
            skippedAnswers++;
        }
    }
    
    // Calculate time taken
    const timeTaken = 900 - timeLeft;
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    
    // Update result screen
    const totalQuestions = shuffledQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('wrong-count').textContent = wrongAnswers;
    document.getElementById('skipped-count').textContent = skippedAnswers;
    document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update circle chart
    const circleFill = document.getElementById('circle-fill');
    circleFill.style.strokeDasharray = `${percentage}, 100`;
    
    // Performance message
    let message = '';
    let emoji = '';
    if (percentage >= 90) {
        message = 'ଅତ୍ୟନ୍ତ ଉତ୍ତମ! ଆପଣ ବହୁତ ଭଲ ପ୍ରସ୍ତୁତ! 🌟';
        emoji = '👑';
    } else if (percentage >= 75) {
        message = 'ବହୁତ ଭଲ! ଆହୁରି ଟିକେ ଅଭ୍ୟାସ କରନ୍ତୁ! 👍';
        emoji = '🏆';
    } else if (percentage >= 60) {
        message = 'ଭଲ ପ୍ରଦର୍ଶନ! ନିୟମିତ ଅଭ୍ୟାସ ଜାରି ରଖନ୍ତୁ! 📚';
        emoji = '📖';
    } else if (percentage >= 40) {
        message = 'ଆହୁରି ଅଭ୍ୟାସ ଆବଶ୍ୟକ। ହାର ମାନନ୍ତୁ ନାହିଁ! 💪';
        emoji = '📝';
    } else {
        message = 'ମୌଳିକ ଧାରଣା ଉପରେ ଧ୍ୟାନ ଦିଅନ୍ତୁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ! 🔄';
        emoji = '🎯';
    }
    
    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('performance-msg').textContent = message;
    
    showScreen('result');
}

// Show Explanations
function showExplanations() {
    const explanationsList = document.getElementById('explanations-list');
    explanationsList.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const item = document.createElement('div');
        let statusClass = 'skipped';
        if (answer.isCorrect) statusClass = 'correct';
        else if (answer.selected !== null) statusClass = 'wrong';
        
        item.className = `explanation-item ${statusClass}`;
        
        item.innerHTML = `
            <div class="explanation-q">
                Q${index + 1}: ${shuffledQuestions[index].question}
            </div>
            <div class="explanation-answer ${answer.isCorrect ? 'correct-text' : 'wrong-text'}">
                <strong>ଆପଣଙ୍କ ଉତ୍ତର:</strong> ${answer.selectedText}
                ${answer.isCorrect ? ' ✅' : answer.selected !== null ? ' ❌' : ' ⏭️'}
            </div>
            ${!answer.isCorrect ? `
                <div class="explanation-answer correct-text">
                    <strong>ସଠିକ୍ ଉତ୍ତର:</strong> ${answer.correctAnswer} ✅
                </div>
            ` : ''}
            <div class="explanation-detail">
                💡 ${answer.explanation}
            </div>
        `;
        
        explanationsList.appendChild(item);
    });
    
    showScreen('explanations');
}

// Back to Results
function backToResults() {
    showScreen('result');
}

// Restart Quiz
function restartQuiz() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    showScreen('start');
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!screens.quiz.classList.contains('active') || quizEnded) return;
    
    switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            const buttons = document.querySelectorAll('.option-btn');
            if (buttons[index]) {
                selectOption(index, buttons[index]);
            }
            break;
        case 'Enter':
            e.preventDefault();
            if (selectedOption !== null) {
                submitAnswer();
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            skipQuestion();
            break;
    }
});
