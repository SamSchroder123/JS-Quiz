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
};

var moreQuestions = true;

//initialise the timer in seconds
var timeLeft = 60;
//initialise score to zero
var score = 0;

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

function newQuestion() {
  // console.log(questionsObject);
  console.log("questions object: " + questions);
  var keysArr = Object.keys(questions);
  var numQuestions = keysArr.length;
  console.log("number of questions left: " + numQuestions);
  //keep selecting a new question while the selected question is not in the questions object
  do {
    //randomly select question
    var qSelector = getRandomInt(1, numQuestions);
  } while (qSelector in questions == false);
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
  var feedback = document.getElementById("feedback");
  //show feedback elements
  feedback.style.display = "block";
  //create element for score and present score
  var scoreElement = document.createElement("h2");
  scoreElement.textContent = "Score: " + score;
  feedback.appendChild(scoreElement);
  //TODO: give ability to save initials
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

//start quiz when start button is clicked
startBttn = document.getElementById("start");
startBttn.onclick = startQuiz;
