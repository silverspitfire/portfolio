// HTML, CSS & JS written by John Lungu (pictures provided by Head First)

"use strict";

// Global / Game state variables
let gameOver = false;
let guess = 0;
let correctGuess = 0;
let guessesTaken = 0;
let hits = 0;
let activeGridElement = 0;
let ship1 = 0;
let ship2 = 0;
let ship3 = 0;
window.onload = init;

// HTML element selectors
const playerInput = document.getElementById("player__input");
const btnFire = document.getElementById("player__btn-fire");
const btnNewGame = document.getElementById("btn-new-game");
const playerMessage = document.getElementById("player__message");
const gameOverMessage = document.getElementById("game-over-message");

// Functions
// Initialize window
function init() {
  gameOver = false;
  btnFire.disabled = false;
  playerInput.disabled = false;
  clearGrid();
  placeShips();

  // activate cursor over input field when page loads.
  playerInput.focus();
  playerMessage.textContent = `There are 3 hidden ships to sink!`;
  gameOverMessage.textContent = "";
}

// Generate a random ship location
function oceanCoordinate() {
  const xAxis = Math.floor(Math.random() * 7); //min 0, max 6
  const yAxis = "ABCDEFG".charAt(Math.floor(Math.random() * 7)); //min 0, max 6 / A - G
  return yAxis + xAxis;
}

// Place 3 hidden ships on map
function placeShips() {
  ship1 = oceanCoordinate();
  ship2 = oceanCoordinate();
  ship3 = oceanCoordinate();

  // check if each ship has a unique location on the map. Not pretty but it works.
  if (ship2 === ship1 || ship2 === ship3) {
    ship2 = oceanCoordinate();
  }
  if (ship3 === ship1 || ship3 === ship2) {
    ship3 = oceanCoordinate();
  }
}

// Clear grid items
function clearGrid() {
  const hasImage = document.querySelectorAll(".image");
  hasImage.forEach((image) => {
    image.remove();
  });
}

// Event handlers
// FIRE button event handler
btnFire.addEventListener("click", function () {
  // keep cursor on input field after submitting a guess
  playerInput.focus();

  // Reset message after player submits empty string input
  playerMessage.textContent = `There are 3 hidden ships to sink!`;

  //   Accepting both lower and uppercase letters
  guess = playerInput.value.toUpperCase();

  // Now that we know player's guess, set correctGuess variable.
  correctGuess = guess === ship1 || guess === ship2 || guess === ship3;

  //   Dynamically selecting grid item entered by player
  activeGridElement = document.getElementById(guess);

  // If guess is NOT an actual grid item
  if (activeGridElement === null) {
    playerMessage.textContent = `Choose an actual grid item between A0 and G6!`;

    // Clear input after player guesses
    document.querySelector(".player").reset();
  } else {
    guessesTaken++;

    // Create img element dynamically to display hit or miss
    let hitMiss = document.createElement("img");
    hitMiss.classList.add("image");

    // If guess is correct, place ship image, if not place miss image
    hitMiss.src = correctGuess ? "ship.png" : "miss.png";

    // If guessed grid area doesn't have an image, place one.
    if (!activeGridElement.classList.contains(".has-image")) {
      activeGridElement.appendChild(hitMiss);
      activeGridElement.classList.add(".has-image");
    }

    // If guess is correct
    if (correctGuess) {
      hits++;
      if (hits === 3) {
        gameOver = true;
        btnFire.disabled = true;
        playerInput.disabled = true;
        playerMessage.textContent = `You sunk my battleships in ${guessesTaken} guesses!`;
        gameOverMessage.textContent = `ENEMY DEFEATED!`;
      }
    }

    // Clear input after player guesses
    document.querySelector(".player").reset();
  }
});

// ENTER KEY event handler
playerInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // Cancel the default action
    event.preventDefault();
    // Trigger the button element with a click
    btnFire.click();
  }
});

// New Game / Reset game
btnNewGame.addEventListener("click", function () {
  //Reset DOM (without this, it won't let you input guesses used in previous game rounds)
  location.reload();

  init();
});
