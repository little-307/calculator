class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // AC allClear function
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // Delete function
    delete() {
        // Delete/Remove last digit from string
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // appendNumber function
    appendNumber(number) {
        // check if decimal point has already been used. if currentOperand contains a '.'
        if (number === '.' && this.currentOperand.includes('.')) return // if '.' is present button won't work
        this.currentOperand = this.currentOperand.toString() + number.toString() // keeps appending number to end of string
    }

    // Choose Operation what happens when '/, x, +, - ' are selected
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        console.log(operation)

    }

    // Compute function computes the values entered
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    // update values inside the display
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.currentOperand}`
        }
        console.log(this.previousOperandTextElement, this.currentOperand)
    }
}


// Query data attributes from index.html buttons
const numberButtons = document.querySelectorAll('[data-number]') // querySelectorAll applies to All elements containing data attributes = 'data-number'
const operationButtons = document.querySelectorAll('[data-operation]') // querySelectorAll applies to All elements containing data attributes = 'data-operation'
const equalsButton = document.querySelector('[data-equals]') // querySelector applies to a Single element containing data attribute = 'data-equals'
const deleteButton = document.querySelector('[data-delete]') // querySelector applies to a Single element containing data attribute = 'data-delete'
const allClearButton = document.querySelector('[data-all-clear]') // querySelector applies to a Single element containing data attribute = 'data-all-clear'
const previousOperandTextElement = document.querySelector('[data-previous-operand]') // querySelector applies to a Single element containing data attribute = 'data-previous-operand'
const currentOperandTextElement = document.querySelector('[data-current-operand]') // querySelector applies to a Single element containing data attribute = 'data-current-operand'

// Create calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    //EventListener - what happens when clicked
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText) // append number clicked to string currentOperand calling the text inside the button element
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText) // operation clicked to string currentOperand calling the text inside the button element
        calculator.updateDisplay()

        console.log()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute(button.innerText)
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})