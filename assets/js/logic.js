let questions = {
  1: {
    q: "Javascript is a ______ language",
    answerArr: [
      "Object-Oriented",
      "Object-Based",
      "Procedural",
      "None of the Above",
    ],
    correctIndex: 0,
  },
  2: {
    q: "Which of the following keywords is used to define a variable in Javascript?",
    answerArr: ["var", "let", "Both var and let", "None of the Above"],
    correctIndex: 2,
  },
  3: {
    q: "Which of the following methods is used to access HTML elements using Javascript?",
    answerArr: [
      "getElementById()",
      "getElementsByClassName()",
      "Both getElementById() and getElementsByClassName()",
      "None of the Above",
    ],
    correctIndex: 2,
  },
  4: {
    q: "Upon encountering empty statements, what does the Javascript Interpreter do?",
    answerArr: [
      "Throws an error",
      "Ignores the statements",
      "Gives a warning",
      "None of the Above",
    ],
    correctIndex: 1,
  },
  5: {
    q: "Which of the following methods can be used to display data in some form using Javascript?",
    answerArr: [
      "document.write",
      "console.log()",
      "window.alert()",
      "All of the Above",
    ],
    correctIndex: 3,
  },
};
var timeLeft = 10;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


function endQuiz() {
  clearInterval(window.timeInterval);
  //TODO: display score
  //TODO: give ability to save initials and score
}

function countDown() {
  timeLeft--;
  document.getElementById("time").textContent = timeLeft;
  if (timeLeft == 0) {
    endQuiz();
  }
}

function startQuiz() {
  window.timeInterval = setInterval(countDown, 1000);
  document.getElementById("start-screen").style.display = "none";
}

startBttn = document.getElementById("start");
startBttn.onclick = startQuiz;
