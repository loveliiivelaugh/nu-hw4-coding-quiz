const button = document.getElementById("landing-page-button")
const landingPage = document.getElementById("landing-page")
const gameTimer = document.getElementById("game-timer");
const questionsBox = document.getElementById("questions-box");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const startButton = document.getElementById("start-button");

console.info(startButton)

const questions = [
  {
    question: 'What is a method?',
    answer: 'A function that is nested inside of an object'
  },
  {
    question: 'What is a function?',
    answer: ''
  },
  {
    question: 'What does HTML stand for?',
    answer: ''
  }
];

console.info(questions[1])
questionsBox.innerHTML = `
<div>
  <p>Question: ${questions[0].question}</p>
</div>
`;

const questionCounter = 0;
let time = 600;

const countDown = () => { 
  time--; 
  let hours = Math.floor(time / 60 / 60);
  let minutes = Math.floor(time / 60) - (hours * 60);
  let seconds = time % 60;
  let formattedTime = minutes + ':' + seconds;
  gameTimer.innerHTML = formattedTime;
};

setInterval(countDown, 1000);
gameTimer.innerHTML = time;

const score = 0;

questionsBox.innerHTML = questions[questionCounter]


const enterSite = () => {
  console.info("Entering Site!");
  landingPage.style.display = "hidden";
};

const showQuestions = () => {

};

const checkAnswer = (event) => {
  event.preventDefault();
  const answer = event.target.value;
  console.info("Please hold, I am checking your answer...", answer);
};

button.addEventListener("click", {

});

startButton.addEventListener("click", console.info("I have been clicked!"));

answerForm.addEventListener("submit", event => {
  event.preventDefault();
  console.info("I have been clicked.", event);
});