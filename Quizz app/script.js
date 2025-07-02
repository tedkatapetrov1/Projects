  const questionContainer = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtons = document.getElementById('answer-buttons');
  const nextBtn = document.getElementById('next-btn');
  const resultContainer = document.getElementById('result-container');
  const scoreText = document.getElementById('score');
  const totalText = document.getElementById('total');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    nextBtn.innerText = "Следващ въпрос";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.innerText = answer.text;
      btn.classList.add('btn');
      if (answer.correct) {
        btn.dataset.correct = answer.correct;
      }
      btn.addEventListener('click', selectAnswer);
      answerButtons.appendChild(btn);
    });
  }
  
  function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
  
    if (correct) score++;
  
    Array.from(answerButtons.children).forEach(button => {
      setStatusClass(button, button.dataset.correct === "true");
      button.disabled = true;
    });
  
    nextBtn.style.display = 'block';
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
  
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    questionContainer.classList.add('hide');
    nextBtn.style.display = 'none';
    resultContainer.classList.remove('hide');
    scoreText.innerText = score;
    totalText.innerText = questions.length;
  }
  
  startQuiz();
  