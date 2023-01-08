const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const expenses = [];
const incomes = [];
let totalExpense = 0, totalIncome = 0;

function addArrayElements(array) {
  return array.reduce((partialSum, acc) => partialSum + acc, 0);
}

function calculateBalance(totalIncome, totalExpense) {
  balance.innerText = `$${totalIncome + totalExpense}`;
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
    list.innerHTML += `
      <li class="minus">
        ${text.value} <span>${amount.value}</span><button class="delete-btn">x</button>
      </li>
    `;

    expenses.push(Number(amount.value));
    totalExpense = addArrayElements(expenses);
    money_minus.innerText = `$${totalExpense * -1}`;
  } else {
    list.innerHTML += `
      <li class="plus">
        ${text.value} <span>+${amount.value}</span><button class="delete-btn">x</button>
      </li>
    `;

    incomes.push(Number(amount.value));
    totalIncome = addArrayElements(incomes);
    money_plus.innerText = `$${totalIncome}`;
  }

  calculateBalance(totalIncome, totalExpense);

}

form.addEventListener('submit', addTransaction);
