// 1. Select elements
const inputbox = document.getElementById("inputbox");

const operators = ["+", "-", "*", "/"];

const invalidValues = ["NaN", "undefined"]

function isOperator(char) {
    return operators.includes(char);
}

// 2. Input validation
    // If current character is an operator and the next character chosen is also an operator then the most recent
    // operator will replace the old one in the display field.
function validateInput(char1, char2) {
    const operation = inputbox.innerHTML;
    let num1;
    let num2;
    let nums;

    let operator;

    // Input can be either a number or an operator
    if (isOperator(char1)) {
        // Cannot input two consecutive operators
        if (isOperator(char2)) {
            return false;
        } else {
            return true;
        }
    }

    if ((char1 == undefined || (char1 == "0" && operation.length < 2)) && isOperator(char2)) {
        if (char2 == "-") {
            return true;
        }
        return false;
    }

    if (operation.includes(NaN)) {
        return false;
    }

    if ((isOperator(char1) || operation == "") && char2 == ".") {
        return false;
    }

    // To prevent consecutive operators in operation string
    for (const operator of operators) {
        if (operation.includes(operator) && isOperator(char2)) {
            if (operation.split("")[0] == "-") {
                return true;
            }
            return false;
        }
    }

    for (const operator of operators) {
        if (char2 == ".") {
            if (operation.includes(operator)) {
                if (operation.split(operator)[1].includes(".")) {
                    return false;
                }
                return true;
            } else if (!(operation.includes(operator)) && (operation.includes("."))) {
                return false;
            }
            return true;
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

// 8. Clear textbox
function clearDisplay() {
    inputbox.textContent = "";
}

// 9. Clear entry
function clearEntry() {
    // Prevent clearing of individual characters of invalid values
    if (invalidValues.includes(inputbox.textContent)) {
        return;
    }
    inputbox.textContent = inputbox.textContent.slice(0, (inputbox.textContent).length - 1);
}

// 10. Add decimal
function addDecimal() {
    if (validateInput(inputbox.textContent.split("").at(-1), ".")) {
        inputbox.textContent += ".";
    }
}

// 11. Operation execution
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
        if (operation.slice(1).includes(operator)) {
            // Operation contains leading minus sign - handling negative number calculations
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