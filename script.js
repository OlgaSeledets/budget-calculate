'use strict'

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalTitle = document.querySelector('div.additional_income input.additional_title');
const additionalAmount = document.querySelector('div.additional_income input.additional_amount');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('div.income-items input.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('div.expenses-items input.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

expensesAmount.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/\d/) && key !== 'Backspace')
        event.preventDefault()
})

expensesTitle.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/[,а-яА-ЯёЁ\s]/) && key !== 'Backspace')
        event.preventDefault()
})

incomeAmount.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/\d/) && key !== 'Backspace')
        event.preventDefault()
})

incomeTitle.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/[,а-яА-ЯёЁ\s]/) && key !== 'Backspace')
        event.preventDefault()
})

salaryAmount.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/\d/) && key !== 'Backspace')
        event.preventDefault()
})

targetAmount.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/\d/) && key !== 'Backspace')
        event.preventDefault()
})

additionalAmount.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/\d/) && key !== 'Backspace')
        event.preventDefault()
})

additionalTitle.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/[,а-яА-ЯёЁ\s]/) && key !== 'Backspace')
        event.preventDefault()
})

additionalExpensesItem.addEventListener('keydown', function(event) {
    const key = event.key
    if (!key.match(/[,а-яА-ЯёЁ\s]/) && key !== 'Backspace')
        event.preventDefault()
})

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

const appData = {
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
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
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
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
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
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
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
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
       }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
        return (targetAmount.value / this.budgetMonth);
    }, 

    getStatusIncome: function() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay > 0 && this.budgetDay < 600) {
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
        return this.budgetMonth * periodSelect.value;
    }
};

start.addEventListener('click', appData.start.bind(appData));

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








