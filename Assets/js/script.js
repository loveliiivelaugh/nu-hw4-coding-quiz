//Questions Data -- would like to move this to seperate file and import.
const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answerA: {
      correct: false,
      content: `scripting`
    },
    answerB: {
      correct: true,
      content: 'js'
    },
    answerC: {
      correct: false,
      content: 'javascript'
    },
    answerD: {
      correct: false,
      content: 'script'
    },
  },
  {
    question: 'Why so JavaScript and Java have similar name?',
    answerA: {
      correct: false,
      content: 'JavaScript is a stripped-down version of Java'
    },
    answerB: {
      correct: true,
      content: 'JavaScript’s syntax is loosely based on Java’s'
    },
    answerC: {
      correct: false,
      content: 'They both originated on the island of Java'
    },
    answerD: {
      correct: false,
      content: 'None of the above'
    },
  },
  {
    question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
    answerA: {
      correct: true,
      content: 'The User’s machine running a Web browser'
    },
    answerB: {
      correct: false,
      content: 'The Web server'
    },
    answerC: {
      correct: false,
      content: 'A central machine deep within Netscape’s corporate offices'
    },
    answerD: {
      correct: false,
      content: 'None of the above'
    },
  },
  {
    question: '______ JavaScript is also called client-side JavaScript.',
    answerA: {
      correct: false,
      content: 'Microsoft'
    },
    answerB: {
      correct: true,
      content: 'Navigator'
    },
    answerC: {
      correct: false,
      content: 'LiveWire'
    },
    answerD: {
      correct: false,
      content: 'Native'
    },
  },
  {
    question: '__________ JavaScript is also called server-side JavaScript.',
    answerA: {
      correct: false,
      content: 'Microsoft'
    },
    answerB: {
      correct: false,
      content: 'Navigator'
    },
    answerC: {
      correct: true,
      content: 'LiveWire'
    },
    answerD: {
      correct: false,
      content: 'Native'
    },
  },
  {
    question: 'What are variables used for in JavaScript Programs?',
    answerA: {
      correct: true,
      content: 'Storing numbers, dates, or other values'
    },
    answerB: {
      correct: false,
      content: 'Varying randomly'
    },
    answerC: {
      correct: false,
      content: 'Causing high-school algebra flashbacks'
    },
    answerD: {
      correct: false,
      content: 'None of the above'
    },
  },
  {
    question: '_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.',
    answerA: {
      correct: true,
      content: 'Client-side'
    },
    answerB: {
      correct: false,
      content: 'Server-side'
    },
    answerC: {
      correct: false,
      content: 'Local'
    },
    answerD: {
      correct: false,
      content: 'Native'
    },
  },
  {
    question: 'Which of the following can’t be done with client-side JavaScript?',
    answerA: {
      correct: false,
      content: 'Validating a form'
    },
    answerB: {
      correct: false,
      content: 'Sending a form’s contents by email'
    },
    answerC: {
      correct: true,
      content: 'Storing the form’s contents to a database file on the server'
    },
    answerD: {
      correct: false,
      content: 'None of the above'
    },
  },

];
//assign Glogbal variables.
const gameStatsArticle = document.getElementById("game-stats");
const gameTimer = document.getElementById("game-timer");
const landingPage = document.getElementById("landing-page")
const highscoresPage = document.getElementById('highscores-page')
const highscoresPageButton = document.getElementById('highscores-page-btn')
const questionsBox = document.getElementById("questions-box");
const landingButton = document.getElementById("landing-page-button")
const startButton = document.getElementById("start-button");
const answerButton = document.querySelector("#answer-button");
const clearButton = document.getElementById("clear-history");
const scoreInput = document.getElementById("score-input");
const alertEl = document.getElementById("answer-alert");
  
let questionCounter = 0; //set a question counter to 0
let time = 30; //30 seconds on the clock to start
let timer; //a timer placeholder that will hold the 1 second interval and countDown functions.

//initialize local storage
//get gameStats from local storage
const getGameStatsData = () => {
  const gameStats = JSON.parse(localStorage.getItem('gameStats'));
  //if gameStats is null return an empty array otherwise return the contents of 'gameStats'
  return gameStats === null ? [] : gameStats;
};

//initialize the gameStats data
let gameStatsData = getGameStatsData();

//function that handles dynamically setting the question in the DOM based on the questions in the questions array passing in the questionCounter to update the questions by index using bracket notation.
const setQuestion = () => {
  //if we even have questions in our questions array. if there is even data.
  if (questions) {
    return (
      //update the innerHTML to the selected question and answers object.
      questionsBox.innerHTML = `
      <h3>${questions[questionCounter].question}</h3>
      <ul>
        <li>
          <button 
            id="answer-button" 
            class="btn answer-btn" 
            data-correct="${questions[questionCounter].answerA.correct}" 
            onclick="handleAnswer(event)"
          >
            1. ${questions[questionCounter].answerA.content}
          </button>
        </li>
        <li>
          <button 
            id="answer-button" 
            class="btn answer-btn" 
            data-correct="${questions[questionCounter].answerB.correct}" 
            onclick="handleAnswer(event)"
          >
            2. ${questions[questionCounter].answerB.content}
          </button>
        </li>
        <li>
          <button 
            id="answer-button" 
            class="btn answer-btn" 
            data-correct="${questions[questionCounter].answerC.correct}" 
            onclick="handleAnswer(event)"
          >
            3. ${questions[questionCounter].answerC.content}
          </button>
        </li>
        <li>
          <button 
            id="answer-button" 
            class="btn answer-btn" 
            data-correct="${questions[questionCounter].answerD.correct}" 
            onclick="handleAnswer(event)"
          >
            4. ${questions[questionCounter].answerD.content}
          </button>
        </li>
      </ul>
      `
      );
  }
};

//set the game stats data in the DOM
const setGameStats = () => {
  gameStatsData.length == 0 ? //if there is no gameStatsData yet then return the following
  gameStatsArticle.innerHTML = `
    <p>No games have been played yet. Stats will be added after the first game.</p>
  ` : //if there is gameStatsData then show the game stats board
  gameStatsArticle.innerHTML = `
  <table>
    ${//loop through every game thats been played and make a row in the table from it
      gameStatsData.map(stats => ` 
      <tr>
        <td>${stats.initials} - ${stats.score}</td>
      </tr>`
      ).join("")}
  </table>
  `;
};

//we want to run this on initialization so the data is present before the user.
setGameStats();
//set a question on initialization so that there is already a question and answer set in the DOM before the user.
setQuestion();

// -- Helpers --
// alertHandler(correct) -- handles the correct or wrong! alert based on user answer. pass in a boolean.
// checkCounters() -- compares the questionCounter against the length of questions left.
// handleAnswer() -- checks if the answer is correct or incorrect and adjusts score and time accordingly. 
// handleLocalStorage(initials) -- sets the model for the data and stores the game stats object in local storage, takes in the initials captured from the final end game initials form.
// endGame() -- handles the behavior when the game ends.
// countDown() -- handles the count down of the timer.
// startTimer() -- starts the timer.
// resetTimer() -- ends and resets the clock/timer.
// switchPage(page) -- handles routing and switching between pages. takes in a string directing to which page. ex. "toLanding", "toMain", etc...

//function that handles alerting when the user answers right or wrong.
const alertHandler = (correct) => {
  //if correct
  if (correct) {
    //update the innerHTML 
    alertEl.innerHTML = `
      <hr />
      <h2 class="alert-title">Correct!</h2>
    `;
    //change background to lightgreen
    // alertEl.style.backgroundColor = "lightgreen";
    //and show it
    alertEl.style.display = "block";
    //then after 3 seconds
    setTimeout(() => {
      //make it disappear
      alertEl.style.display = "none";
    }, 3000);
  }
  //otherwise if the user is incorrect.
  else { 
    //update the innerHTML
    alertEl.innerHTML = `
      <hr />
      <h2 class="alert-title">Incorrect!</h2>
    `;
    //change the background to red.
    // alertEl.style.backgroundColor = "red";
    //and show it
    alertEl.style.display = "block";
    //after 3 seconds
    setTimeout(() => {
      //make it disappear
      alertEl.style.display = "none";
    }, 3000);
  }
};
// function to check the questionCounter and questions.length to look for a condition to end the game.
const checkCounters = () => {
  console.info(questionCounter, questions.length, questionCounter === questions.length);
  //if the questionCounter is equal to or somehow greater than questions.length the game will end.
  if ( questionCounter == questions.length - 1 ) {
    alert("Congratulation's, you have won! confetti confetti.");
    endGame();
  }
};

//function that handles each answer given.
const handleAnswer = (event) => {

  //check the counters to see if we should end the game.
  checkCounters();


  //assign a shorter variable for the data being passed by the dataset attribute.
  const isCorrect = event.target.dataset.correct;
  //if the answer is correct.
  if (isCorrect === "true") {
    //fire the alert handler passing in true.
    alertHandler(true);
    //increase the questionCounter by 1.
    questionCounter += 1;
    //give the user a bonus time boost.
    time += 15;
    //reset the question in the DOM.
    setQuestion();
  } 
  //if the answer is incorrect.
  else { 
    //fire the alertHandler passing in false.
    alertHandler(false);
    //increment the questionCounter.
    questionCounter += 1;
    //penalize the user with -5 seconds on the clock.
    time -= 5;
    //reset the question in the DOM.
    setQuestion();
  }
};

//wrapped localStorage handling in function passing in initials captured at end of game flow.
const handleLocalStorage = (initials) => {
  //build a data model
  let stats = {
    message: "",
    initials: initials,
    score: time,
  };

  //if time > 0 then set stats.message to "You won!" otherwise set it to "You lost!"
  time > 0 ? stats.message = "You won!" : stats.message = "You lost!";
  //push the stats object from this game to the stats array saved in localStorage.
  gameStatsData.push(stats);
  //add trycatch block for error handling.
  try {
    //set item in local storage formatting for JSON.
    localStorage.setItem('gameStats', JSON.stringify(gameStatsData));
    //set updated gameStats to the DOM.
    setGameStats();
  } catch (exception) {
    //if error catch and display error
    console.error(exception);
  }

  //reset question counter
  questionCounter = 0;
  //reset the clock back to 30 seconds for the next game.
  time = 30;
  //reset score for next game.
  score = 0;
  //switch pages
  switchPage("toHighScores");
};

//function that handles the count down of the clock.
const countDown = () => { 
  //if were not on the main page where we play the game then stop the timer
  if ( document.getElementById("main-section").style.display == "none" ) { clearInterval(timer); }
  //if time is less than or equal to 0 then end the game.
  if (time <= 0) { 
    //stops the countdown and resets the timer.
    clearInterval(timer); 
    endGame(); 
  }
  else {
    //otherwise decrement time by 1.
    time--; 
    gameTimer.innerHTML = time; //setTime()
  }
};

// function that handles starting the timer when called
const startTimer = () => { timer = setInterval(countDown, 1000); };

//function that handles the behavior when the game ends.
const endGame = () => {
  
  scoreInput.textContent = `Your final score is ${time}.`;
  //switch pages
  switchPage("toEndGame");
  return;
};

//special switch case function to handle routing and switching the pages.
const switchPage = (page) => {
  switch (page) {
    case "toMain":
      //switch from landing page to main page
      document.querySelector("#landing-page").style.display = "none";
      document.getElementById("main-section").style.display = "block";
      break;
    case "toLanding":
      //switch from highscores page or endGame page to landing page
      document.getElementById("end-game-page").style.display = "none";
      document.querySelector("#highscores-page").style.display = "none";
      document.querySelector("#landing-page").style.display = "block";
      break;
    case "toHighScores":
      //switch from main page or endGame page to highscores page
      document.getElementById("end-game-page").style.display = "none";
      document.getElementById("main-section").style.display = "none";
      document.querySelector("#highscores-page").style.display = "block";
      break;
    case "toEndGame":
      //switch from main page to end page
      document.querySelector("#landing-page").style.display = "none";
      document.getElementById("main-section").style.display = "none";
      document.getElementById("end-game-page").style.display = "block";
      break;
    default:
      null;
  }
}

//Event Listeners
landingButton.addEventListener("click", () => {
  startTimer();
  switchPage("toMain");
});

startButton.addEventListener("click", () => { 
  switchPage("toLanding");
});

highscoresPageButton.addEventListener("click", () => {
  switchPage("toHighScores");
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const initials = document.querySelector("#initials-input").value;
  initials && handleLocalStorage(initials);
})

clearButton.addEventListener("click", () => { 
  if (confirm("Are you sure you want to clear the game history?")) {
    localStorage.clear('gameStats');
  }
  window.location.reload();
});
