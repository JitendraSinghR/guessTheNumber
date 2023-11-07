let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);
const userInput = document.getElementById("guessfield");
const submit = document.getElementById("submit");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".last-result");
const lowOrHigh = document.getElementById("message-box");
const startOver = document.querySelector(".result");

const p = document.createElement("p");
let prevGuesses = [];

let numGuess = 0;
let playGame = true;

//this will check if you are available for play
if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

//this will check if the number is between 1 to 100
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1");
  } else if (guess > 100) {
    alert("Please enter a number lower than 100");
  } else {
    prevGuesses.push(guess);
    if (numGuess === 9) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

//this will check if the value is equal to random value
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("AWESOME! You guessed it right");
    endGame();
  } else if (guess > randomNumber) {
    displayMessage("Number is lower than you guessed");
  } else if (guess < randomNumber) {
    displayMessage("Number is greater than you guessed");
  }
}

//this will show the values in a array and manipulate the no of attempts.
function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess},`;
  numGuess++;
  remaining.innerHTML = `${10 - numGuess}`;
}

//this will simply display a message showing that number is less than or greater the random value.
function displayMessage(message) {
  lowOrHigh.innerHTML = `${message}`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start New Game </h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGame = document.querySelector("#newGame");
  newGame.addEventListener("click", (e) => {
    randomNumber = parseInt(Math.random() * 100 + 1);
    console.log(randomNumber);
    prevGuesses = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
