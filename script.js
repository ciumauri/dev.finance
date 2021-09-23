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

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Criação Website',
    amount: 500000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20013,
    date: '23/01/2021'
  },
  {
    id: 4,
    description: 'App',
    amount: 200000,
    date: '23/01/2021'
  }
]

// Eu preciso somar as entradas
// depois eu preciso somar as saidas e
// remover das entradas o valor das saidas
// assim eu terei o valor total

const Transaction = {
  incomes() {
    let income = 0
    // pegar todas as Transações
    transactions.forEach(transaction => {
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
    transactions.forEach(transaction => {
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `      
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação" />
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
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()
