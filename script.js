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

const checkNum = (event) => {
    const key = event.key
    if (!key.match(/\d/) && key !== 'Backspace') {
        event.preventDefault()
    }
}

const checkStr = (event) => {
    const key = event.key
    if (!key.match(/[,а-яА-ЯёЁ\s]/) && key !== 'Backspace') {
        event.preventDefault()
    }
}

expensesAmount.addEventListener('keydown', checkNum); // Событие keydown предоставляет код, указывающий, какая клавиша нажата, в то время как нажатие клавиши указывает, какой символ был введен. 
expensesTitle.addEventListener('keydown', checkStr);
incomeAmount.addEventListener('keydown', checkNum);
incomeTitle.addEventListener('keydown', checkStr);
salaryAmount.addEventListener('keydown', checkNum);
targetAmount.addEventListener('keydown', checkNum);
//additionalIncomeItem.addEventListener('keydown', checkStr);
additionalExpensesItem.addEventListener('keydown', checkStr);

let allDisabled = document.querySelectorAll('input');
allDisabled.forEach(item => {
    item.disabled = false;
})

const blocked = () => {
    allDisabled.forEach(item => {
        item.disabled = true;
    })
}

const reset = () => {
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(item => {
        item.value = '';
    })
    start.style.display = 'block';
    cancel.style.display = 'none';
    allDisabled.forEach(item => {
        item.disabled = false;
    })
}

const cancelBtn = () => {
    start.style.display = 'none';
    cancel.style.display = 'block';
    cancel.addEventListener('click', reset);
}

const AppData = function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.start = function() {

    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    const _this = this;
    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = _this.calcPeriod();
    });

    appData.showResult();
    blocked();
    cancelBtn();
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.addExpensesBlock = function() {
    let expensesItemClone = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(expensesItemClone, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    expensesItemClone.childNodes.forEach(child => {
        child.value = '';
    });

    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    cloneIncomeItem.childNodes.forEach(child => {
        child.value = '';
    });

    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    })
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (item.value !== '') {
            _this.addIncome.push(itemValue);
        }
    })
};
      
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
   }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    return (targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay > 0 && this.budgetDay < 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function(checked) {
    if (checked) {
        this.percentDeposit = prompt('Какой годовой процент?', "10");
        this.moneyDeposit = prompt('Какая сумма заложена?', 100000);
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventsListeners = function () {
    start.addEventListener('click', appData.start.bind(appData), blocked);

    expensesPlus.addEventListener('click', appData.addExpensesBlock);

    incomePlus.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('input', function() {
        periodAmount.textContent = periodSelect.value;
    });

    depositCheck.addEventListener('change', (event) => {
        const checked = event.currentTarget.checked;
        appData.getInfoDeposit(checked);
    });
};

const appData = new AppData();

console.log(appData);

start.addEventListener('click', appData.start.bind(appData), blocked);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

depositCheck.addEventListener('change', (event) => {
    const checked = event.currentTarget.checked;
    appData.getInfoDeposit(checked);
})









