const kalkulator = {
    displayNumber : '0',
    operator : null,
    firstNumber : null,
    isWaitForSecondNumber : false
}

function updateDisplay() {
    document.querySelector('#displayNumber').innerText = kalkulator.displayNumber;
}

// fungsi untuk menghapus angka
function clearCalculator() {
    kalkulator.displayNumber = '0';
    kalkulator.operator = null;
    kalkulator.firstNumber = null;
    kalkulator.isWaitForSecondNumber = false;
}

function inputDigit(digit) {
    if (kalkulator.displayNumber === '0') {
        kalkulator.displayNumber = digit;
    } 

    else {
        kalkulator.displayNumber += digit;
    }
}

// memanggil elemen button - class button
const button = document.querySelectorAll('.button');

for (const btn of button) {
    btn.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}

// fungsi tanda (+/-)
function inversNumber() {
    if (kalkulator.displayNumber === '0') {
        return;
    }

    kalkulator.displayNumber = kalkulator.displayNumber * -1;
}

// fungsi tanda (+) & (-)
function handleOperator(operator) {
    if(!kalkulator.isWaitForSecondNumber) {
        kalkulator.operator = operator;
        kalkulator.isWaitForSecondNumber = true;
        kalkulator.firstNumber = kalkulator.displayNumber;

        kalkulator.displayNumber = '0';
    }

    else {
        alert('Operator sudah ditentukan');
    }
}

// fungsi tanda (=)
function performCalculation() {
    if (kalkulator.firstNumber == null || kalkulator.operator == null) {
        alert('Anda belum menetapkan angka');
        return;
    }

    let result = 0;
    if (kalkulator.operator === '+') {
        result = parseInt(kalkulator.firstNumber) + parseInt(kalkulator.displayNumber);
    } else {
        result = parseInt(kalkulator.firstNumber) - parseInt(kalkulator.displayNumber);
    }

    kalkulator.displayNumber = result;
}

// memanggil elemen button yg class negative, operator, equals
const negative = document.querySelector('.negative');
const operator = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');

negative.addEventListener('click', function(event) {
    let target = event.target;
    
    if (target.classList.contains('.negative')) {
        inversNumber();
        updateDisplay();
        return;
    }

    inputDigit(target.innerText);
    updateDisplay();    
});

for (const operate of operator) {
    operate.addEventListener('click', function(event) {
        const target = event.target;
        
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }
    
        inputDigit(target.innerText);
        updateDisplay();
    });
}
    
equals.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('equals')) {
        performCalculation();
        updateDisplay();
        return;
    }
   
    inputDigit(target.innerText);
    updateDisplay();
});

