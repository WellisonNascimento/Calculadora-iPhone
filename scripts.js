let expression = '';

function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = expression || '0';
  display.scrollLeft = display.scrollWidth;
}

function appendNumber(value) {
  // Previne múltiplos pontos decimais no mesmo número
  if (value === '.') {
    const lastNumber = expression.split(/[-+*/]/).pop();
    if (lastNumber.includes('.')) return;
  }
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
  // Evita operadores duplicados e não permite iniciar com operador
  if (expression === '' && op !== '-') return;
  if ('+-*/'.includes(lastChar)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

function calculate() {
  try {
    // Previne eval de código malicioso
    if (/[^0-9+\-*/%.() ]/.test(expression)) throw new Error();
    // Previne divisão por zero
    if (/\/0(?!\d)/.test(expression)) throw new Error('Divisão por zero');
    let result = Function('return ' + expression)();
    if (!isFinite(result)) throw new Error('Resultado inválido');
    // Limita casas decimais
    if (typeof result === 'number') {
      result = Math.round(result * 100000) / 100000;
    }
    expression = String(result);
    updateDisplay();
  } catch {
    expression = 'Erro';
    updateDisplay();
  }
}