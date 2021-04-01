const button = document.getElementById("landing-page-button")
const landingPage = document.getElementById("landing-page")
const gameTimer = document.getElementById("game-timer");
const questionsBox = document.getElementById("questions-box");
const answerForm = document.getElementById("answer-form");
const startButton = document.getElementById("start-button");
let answerInput = document.getElementById("answer-input");
let scoreEl = document.getElementById('score');

const enterSite = () => {
  console.info("Entering Site!");
  landingPage.style.display = "hidden";
};
  
let questionCounter = 0;
let time = 600; //600 seconds = 10 minutes
let score = 0;

gameTimer.innerHTML = (time / 60).toFixed(2); //set default starting time to 10 minutes.

const setScore = () => {
  scoreEl.innerHTML = score; //set default score to 0.
};

setScore();

const questions = [
  {
    question: 'What is a method?',
    answer: 'A function that is nested inside of an object'
  },
  {
    question: 'What is a function?',
    answer: 'a'
  },
  {
    question: 'What does HTML stand for?',
    answer: 'b'
  }
];

console.log(answerInput)

const setQuestion = () => {
  if (questions) {
    questionsBox.innerHTML = `
      <div>
        <p>Question: ${questions[questionCounter].question}</p>
      </div>
    `;
  }
};

setQuestion();

const endGame = () => {
  if (score > (questions.length * 0.8)) {
    alert("Congratulation's, you have won! confetti confetti.");
    console.info({message: "You won!"});
  } else {
    alert("Sorry, practice a little more and try again.");
    console.info({message: "You lost!"});
  }

};

const countDown = () => { 
  time--; 
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let formattedTime = minutes + ':' + seconds;
  gameTimer.innerHTML = formattedTime;
};

const startTimer = () => {
  if (time > 0) { setInterval(countDown, 1000); }
  else { endGame(); }
};

const resetTimer = () => {
  time = 600;
};

const checkAnswer = (event) => {
  event.preventDefault();
  if (answerInput.value.trim() === questions[questionCounter].answer) {
    score ++;
    answerInput.value = '';
    questionCounter++;
    setScore();
    setQuestion();
    console.info(questionCounter, questions.length)
    if (questionCounter === questions.length) { endGame(); }
  } else {
    answerInput.value = '';
    questionCounter++;
    setScore();
    setQuestion();
    console.info(questionCounter, questions.length)
    if (questionCounter === questions.length) { endGame(); }
  }
};


//Event Listeners
button.addEventListener("click", {

});

startButton.addEventListener("click", () => { 
  console.info("Timer is started!"); 
  startTimer();
  document.getElementById("main-section").style.display = "block";
});

answerForm.addEventListener("submit", event => {
  event.preventDefault();
  console.info("I have been clicked.", event);
  checkAnswer(event);
});