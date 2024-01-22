//store questions uniformly in an object
var questions = {
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
  6: {
    q: "What is the purpose of the 'typeof' operator in Javascript?",
    answerArr: [
      "To check the type of a variable",
      "To create a new variable",
      "To loop through an array",
      "None of the Above",
    ],
    correctIndex: 0,
  },
  7: {
    q: "What does AJAX stand for?",
    answerArr: [
      "All Javascript and XML",
      "Asynchronous JavaScript and XML",
      "Advanced JavaScript and XML",
      "None of the Above",
    ],
    correctIndex: 1,
  },
  8: {
    q: "Which method is used to add a new element to the end of an array?",
    answerArr: ["push()", "append()", "addToEnd()", "None of the Above"],
    correctIndex: 0,
  },
  9: {
    q: "What is a closure in Javascript?",
    answerArr: [
      "A function with no parameters",
      "A way to lock a variable",
      "A combination of a function and the lexical environment",
      "None of the Above",
    ],
    correctIndex: 2,
  },
  10: {
    q: "Which event is triggered when a user clicks on an HTML element?",
    answerArr: ["mouseover", "click", "keydown", "None of the Above"],
    correctIndex: 1,
  },
};

//function to generate random integer within range
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function correctAnswer() {
  //add 1 to the score and play appropriate audio
  score++;
  var correctAudio = document.getElementById("correct");
  correctAudio.play();
  //wait for audio to finish playing to avoid asynchronous issues
  setTimeout(function () {
    //check if there are any more unanswered questions
    console.log(Object.keys(questions));
    //if there are no more questions end the quiz
    if (Object.keys(questions).length == 0) {
      endQuiz();
      return;
      //otherwise generate a new question
    } else {
      newQuestion();
    }
  }, 1000);
}

function incorrectAnswer() {
  //subtract 5 seconds from the clock and play appropriate audio
  timeLeft = timeLeft - 5;
  var incorrectAudio = document.getElementById("incorrect");
  incorrectAudio.play();
}

//choose a random unrepeated question from the questions object and then provide the user with multiple choice answers
function newQuestion() {
  // console.log(questionsObject);
  console.log("questions object: " + questions);
  var keysArr = Object.keys(questions);
  var numQuestions = keysArr.length;
  console.log("number of questions left: " + numQuestions);
  //keep selecting a new question while the selected question is not in the questions object
  do {
    //randomly select question
    var qSelector = getRandomInt(1, numQuestionsGlobal + 1);
    console.log("This is inside the do while loop " + qSelector);
  } while (qSelector in questions == false);
  console.log("qSelector" + qSelector);
  console.log("Object.keys(questions)" + Object.keys(questions));
  var question;
  //store question in question variable
  question = questions[qSelector];
  console.log("question = " + question);
  //update question title
  var questionTitle = document.getElementById("question-title");
  console.log("question.q = " + question.q);
  questionTitle.textContent = question.q;
  var choices = document.getElementById("choices");
  //clear buttons before creating new
  choices.innerHTML = "";
  //create a button for every possible answer
  for (i = 0; i < question.answerArr.length; i++) {
    choices.appendChild(document.createElement("button"));
    choices.children[i].textContent = question.answerArr[i];
    //all buttons are incorrect
    choices.children[i].onclick = incorrectAnswer;
  }
  //only the button with the correct answer is correct (overwrite)
  choices.children[question.correctIndex].onclick = correctAnswer;
  //remove selected question from questions object so as not to repeat
  delete questions[qSelector];
}

function endQuiz() {
  console.log("end");
  //stop timer
  clearInterval(window.timeInterval);
  //hide question elements
  document.getElementById("questions").style.display = "none";
  var endScreen = document.getElementById("end-screen");
  //show end screen elements
  endScreen.style.display = "block";
  //create element for score and present score
  var scoreElement = document.getElementById("final-score");
  scoreElement.textContent = score;
  //TODO: give ability to save initials
  document.getElementById("submit").onclick = saveInitials;
}

function saveInitials() {
  console.log("save here");
  var initials = document.getElementById("initials").value;
  initials = initials.toUpperCase();
  // console.log(initials);
  // scores[initials] = score;
  // console.log(Object.keys(scores));
  // localStorage.setItem("scoreList", scores);
  // console.log("this is from storage " + localStorage.getItem("scoreList"));
  var userEntry = {
    initials: initials,
    score: score,
  };
  scores.push(userEntry);
  localStorage.setItem("userEntries", JSON.stringify(scores));
}

function countDown() {
  //subtract 1 from the timer and update time element
  timeLeft--;
  document.getElementById("time").textContent = timeLeft;
  //end the quiz when there is no more time left
  if (timeLeft <= 0) {
    endQuiz();
  }
}

function startQuiz() {
  //run the countDown function every second
  window.timeInterval = setInterval(countDown, 1000);
  //hide start screen elements
  document.getElementById("start-screen").style.display = "none";
  //show question elements
  document.getElementById("questions").style.display = "block";
  //generate a new question
  newQuestion();
}

var scores = [];
scores = localStorage.getItem("userEntries");
console.log(scores);
if (scores !== null && scores !== undefined) {
  try {
    scores = JSON.parse(scores);
  } catch (error) {
    console.error("Error parsing userEntries from localStorage:", error);
    // Handle the error, possibly by setting scores to an empty array
    scores = [];
  }
}

var numQuestionsGlobal = Object.keys(questions).length;

var moreQuestions = true;

//initialise the timer in seconds
var timeLeft = 1;
//initialise score to zero
var score = 0;

//start quiz when start button is clicked
startBttn = document.getElementById("start");
startBttn.onclick = startQuiz;
