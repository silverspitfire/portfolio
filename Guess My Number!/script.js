// Code written by John Lungu as part of Jonas Schmedtmann's JavaScript course on Udemy

"use strict";

// STATE variables (they hold the game's state)
// Generate a random number between 1 - 20.
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let gameOver = false;

// Store original values before DOM manipulation so they can be used when user resets the game.
const origNum = document.querySelector(".number").textContent;
const origMsg = document.querySelector(".message").textContent;

const displayMessage = function (msg) {
  document.querySelector(".message").textContent = msg;
};

// code for the "check" button
document.querySelector(".check").addEventListener("click", function () {
  // Getting user input 'string' and converting 'number', then storing in a variable to be used later.
  const guess = Number(document.querySelector(".guess").value);

  // Game logic
  if (gameOver) {
    displayMessage("GAME OVER!");
  } else {
    // When there is no input
    if (!guess) {
      displayMessage("⛔ No number!");

      // When player wins
    } else if (guess === secretNumber) {
      displayMessage("🎇 Correct Number! 🏆 YOU WIN!");

      // Setting HIGHSCORE
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }

      document.querySelector(".number").textContent = secretNumber;
      gameOver = true;

      // Changing/manipulating CSS style using the DOM.
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".number").style.backgroundColor = "#ac7e0a";
      document.querySelector(".number").style.color = "#f0eee9";

      // When guess is wrong (too high or too low)
    } else if (guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
        score--;
        document.querySelector(".score").textContent = score;
      } else {
        displayMessage("💥 You lost the game!");
        document.querySelector(".score").textContent = 0;
        gameOver = true;
      }
    }
  }
});

// Game RESET
document.querySelector(".again").addEventListener("click", function () {
  gameOver = false;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector(".number").textContent = origNum;
  document.querySelector(".guess").value = "";
  displayMessage(origMsg);
  document.querySelector(".score").textContent = score;

  document.querySelector("body").style.backgroundColor = "";
  document.querySelector(".number").style.width = "";
  document.querySelector(".number").style.backgroundColor = "";
  document.querySelector(".number").style.color = "";
});
