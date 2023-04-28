'use strict';

// Selecting all the elements we will be using in this project from the HTML document and storing them into variables for ease of use throughout the project. This is common practice.

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// Here we're using .querySelectorAll() because there are multiple elements which match the class name specified. If we used just .querySelector(), only the first element would be selected. The returned value from this code is now almost like an array. It's not quite an array but it can be treated like one. Eg. you can iterate through it using a "for loop".
const btnsShowModal = document.querySelectorAll('.show-modal');
// console.log(btnsShowModal);

const openModal = function () {
  // Method to remove a class from an element. Can remove multiple classes by passing them in as arguments separated by commas.
  modal.classList.remove('hidden'); // NOTE we don't use the . for the "hidden" class, we are simply passing in the name of the class. We use the dot only when we want to select the element.
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// iterating through the array and logging the individual elements and content to the console.
for (let i = 0; i < btnsShowModal.length; i++) {
  //   console.log(btnsShowModal[i]);
  //   console.log(btnsShowModal[i].textContent);

  //   Adding an event listener for the buttons to display the modal (pop-up) window.
  btnsShowModal[i].addEventListener('click', openModal);
}

// Adding an event listener for closing the modal window when user clicks the X item.
btnCloseModal.addEventListener('click', closeModal);
// Adding another event listener for closing the modal when user clicks away from the modal.
overlay.addEventListener('click', closeModal);

// btnsShowModal[0].addEventListener('click', function () {
//   console.log(`this worked!`);
// });

// btnsShowModal[1].addEventListener('click', function () {
//   console.log(`this also worked!`);
// });
// btnsShowModal[2].addEventListener('click', function () {
//   console.log(`hey, so did this!`);
// });

// Listening to keyboard press events (AKA global events). For Global events we usually listen on the whole document.
// Code for handling the press of ESC key
document.addEventListener('keydown', function (e) {
  //e parameter stands for event and expects JavaScript to pass in the object it creates with information about which key was pressed. This object is created as soon as the event happens.
  //   console.log(e);
  //   console.log(e.key);

  // Now that we know which key was pressed, we can use that information to write code logic to close the modal whenever the ESC key is pressed.
  //   if (e.key === 'Escape') { // Reading this literally means if the pressed key is Escape AND if the modal element does NOT contain the 'hidden' class, then close the modal. Reading it like this means we can refactor the code so that both if statements can be put on one line of code using the logical operator &&
  //     console.log(`Esc was pressed`);
  //     // What we want to do now is close the modal when the ESC key is pressed. However we only want to do this when the modal is open/visible (in other words when the "hidden" class is removed from the modal element.).
  //     // Checking if the HTML element has a class named 'hidden'
  //     if (!modal.classList.contains('hidden')) {
  //       //above condition means if modal does NOT contain a class named 'hidden', then do this.
  //       closeModal(); //this time we have to include the ()parentheses as the function is being called inside a if statement which is nested inside the click event handler. If we don't include the () it will be treated just like a variable however if we include the () it won't be called until the click event happens so it's safe.
  //     }
  //   }

  //   Same if statements as above but REFACTORED using DRY principle.
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// By using the event listener on the document object we are basically listening for events everywhere. So no matter where the event happens on the page it will always trigger what we specify in this code.
// There are 3 types of events for the Keyboard:
// keydown is fired as soon as we press down on a kb key.
// keypress is fired continuously as we keep our finger on a certain kb key.
// keyup (when we lift our finger off the kb button).
