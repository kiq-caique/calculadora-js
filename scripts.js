const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  executeOperation() {
    let result;
    const currentOperand = Number(this.currentOperand);
    const previousOperand = Number(this.previousOperand);

    if (isNaN(previousOperand) || isNaN(currentOperand)) return;

    switch (this.operation) {
      case "+":
        this.previousOperand = "";
        result = previousOperand + currentOperand;
        break;

      case "-":
        this.previousOperand = "";
        result = previousOperand - currentOperand;
        break;

      case "*":
        this.previousOperand = "";
        result = previousOperand * currentOperand;
        break;

      case "÷":
        this.previousOperand = "";
        result = previousOperand / currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = "";
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.previousOperand !== "") {
      this.executeOperation();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (number === ".") {
      if (this.currentOperand.indexOf(".") === -1) {
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
      }
    } else {
      this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }
  }

  clear() {
    /*BÁSICAMENTE VC TA RESETANDO O PRIMEIRO E SEGUNDO VALOR E O OPERADOR TBM */
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}
for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.operation = operationButton.innerText;
    calculator.previousOperand = calculator.currentOperand;
    calculator.currentOperand = "";
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.executeOperation();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
