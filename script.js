'use strict'

const calculate = document.getElementById('start');
const btnPlus1 = document.getElementsByTagName('button')[0];
const btnPlus2 = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const possibleIncome = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salary = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpenses = document.querySelector('.additional_expenses-item');
const target = document.querySelector('.target-amount');
const range = document.querySelector('.period-select');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;
let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money))
};

//start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 2000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {

        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;

            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?');
            }
            while (isNumber(itemIncome) || itemIncome === '');

            let cashIncome;

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            }
            while (!isNumber(cashIncome));
            
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses;

        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        }
        while (isNumber(addExpenses) || addExpenses === '');
        
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ').map(value => {
            return value.charAt(0).toUpperCase() + value.substring(1);
        }).join(', ');
         
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            
            let itemExpenses;
            do {
                itemExpenses = prompt('Введите обязательную статью расходов');
            }
            while (isNumber(itemExpenses) || itemExpenses === '');

            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдётся?');
            }
            while (!isNumber(cashExpenses));

            appData.expenses[itemExpenses] = cashExpenses;

        }
    },
            
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
       }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
        return (appData.mission / appData.budgetMonth);
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
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            }
            while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },

    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();

// console.log('Наша программа включает в себя данные: ');

// for (let key in appData) {
//     console.log(key + ' ' + appData[key]);
// }

let expensesMonth = appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);

appData.getBudget();

if (appData.budgetDay < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
};

console.log(appData.addExpenses); 

appData.getInfoDeposit();

console.log(appData.getStatusIncome());




