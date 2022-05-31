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

  executeOperation() {
    const currentOperand = Number(this.currentOperand);
    const previousOperand = Number(this.previousOperand);

    switch(this.operation) {
      case "+":
        this.previousOperand = "";
        this.currentOperand = (previousOperand + currentOperand).toString();
        break;
      
      case "-":
        this.previousOperand = "";
        this.currentOperand = (previousOperand - currentOperand).toString();
        break;
      
      case "*":
        this.previousOperand = "";
        this.currentOperand = (previousOperand * currentOperand).toString();
        break;

      case "/":
        this.previousOperand = "";
        this.currentOperand = (previousOperand / currentOperand).toString();
        break;


    }
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "."){
      if (this.currentOperand.indexOf(".") === -1) {
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
      }
    }else{
      this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }
    
  }

  clear() {
    /*BÁSICAMENTE VC TA RESETANDO O PRIMEIRO E SEGUNDO VALOR E O OPERADOR TBM */
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = this.previousOperand;
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
    calculator.previousOperand = calculator.currentOperand;
    calculator.currentOperand = "";
    calculator.operation = operationButton.innerText;
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () =>{
  calculator.executeOperation();
  calculator.updateDisplay();
})
