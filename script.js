'use strict'

const start = document.getElementById('start');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {

        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcPeriod();
        });

        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');

        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItem.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },
            
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
       }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
        return (targetAmount.value / appData.budgetMonth);
    }, 

    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    },

    getInfoDeposit: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', "10");
            appData.moneyDeposit = prompt('Какая сумма заложена?', 100000);
        }
    },

    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};

start.addEventListener('click', appData.start)

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

// if (appData.budgetDay < 0) {
//     console.log('Цель не будет достигнута');
// } else {
//     console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
// };








