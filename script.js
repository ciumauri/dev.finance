const overlayModal = document.querySelector('.modal-overlay').classList
const Modal = {
  open() {
    //abrir modal
    overlayModal.add('active')
    //adicionar a class active ao modal
  },
  close() {
    //fechar Modal
    overlayModal.remove('active')
    //remover a class active do modal
  }
}

// Eu preciso criar o array de objetos transactions
// depois definir as propriedades, id, description, amount, date
// Eu preciso somar as entradas
// depois eu preciso somar as saidas e
// remover das entradas o valor das saidas
// assim eu terei o valor total
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
  },

  set(transactions) {
    localStorage.setItem(
      'dev.finances:transactions',
      JSON.stringify(transactions)
    )
  }
}

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    let income = 0
    // pegar todas as Transações
    Transaction.all.forEach(transaction => {
      // se maior que zero
      if (transaction.amount > 0) {
        // somar a uma variável e retorná-la
        income += transaction.amount
      }
    })
    return income
  },

  expenses() {
    let expense = 0
    // pegar todas as Transações
    Transaction.all.forEach(transaction => {
      // se menor que zero
      if (transaction.amount < 0) {
        // somar a uma variável e retorná-la
        expense += transaction.amount
      }
    })
    return expense
  },

  total() {
    // somar as entradas e saidas
    return Transaction.incomes() + Transaction.expenses()
    // e obter o total
  }
}

// Substituir os dados do HTML com os dados do JS
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `      
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" />
        </td>      
    `
    return html
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    )
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    )
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(
      Transaction.total()
    )
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, '')

    value = Number(value) / 100

    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return signal + value
  },

  formatAmount(value) {
    value = Number(value.replace(/\,\./g, '')) * 100

    return value
  },

  formatDate(date) {
    const splitteDate = date.split('-')
    return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}`
  }
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validatFields() {
    const { description, amount, date } = Form.getValues()

    if (description.trim() === '' || amount.trim === '' || date.trim === '') {
      throw new Error('Por favor, preencha todos os campos')
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = ''
    Form.amount.value = ''
    Form.date.value = ''
  },

  submit(event) {
    // impedir que seja enviado os dados pelo navegador por padrão
    event.preventDefault()
    // tratamento de erros
    try {
      // verificar se todas as informações foram preenchidas
      Form.validatFields()
      // formatar os dados para Salvar
      const transaction = Form.formatValues()
      // salvar
      Transaction.add(transaction)
      // apagar os dados do form
      Form.clearFields()
      // fechar moral
      Modal.close()
      // Atualizar Aplicação
      App.reload()
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()

    Storage.set(Transaction.all)
  },

  reload() {
    DOM.clearTransactions()
    App.init()
  }
}

App.init()
