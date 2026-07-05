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

// 2. Input validation
    // If current character is an operator and the next character chosen is also an operator then the most recent
    // operator will replace the old one in the display field.
function validateInput(char1, char2) {
    // Input can be either a number or an operator
    if (operators.includes(char1)) {
        // Cannot input two consecutive operators
        if (operators.includes(char2)) {
            return false;
        } else {
            return true;
        }
    }
    if (char1 == undefined && operators.includes(char2)) {
        return false;
    }
    return true;
}
// 3. Add character to display field
function addCharacter(char) {
    let lastChar = inputbox.innerHTML.split("").at(-1);
    if (validateInput(lastChar, char) === true) {
        // Replace 0 if it is the first and only character
        if (inputbox.innerHTML.length == 1 && lastChar == "0") {
            inputbox.textContent = char;
        } else {
            inputbox.textContent += char;
        }
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
function displayResult() {
    if (inputbox.innerHTML == "") {
        return;
    }

    const operation = inputbox.innerHTML;

    let result;
    let operator;
    let components;
    let num1;
    let num2;

    for (char in operators) {
        operator = operators[char];
        if (operation.includes(operator)) {
            components = operation.split(operator);
            // Immediately exit loop after getting components
            break;
        }
    }

    num1 = Number(components[0]);
    num2 = Number(components[1]);

    // Trade off O(n) search operation (.includes()) for O(1) comparison operation (==)
    if ("+" == operator) {
        result = add(num1, num2); 
    } else if ("-" == operator) {
        result = subtract(num1, num2);
    } else if ("*" == operator) {
        result = multiply(num1, num2);
    } else if ("/" == operator) {
        result = divide(num1, num2);
    }

    inputbox.innerHTML = result;
}

// To prevent keyboard input
inputbox.addEventListener('keydown', (event) => {
    event.preventDefault(); 
});

// 9. Continuous operations