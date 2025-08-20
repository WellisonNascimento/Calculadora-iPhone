let expression = '';

function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = expression || '0';
  display.scrollLeft = display.scrollWidth;
}

function appendNumber(value) {
  expression += value;
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function toggleSign() {
  const match = expression.match(/(-?\d+\.?\d*)$/);
  if (match) {
    const num = parseFloat(match[0]) * -1;
    expression = expression.slice(0, -match[0].length) + num;
    updateDisplay();
  }
}

function percent() {
  const match = expression.match(/(\d+\.?\d*)$/);
  if (match) {
    const num = parseFloat(match[0]) / 100;
    expression = expression.slice(0, -match[0].length) + num;
    updateDisplay();
  }
}

function setOperation(op) {
  const lastChar = expression.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(expression);
    expression = String(result);
    updateDisplay();
  } catch {
    expression = 'Erro';
    updateDisplay();
  }
}