"use strict";

// Preface: Code written by John Lungu as part of Jonas Schmedtmann's JavaScript course on Udemy
// *** This is based on a challenge from Jonas' course, however I have expanded on the challenge to make it more usable. See original challenge below (124. Coding Challenge #4)

// Intro: This small web tool takes a string and converts it into a variable name using camelCasing format.
//      the input can be any text or number and it can be multiple variable names separated by a new line or spaces (output will use the same spacing type)
//      if it contains uppercase letters they will be converted to lowercase.
//      if it contains underscores, it will break up the string into separate words and convert to camelCase
//      if it contains accidental spaces or new lines, these will be removed

// 124. Coding Challenge #4
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.

// Test data (pasted to textarea, including spaces):
// undeRScore_case
//    fIRsT_name
//  fiRst_mIDdLe_laSt
//    Some_Variable
// SOme_reAlly_lONg_Variable_naMe
//   calculate_AGE
// delayed_departure

// Should produce this output (5 separate console.log outputs):
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// My test data:
// underscoreCase;
// firstName;
// firstMiddleLast;
// someVariable;
// someReallyLongVariableName;
// calculateAge;
// delayedDeparture;

// Code:

// Create and append elements to DOM
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

// Select elements
const textArea = document.querySelector("textarea");
const button = document.querySelector("button");

// Set ID attributes
textArea.setAttribute("id", "text-area");
button.setAttribute("id", "button");
button.setAttribute("class", "gold-background");
button.setAttribute("onclick", "convertToCamelCase(textArea.value)");

// Set value for button and placeholder for text area
button.innerHTML = "Convert";
const placeholderText =
  "Enter list of variable names to convert to correct camelCasing format. \n \neg. \nsome_variable_name \nanother_variable \nand_another_one";
textArea.placeholder = placeholderText;

const convertToCamelCase = function (string) {
  if (textArea.value === "") {
    textArea.placeholder = `Please input data...`;
  } else {
    textArea.value = "";
    button.innerHTML = "Copy";
    button.setAttribute("class", "green-background");
    button.onclick = copyConvertedData;

    // currently we are passing a long string separated by new lines into the webpage itself (DOM)
    // take long string, lowerCase it, and split it by the "new line" character to create an array. This way we can manipulate each element (variable name) individually.
    const arr = string.trim().split("\n"); // array Note: this trim is necessary in case there are empty spaces entered at the end of the original string which were causing an error in the console.
    const output = [];
    // iterate/loop through the array and manipulate each string (array item/element) to trim, slice, split, join and convert to camelCase, then print to console each item.
    for (let i of arr) {
      i = i.toLowerCase();
      i = i.trim();
      i = i.split("_"); // creates mini arrays

      // loop over mini arrays and camelCase each string then store in variable k
      let k = [];
      for (let j of i) {
        k.push(j[0].toUpperCase() + j.slice(1));
      }

      k = k.join("");

      k = k[0].toLowerCase() + k.slice(1);

      output.push(k);

      textArea.value += k + "\n";
    }

    let emoji = "✅";
    for (const i of output) {
      console.log(i.padEnd(30, " ") + emoji);
      emoji += "✅";
    } // this was part of the original challenge - to print to console.
  }
};

const copyConvertedData = function () {
  navigator.clipboard.writeText(textArea.value);
  textArea.value = "";
  textArea.placeholder = `Text copied to clipboard.\nPress "Reset" to enter a new list.`;
  button.innerHTML = "Reset";
  button.setAttribute("class", "red-background");
  button.onclick = resetTextArea;
};

const resetTextArea = function () {
  textArea.value = "";
  button.innerHTML = "Convert";
  button.setAttribute("class", "gold-background");
  button.onclick = function () {
    //because we need to pass an argument into this function, we cannot simply type the function name with the argument as it will be called even before the button is clicked so we need an anonymous function.
    convertToCamelCase(textArea.value);
  };
  textArea.placeholder = placeholderText;
};
