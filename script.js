const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let expenses = [];
let incomes = [];
let totalExpense = 0, totalIncome = 0;

function initialize() {
  list.innerHTML = '';

  expenses?.forEach(e => addTransaction(e));
  incomes?.forEach(e => addTransaction(e));
}

function addArrayElements(array) {
  return array.reduce((partialSum, acc) => partialSum + acc.amount, 0);
}

function calculateBalance(totalIncome, totalExpense) {
  balance.innerText = `$${totalIncome + totalExpense}`;
}

function deleteTransaction(id, isExpense) {
  console.log(id);
  if (isExpense) {
    expenses = expenses.filter(expense => expense.id !== id);
  } else {
    incomes = incomes.filter(income => income.id !== id);
  }

  initialize();
}

function addTransaction(e) {
  e.preventDefault();

  if (!amount.value) {
    alert('Enter amount please');
    return;
  }

  if (!text.value) {
    alert('Enter text please');
    return;
  }

  if (amount.value[0] === '-') {
    const expense = {
      amount: Number(amount.value),
      id: Math.floor(Math.random() * 10000000),
    };

    expenses.push(expense);
    totalExpense = addArrayElements(expenses);
    money_minus.innerText = `$${totalExpense * -1}`;

    list.innerHTML += `
      <li class="minus">
        ${text.value} <span>${amount.value}</span><button class="delete-btn" onclick="deleteTransaction(${expense.id}, true)">x</button>
      </li>
    `;
  } else {
    const income = {
      amount: Number(amount.value),
      id: Math.floor(Math.random() * 10000000),
    };

    incomes.push(income);
    totalIncome = addArrayElements(incomes);
    money_plus.innerText = `$${totalIncome}`;

    list.innerHTML += `
      <li class="plus">
        ${text.value} <span>+${amount.value}</span><button class="delete-btn" onclick="deleteTransaction(${income.id}, false)">x</button>
      </li>
    `;
  }

  calculateBalance(totalIncome, totalExpense);
}

form.addEventListener('submit', addTransaction);
