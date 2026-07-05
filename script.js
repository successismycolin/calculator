// 1. Select elements
const inputbox = document.getElementById("textbox");

const operators = ["+", "-", "*", "/"]

// 2. Input validation
    // If current character is an operator and the next character chosen is also an operator then the most recent
    // operator will replace the old one in the display field.
function validateInput(char1, char2) {
    const operation = inputbox.innerHTML;
    let operator;

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
    // To prevent consecutive operators in operation string
    for (char in operators) {
        operator = operators[char];
        if (operation.includes(operator) && operators.includes(char2)) {
            if (operation.split("")[0] == "-") {
                return true;
            }
            return false;
        }
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

    let operation = inputbox.innerHTML;

    let result;
    let operator;
    let components;
    let num1;
    let num2;

    for (char in operators) {
        operator = operators[char];
        if (operation.includes(operator)) {
            if (operation.split("")[0] == "-") {
                operation = operation.slice(1);
                components = operation.split(operator);
                num1 = -(Number(components[0]));
                num2 = Number(components[1]);
            } else {
                components = operation.split(operator);
                num1 = Number(components[0]);
                num2 = Number(components[1]);
            }
            // Immediately exit loop after getting components
            break;
        }
    }

    console.log(num1);

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