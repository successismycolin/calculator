// 1. Select elements
const inputbox = document.getElementById("textbox");
const btn1 = document.getElementById("1");
const btn2 = document.getElementById("2");
const btn3 = document.getElementById("3");
const btn4 = document.getElementById("4");
const btn5 = document.getElementById("5");
const btn6 = document.getElementById("6");
const btn7 = document.getElementById("7");
const btn8 = document.getElementById("8");
const btn9 = document.getElementById("9");
const btn0 = document.getElementById("0");
const btnPlus = document.getElementById("+");
const btnMinus = document.getElementById("-");
const btnDivide = document.getElementById("/");
const btnMultiply = document.getElementById("x");
const btnEquals = document.getElementById("=");

const operators = ["+", "-", "*", "/"]
let characterChain = inputbox.textContent;

// 2. Input validation
    // If current character is an operator and the next character chosen is also an operator then the most recent
    // operator will replace the old one in the display field.
function validateInput(char1, char2) {
    if (char1 in operators) {
        if (typeof(char2) == "number") {
            return true;
        } else if (char2 in operators) {
            return false;
        }
    }
    if (char1 == "" && char2 in operators) {
        return false;
    }
    return true;
}
// 3. Add character to display field
function addCharacter(char) {
    if (validateInput(inputbox.textContent[-1], char)) {
        inputbox.textContent += char;
    }
} 
// 4. Addition
function add(x, y) {
    return x + y;
}
// 5. Subtraction
function subtract(x, y) {
    return x - y;
}
// 6. Division
function divide(x, y) {
    return x / y;
}
// 7. Multiplication
function multiply(x, y) {
    return x * y;
}
// 8. Operation execution
function displayResult(operation) {
    let result;
    let operator;

    for (char in operators) {
        if (operation.includes(char)) {
            operator = char;
            let components = operation.split(char);
        }
    }

    if ("+" == operator) {
        result = add(Number(components[0]), Number(components[2])) 
    } else if ("-" == operator) {
        result = subtract(Number(components[0]), Number(components[2]))
    } else if ("*" == operator) {
        result = multiply(Number(components[0]), Number(components[2]))
    } else if ("/" == operator) {
        result = divide(Number(components[0]), Number(components[2]))
    }

    inputbox.value = result;
}

btnEquals.addEventListener("click", displayResult("5+5"))

// To prevent keyboard inputs
inputbox.addEventListener('keydown', (event) => {
    event.preventDefault(); 
});

// 9. Continuous operations