const button = document.getElementById("landing-page-button")
      const landingPage = document.getElementByClass("landing-page")
      const gameTimer = document.getElementById("game-timer")
      const questionsBox = document.getElementById("questions-box")
      const answersBox = document.getElementById("answers-box")
      const answerButton = document.getElementById("answers-button")
      const startButton = document.getElementById("start-button")

      const questions = [
        {
          question: 'What is a method?',
          answer: 'A function that is nested inside of an object'
        },
        {
          question: '',
          answer: ''
        },
        {
          question: '',
          answer: ''
        }
      ]

      console.info(questions[0].question)

      questionsBox.innerHTML = `
      <div>
        <p>Question: ${questions[0].question}</p>
        <p>Answer: ${questions[0].answer}</p>
      </div>
      `

      const questionCounter = 0

      const time = 0
      setTimeout()
      gameTimer.innerHTML = time;

      const score = 0;

      questionsBox.innerHTML = questions[questionCounter]

      
      const enterSite = () => {
        console.info("Entering Site!")
        landingPage.style.display = "hidden";
      }

      const showQuestions = () => {

      }
      
      const checkAnswer = (event) => {
        event.preventDefault();
        const answer = event.target.value;
        console.info("Please hold, I am checking your answer...", answer);
      }

      button.addEventListener("click", {

      })

      startbutton.addEventListener('click', event => {
        console.info("I have been clicked!")
      })
      answerButton.addEventListener("click", event => {
        event.preventDefault();
        console.info("I have been clicked.")
      })