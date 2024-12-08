// Splash screen timeout to hide it after 2 seconds
window.onload = function () {
    // Ensure splash screen is visible initially
    document.getElementById("splash-screen").classList.remove("hidden");
  
    // Timeout for splash screen to hide after 2 seconds
    setTimeout(function() {
      document.getElementById("splash-screen").classList.add("hidden");
      document.getElementById("home-page").classList.remove("hidden");
    }, 2000); // 2000ms = 2 seconds
  };
  
  let userName = "";
  let selectedOperation = "";
  let selectedLevel = "";
  let numOfQuestions = 0;
  let questionData = [];
  
  function startApp() {
    userName = document.getElementById("user-name").value.trim();
  
    if (userName === "") {
      alert("Please enter your name.");
      return;
    }
  
    // Hide the home page and show the main app
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("username-display").textContent = userName;
  }
  
  function showLevels() {
    selectedOperation = document.getElementById("operation").value;
    document.getElementById("level-selection").classList.remove("hidden");
  }
  
  function startQuiz() {
    selectedLevel = document.getElementById("level").value;
    numOfQuestions = parseInt(document.getElementById("questions").value);
  
    // Hide question selection and show start quiz button
    document.getElementById("question-selection").classList.add("hidden");
    document.getElementById("start-quiz-btn").classList.add("hidden");
  
    generateQuestions();
  }
  
  function generateQuestions() {
    questionData = [];
    for (let i = 1; i <= numOfQuestions; i++) {
      let num1 = getRandomNumber(selectedLevel);
      let num2 = getRandomNumber(selectedLevel);
      let questionText = `${num1} ${getOperationSymbol(selectedOperation)} ${num2}`;
      let answer = calculateAnswer(num1, num2, selectedOperation);
  
      questionData.push({
        question: questionText,
        answer: answer,
        userAnswer: null
      });
    }
  
    displayQuestions();
  }
  
  function displayQuestions() {
    const quizContainer = document.createElement("div");
    quizContainer.id = "quiz-container";
    document.getElementById("app").appendChild(quizContainer);
  
    questionData.forEach((q, index) => {
      const questionElement = document.createElement("div");
      questionElement.innerHTML = `
        <p>${q.question}</p>
        <input type="number" id="answer-${index}" placeholder="Your answer" onchange="saveAnswer(${index})" />
      `;
      quizContainer.appendChild(questionElement);
    });
  
    const finishButton = document.createElement("button");
    finishButton.textContent = "Finish Quiz";
    finishButton.onclick = finishQuiz;
    quizContainer.appendChild(finishButton);
  }
  
  function saveAnswer(index) {
    const userAnswer = document.getElementById(`answer-${index}`).value;
    questionData[index].userAnswer = userAnswer;
  }
  
  function finishQuiz() {
    let score = 0;
  
    questionData.forEach(q => {
      if (q.userAnswer == q.answer) {
        score++;
      }
    });
  
    alert(`Your score is: ${score} out of ${numOfQuestions}`);
  
    // Show Profile page with results
    document.getElementById("profile-name").textContent = userName;
    document.getElementById("profile-score").textContent = score;
    document.getElementById("profile-page").classList.remove("hidden");
    document.getElementById("app").classList.add("hidden");
  }
  
  function logout() {
    userName = "";
    document.getElementById("profile-page").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
  }
  
  function getRandomNumber(level) {
    switch (level) {
      case "Beginner":
        return Math.floor(Math.random() * 10) + 1;
      case "Intermediate":
        return Math.floor(Math.random() * 100) + 1;
      case "Master":
        return Math.floor(Math.random() * 1000) + 1;
      default:
        return Math.floor(Math.random() * 10) + 1;
    }
  }
  
  function getOperationSymbol(operation) {
    switch (operation) {
      case "Addition":
        return "+";
      case "Subtraction":
        return "-";
      case "Multiplication":
        return "×";
      case "Division":
        return "÷";
      default:
        return "+";
    }
  }
  
  function calculateAnswer(num1, num2, operation) {
    switch (operation) {
      case "Addition":
        return num1 + num2;
      case "Subtraction":
        return num1 - num2;
      case "Multiplication":
        return num1 * num2;
      case "Division":
        return num1 / num2;
      default:
        return 0;
    }
  }
  