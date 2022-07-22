let firstNumber;
let secondNumber;
let first = true;

function main() {
  currentNums = [];
  addActive = false;
  subtractActive = false;
  divideActive = false;
  multiplyActive = false;

  mathEnabled = false;

  const numbers = document.querySelectorAll(".number");

  let num1;
  let num2;

  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      //give each number class a num id '1', '2', '3'
      inputNumber(number.id);
    });
  });

  const decimal = document.getElementById("decimal");
  decimal.addEventListener("click", () => {
    inputDecimal();
  });

  const clear = document.getElementById("clear");
  clear.addEventListener("click", () => {
    eraseScreen();
    eraseFormulaScreen();
  });

  const equal = document.getElementById("equal");
  equal.addEventListener("click", () => {
    const formulaScreen = document.getElementById("formula-screen");
    // nothing has been inputted in yet
    if ((formulaScreen.textContent = "")) {
      return;
    }

    // else there is something already in the formula
    num2 = Number(getScreenInput());
    updateScreen(num1 + num2);

    // need to know if there's an operation
  });

  const addition = document.getElementById("add");
  addition.addEventListener("click", () => {
    // clear screen

    // store the number that was in it
    num1 = Number(document.getElementById("screen").textContent);

    // update formula screen
    const formulaScreen = document.getElementById("formula-screen");
    formulaScreen.textContent = num1 + " +";
    mathEnabled = true;
  });
}

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

// takes  the numbers and does the math
function math(num1, num2, mathSign) {
  if (checkNumber(num1) || checkNumber(num2)) {
    console.log("Not numbers");
    return;
  }
  num1 = Number(num1);
  num2 = Number(num2);

  switch (mathSign) {
    case "+":
      outcome = add(num1, num2);
      break;
    case "-":
      outcome = subtract(num1, num2);
      break;
    case "*":
      outcome = multiply(num1, num2);
      break;
    case "/":
      outcome = divide(num1, num2);
  }

  console.log(outcome);
}

// returns false if number, true if not a number
const checkNumber = (num) => !Number(num) && num != 0;

//TODO: erase the screen and saves the number
// done after pressing a function
function eraseScreen() {
  const screen = document.getElementById("screen");
  screen.textContent = "0";
}

function eraseFormulaScreen() {
  const formulaScreen = document.getElementById("formula-screen");
  formulaScreen.textContent = "";
}

// adds to the string
function inputNumber(num) {
  const screen = document.getElementById("screen");

  if (screen.textContent == "0") {
    screen.textContent = num;
    return;
  }

  if (mathEnabled) {
    mathEnabled = false;
    screen.textContent = num;
    return;
  }

  if (screen.textContent.length < 20) {
    screen.textContent += num;
  }
}

function getScreenInput() {
  const screen = document.getElementById("screen");
  return screen.textContent;
}

function updateScreen(num) {
  const screen = document.getElementById("screen");
  screen.textContent = num;
}

function inputDecimal() {
  const screen = document.getElementById("screen");

  if (screen.textContent.length > 0 && !screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
}

main();
