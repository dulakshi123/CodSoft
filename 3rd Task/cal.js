document.addEventListener('DOMContentLoaded', function () {
    let historyValue = "";
    let outputValue = "";
    const historyElement = document.getElementById("history-value");
    const outputElement = document.getElementById("output-value");

    function printHistory(num) {
        historyElement.innerText = num;
    }

    function printOutput(num) {
        if (num == "") {
            outputElement.innerText = num;
        } else {
            outputElement.innerText = getFormattedNumber(num);
        }
    }

    function getFormattedNumber(num) {
        if (num == "-") {
            return "";
        }
        let n = Number(num);
        let value = n.toLocaleString("en");
        return value;
    }

    function reverseNumberFormat(num) {
        return Number(num.replace(/,/g, ''));
    }

    const operators = document.getElementsByClassName("operators");
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function () {
            if (this.id == "clear") {
                historyValue = "";
                outputValue = "";
                printHistory(historyValue);
                printOutput(outputValue);
            } else if (this.id == "backspace") {
                outputValue = reverseNumberFormat(outputValue).toString();
                if (outputValue) {
                    outputValue = outputValue.substr(0, outputValue.length - 1);
                    printOutput(outputValue);
                }
            } else {
                if (outputValue == "" && historyValue != "") {
                    if (isNaN(historyValue[historyValue.length - 1])) {
                        historyValue = historyValue.substr(0, historyValue.length - 1);
                    }
                }
                if (outputValue != "" || historyValue != "") {
                    outputValue = outputValue == "" ? outputValue : reverseNumberFormat(outputValue);
                    historyValue += outputValue;
                    if (this.id == "=") {
                        let result = eval(historyValue);
                        printOutput(result);
                        historyValue = "";
                    } else {
                        historyValue += this.id;
                        printHistory(historyValue);
                        outputValue = "";
                        printOutput(outputValue);
                    }
                }
            }
        });
    }

    const numbers = document.getElementsByClassName("numbers");
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function () {
            outputValue += this.id;
            printOutput(outputValue);
        });
    }
});
