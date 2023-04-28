// Code written by John Lungu as part of Jonas Schmedtmann's JavaScript course on Udemy. Some of the game logic was written by me, using my notes and exercising my knowledge and understanding of JavaScript concepts, without following Jonas' tutorials.

"use strict";

// Global variable declarations (Game state variables)
let gameOver = false;
let randNum;
let currentScore = 0;

// HTML elements for DOM manipulation
const dice = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const p1 = document.querySelector(".player--0");
const p1Score = document.querySelector("#score--0");
const p1CurrentScore = document.querySelector("#current--0");

const p2 = document.querySelector(".player--1");
const p2Score = document.querySelector("#score--1");
const p2CurrentScore = document.querySelector("#current--1");

let activePlayer = document.querySelector(".player--active");

const playerID = function () {
  let x = activePlayer.querySelector(".name").getAttribute("id");
  let y = x.substring(x.length - 1); // 0 or 1
  return y;
};

let activePlayerCurrentScore = activePlayer.querySelector(
  "#current--" + playerID()
);

dice.classList.add("hidden");

// Classes used to activate/deactivate element styles
// .player--active
// .player--winner
// .hidden

// Function declarations (Function Expressions)
const switchPlayer = function (x, y) {
  x.classList.remove("player--active");
  y.classList.add("player--active");
  activePlayer = y;
  activePlayerCurrentScore = activePlayer.querySelector(
    "#current--" + playerID()
  );
};

const activateP2 = function () {
  p1CurrentScore.textContent = 0;
  switchPlayer(p1, p2);
};

const activateP1 = function () {
  p2CurrentScore.textContent = 0;
  switchPlayer(p2, p1);
};

// Event listeners / Event handlers
// CLICK "ROLL DICE" button
//  - Generate a random number between 1 - 6 (if you had randomNum * 7 you would also get max 6 but you would also get min 0 and there's no 0 on a dice.)
btnRoll.addEventListener("click", function () {
  if (dice.classList.contains("hidden") && !gameOver) {
    dice.classList.remove("hidden");
  }

  if (gameOver) {
  } else {
    randNum = Math.trunc(Math.random() * 6) + 1; //This has to be inside a function in this case because we are generating a new number with each click. In other games like guess-my-number, the number was only generated once at the beginning of the game and it made sense to have it stored in a Global variable.

    if (randNum === 1) {
      document.querySelector(".dice").setAttribute("src", "dice-1.png");
    } else if (randNum === 2) {
      document.querySelector(".dice").setAttribute("src", "dice-2.png");
    } else if (randNum === 3) {
      document.querySelector(".dice").setAttribute("src", "dice-3.png");
    } else if (randNum === 4) {
      document.querySelector(".dice").setAttribute("src", "dice-4.png");
    } else if (randNum === 5) {
      document.querySelector(".dice").setAttribute("src", "dice-5.png");
    } else if (randNum === 6) {
      document.querySelector(".dice").setAttribute("src", "dice-6.png");
    }

    if (randNum === 1) {
      if (p1.classList.contains("player--active")) {
        activateP2();
      } else if (p2.classList.contains("player--active")) {
        activateP1();
      }
      currentScore = 0;
    } else {
      currentScore += randNum;
      activePlayerCurrentScore.textContent = currentScore;
    }
  }
});

// CLICK "HOLD" button
btnHold.addEventListener("click", function () {
  if (gameOver) {
  } else {
    if (p1Score.textContent >= 100 || p2Score.textContent >= 100) {
      gameOver = true;
      activePlayer.classList.add("player--winner");
      dice.classList.add("hidden");
    } else {
      let totalScore = Number(
        activePlayer.querySelector("#score--" + playerID()).textContent
      );
      totalScore += currentScore;
      activePlayer.querySelector("#score--" + playerID()).textContent =
        totalScore;
      currentScore = 0;
      activePlayerCurrentScore.textContent = currentScore;
      if (p1Score.textContent >= 100 || p2Score.textContent >= 100) {
        gameOver = true;
        activePlayer.classList.add("player--winner");
        dice.classList.add("hidden");
      } else {
        if (p1.classList.contains("player--active")) {
          activateP2();
        } else if (p2.classList.contains("player--active")) {
          activateP1();
        }
      }
    }
  }
});

// CLICK "NEW GAME" Button
btnNew.addEventListener("click", function () {
  gameOver = false;
  currentScore = 0;
  if (!dice.classList.contains("hidden")) {
    dice.classList.add("hidden");
  }

  p1Score.textContent = 0;
  p1CurrentScore.textContent = 0;
  p2Score.textContent = 0;
  p2CurrentScore.textContent = 0;
  activePlayer.classList.remove("player--winner");
  if (p2.classList.contains("player--active")) {
    activateP1();
  }
});
