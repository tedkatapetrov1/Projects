const explanationElement = document.getElementById('explanation');
const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score');
const totalText = document.getElementById('total');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hide');
    questionContainer.classList.remove('hide');
    nextBtn.classList.add('hide');
    resultContainer.classList.add('hide');
    startQuiz();
});

restartBtn.addEventListener('click', () => {
    resultContainer.classList.add('hide');
    startBtn.classList.remove('hide');
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerText = answer.text;
        btn.classList.add('btn');
        if (answer.correct) {
            btn.dataset.correct = "true";
        }
        btn.addEventListener('click', selectAnswer);
        answerButtons.appendChild(btn);
    });
}

function resetState() {
    nextBtn.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    explanationElement.classList.add('hide');
    explanationElement.innerText = '';
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
    if (correct) score++;

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    nextBtn.classList.remove('hide');
    const currentQuestion = questions[currentQuestionIndex];
    explanationElement.innerText = currentQuestion.explanation;
    explanationElement.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainer.classList.add('hide');
    nextBtn.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreText.innerText = score;
    totalText.innerText = questions.length;

    const percentage = (score / questions.length) * 100;
    const feedback = document.getElementById('feedback');

    if (percentage >= 90) {
        feedback.innerText = "🏆 Quiz Champion! You totally crushed it!";
    } else if (percentage >= 75) {
        feedback.innerText = "🎉 Great job! You're on fire!";
    } else if (percentage >= 50) {
        feedback.innerText = "👍 Not bad! Keep practicing!";
    } else if (percentage >= 30) {
        feedback.innerText = "😅 Oof! That was rough, but don’t give up!";
    } else {
        feedback.innerText = "🙈 Maybe trivia isn't your thing… yet!";
    }
}
