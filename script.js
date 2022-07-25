let firstNumber;
let secondNumber;
let first = true;

let activeNum;
let symbol;
mathEnabled = false;
firstNumEntered = false;
secondNumEntered = false;

function main() {
  const numbers = document.querySelectorAll(".number");

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
    activeNum = 0;
    symbol = "";
    mathEnabled = false;
    firstNumEntered = false;
    secondNumEntered = false;
    eraseScreen();
    eraseFormulaScreen();
  });

  const equal = document.getElementById("equal");
  equal.addEventListener("click", () => {
    const formulaScreen = document.getElementById("formula-screen");
    // nothing has been inputted in yet
    if (formulaScreen.textContent == "") {
      return;
    }

    // something is ready in the formula screen and we have a input ready already
    if (secondNumEntered) {
      // else there is something already in the formula
      outputResult();
    }

    // need to know if there's an operation
  });

  const addition = document.getElementById("add");
  addition.addEventListener("click", () => {
    // store the number on screen and set global var symbol
    if (!secondNumEntered) {
      activeNum = Number(getScreenText());
      symbol = "+";
    }

    updateFormulaScreen(`${activeNum}  ${symbol}`);
    // condition to replace previous input
    mathEnabled = true;

    // new number already entered in screen
    if (secondNumEntered) {
      outputResult();
      symbol = "+";
      // active num is updated from outputResult()
      updateFormulaScreen(`${activeNum} ${symbol}`);
      secondNumEntered = false;
    }
  });

  function doubleSymbol() {
    updateFormulaScreen(`${activeNum}  ${symbol}`);
  }

  const subtraction = document.getElementById("subtract");
  subtraction.addEventListener("click", () => {
    if (!secondNumEntered) {
      activeNum = Number(getScreenText());
      symbol = "-";
    }

    updateFormulaScreen(`${activeNum}  ${symbol}`);
    mathEnabled = true;

    //
    if (secondNumEntered) {
      // else there is something already in the formula
      outputResult();
      symbol = "-";
      updateFormulaScreen(`${activeNum} ${symbol}`);
      secondNumEntered = false;
    }
  });

  // change the number to negative or positive only if its already entered
  const negative = document.getElementById("negative");
  negative.addEventListener("click", () => {
    currentNumber = getScreenText();

    if (currentNumber >= 0) {
      updateScreen(`-${Math.abs(currentNumber)}`);
    } else {
      updateScreen(Math.abs(currentNumber));
    }
  });
}

function outputResult() {
  secondNumEntered = false;
  newNum = Number(getScreenText());
  result = compute(symbol, activeNum, newNum);
  updateScreen(result);
  updateFormulaScreen(`${activeNum} ${symbol} ${newNum} =`);
  activeNum = result;
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

function getScreenText() {
  const screen = document.getElementById("screen");
  return screen.textContent;
}

function getFormulaScreenText() {
  const formulaScreen = document.getElementById("formula-screen");
  return formulaScreen.textContent;
}

function updateScreen(num) {
  const screen = document.getElementById("screen");
  screen.textContent = num;
}

function updateFormulaScreen(formula) {
  const formulaScreen = document.getElementById("formula-screen");
  formulaScreen.textContent = formula;
}

// adds to the string
function inputNumber(num) {
  const screen = document.getElementById("screen");

  if (getScreenText() == "-0") {
    screen.textContent = `-${num}`;
    firstNumEntered = true;
    return;
  } else if (screen.textContent == "0") {
    screen.textContent = num;
    firstNumEntered = true;
    return;
  }

  if (mathEnabled) {
    // need condition to replace previous input
    mathEnabled = false;
    secondNumEntered = true;
    screen.textContent = num;
    return;
  }

  if (screen.textContent.length < 10) {
    screen.textContent += num;
  }
}

function inputDecimal() {
  const screen = document.getElementById("screen");

  if (screen.textContent.length > 0 && !screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
}

// returns number based on operation given
function compute(symbol, num1, num2) {
  console.log(`The symbol in compute is: ${symbol}`);
  switch (symbol) {
    case "+":
      outcome = add(num1, num2);
      break;
    case "-":
      outcome = subtract(num1, num2);
      console.log(outcome);
      break;
    case "*":
      outcome = multiply(num1, num2);
      break;
    case "/":
      outcome = divide(num1, num2);
  }

  return outcome;
}

const add = (activeNum, newNum) => activeNum + newNum;
const subtract = (activeNum, newNum) => activeNum - newNum;
const multiply = (activeNum, newNum) => activeNum * newNum;
const divide = (activeNum, newNum) => activeNum / newNum;

main();
