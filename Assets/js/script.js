const button = document.getElementById("landing-page-button")
const landingPage = document.getElementById("landing-page")
const gameStatsArticle = document.getElementById("game-stats");
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

//? 1. Initialize local storage
//get gameStats from local storage
const getGameStatsData = () => {
  const gameStats = JSON.parse(localStorage.getItem('gameStats'));
  //if gameStats is null return an empty array otherwise return the contents of 'gameStats'
  return gameStats === null ? [] : gameStats;
};
//initialize the gameStats data
let gameStatsData = getGameStatsData();

console.info(gameStatsData);

const setGameStats = () => {
  gameStatsData.length == 0 ?
  gameStatsArticle.innerHTML = `
    <p>No games have been played yet. Stats will be added after the first game.</p>
  ` :
  gameStatsArticle.innerHTML = `
  <h3>Game Statistics</h3>
  <h5>Games Played: ${gameStatsData.length}</h5>
  <table>
    <tr>
      <th>Game #</th>
      <th>Result</th>
      <th>Score</th>
      <th>Accuracy</th>
      <th>Time Played</th>
    </tr>
    ${gameStatsData.map(stats => `
      <tr>
        <th>${stats.gameNo}</th>
        <th>${stats.result}</th>
        <th>${stats.score}</th>
        <th>${stats.percentCorrect}</th>
        <th>${stats.minutesPlayed + `:` + stats.seconds}</th>
      </tr>`
      )}
  </table>
  `;
};


setGameStats();
console.info(gameStatsData);
  
let questionCounter = 0;
let time = 30; //600 seconds = 10 minutes
let score = 0;
let timer; //a timer placeholder that will hold the 1 second interval and countDown functions.

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
  const percentCorrect = score / questionCounter;

  let stats = {
    message: "",
    numberOfQuestions: questionCounter,
    score: score,
    percentCorrect: percentCorrect,
    minutesPlayed: Math.floor(time / 60),
    seconds: time % 60
  };

  if (percentCorrect > 0.8) {
    alert("Congratulation's, you have won! confetti confetti.");
    stats.message = "You won!";
    gameStatsData.push(stats);
    console.info(gameStatsData);
    try {
      localStorage.setItem('gameStats', JSON.stringify(gameStatsData));
      setGameStats();
    } catch (exception) {
      console.error(exception);
    }

    console.info(JSON.parse(localStorage.getItem('gameStats')));
  } 
  else {
    alert("Sorry, practice a little more and try again.");
    stats.message = "You lost!";
    gameStatsData.push(stats);
    console.info(gameStatsData);
    try {
      localStorage.setItem('gameStats', JSON.stringify(gameStatsData));
      setGameStats();
    } catch (exception) {
      console.error(exception);
    }
  }

  resetTimer();
  setScore();
  score = 0;
  return score;
  
};

const countDown = () => { 
  if ( time <= 0) { endGame(); }
  time--; 
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let formattedTime = minutes + ':' + seconds;
  gameTimer.innerHTML = formattedTime;
};

const startTimer = () => {
  if (time > 0) { timer = setInterval(countDown, 1000); }
  else { endGame(); }
};

const resetTimer = () => {
  clearInterval(timer);
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
    console.info(questionCounter, questions.length);
    if (questionCounter === questions.length) { endGame(); }
  } else {
    answerInput.value = '';
    questionCounter++;
    setScore();
    setQuestion();
    console.info(questionCounter, questions.length);
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