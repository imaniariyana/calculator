const display = document.querySelector(".calculator__display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let isSecondNumber = false;

function updateDisplay(value) {
  display.textContent = value;
}

function handleNumberClick(evt) {
  const number = evt.target.dataset.number;

  if (isSecondNumber) {
    secondNumber += number;
    updateDisplay(secondNumber);
  } else {
    firstNumber += number;
    updateDisplay(firstNumber);
  }
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", handleNumberClick);
});

function handleOperatorClick(evt) {
  operator = evt.target.dataset.operator;
  isSecondNumber = true;
}

operatorButtons.forEach(function (button) {
  button.addEventListener("click", handleOperatorClick);
});

function calculate() {
  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);

  let result = 0;

  if (operator === "+") {
    result = num1 + num2;
  } else if (operator === "-") {
    result = num1 - num2;
  } else if (operator === "*") {
    result = num1 * num2;
  } else if (operator === "/") {
    result = num1 / num2;
  }

  return result;
}

function handleEqualsClick() {
  if (firstNumber && operator && secondNumber) {
    const result = calculate();

    updateDisplay(result);

    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
    isSecondNumber = false;
  }
}

equalsButton.addEventListener("click", handleEqualsClick);

function handleClearClick() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  isSecondNumber = false;

  updateDisplay("0");
}

clearButton.addEventListener("click", handleClearClick);

function handleDecimalClick() {
  if (isSecondNumber) {
    if (!secondNumber.includes(".")) {
      secondNumber += ".";
      updateDisplay(secondNumber);
    }
  } else {
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      updateDisplay(firstNumber);
    }
  }
}

decimalButton.addEventListener("click", handleDecimalClick);

function handleBackspaceClick() {
  if (isSecondNumber) {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || "0");
  } else {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || "0");
  }
}

backspaceButton.addEventListener("click", handleBackspaceClick);
