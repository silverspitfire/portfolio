'use strict';

// Select all elements used in this project and store in variables for easy use.
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  // Method to remove a class from an element. Can remove multiple classes, separated by commas.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsShowModal.length; i++) {
  // Event listener for the buttons to display the modal (pop-up) window.
  btnsShowModal[i].addEventListener('click', openModal);
}

// Event listener for closing the modal window when user clicks the X item.
btnCloseModal.addEventListener('click', closeModal);
// Event listener for closing the modal when user clicks away from the modal on the overlay.
overlay.addEventListener('click', closeModal);

// Handling the press of ESC key
document.addEventListener('keydown', function (e) {
  // "e" stands for event. Expected argument will be passed in by JavaScript and will be the object created by JS when key was pressed.

  // Close modal when ESC key is pressed, only when HTML element doesn't have a class named 'hidden'
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
