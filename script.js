const screen = document.querySelector('.screen');
let currentInput = '';
let resetScreen = false;

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();
    
    if (value === 'C') {
      clearScreen();
    } else if (value === '←') {
      deleteLast();
    } else if (value === '=') {
      calculate();
    } else if (value === '²') {
      square();
    } else if (value === '√') {
      squareRoot();
    } else {
      appendValue(value);
    }
  });
});

function appendValue(value) {
  if (resetScreen) {
    currentInput = '';
    resetScreen = false;
  }
  
  if (isOperator(value)) {
    if (isOperator(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1);
    }
  }

  currentInput += value;
  screen.textContent = currentInput;
}

function clearScreen() {
  currentInput = '';
  screen.textContent = '0';
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  screen.textContent = currentInput || '0';
}

function calculate() {
  try {
    currentInput = eval(currentInput.replace('×', '*').replace('÷', '/').replace('−', '-'));
    screen.textContent = currentInput;
    resetScreen = true;
  } catch {
    screen.textContent = 'Error';
    resetScreen = true;
  }
}

function square() {
  try {
    currentInput = Math.pow(eval(currentInput), 2).toString();
    screen.textContent = currentInput;
  } catch {
    screen.textContent = 'Error';
  }
}

function squareRoot() {
  try {
    currentInput = Math.sqrt(eval(currentInput)).toString();
    screen.textContent = currentInput;
  } catch {
    screen.textContent = 'Error';
  }
}

function isOperator(value) {
  return ['+', '-', '×', '÷'].includes(value);
}
