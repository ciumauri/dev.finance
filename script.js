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
    amount: -20000,
    date: '23/01/2021'
  }
]

// Eu preciso somar as entradas
// depois eu preciso somar as saidas e
// remover das entradas o valor das saidas
// assim eu terei o valor total

const Transaction = {
  incomes() {
    // somar as entradas aqui
  }
}

const Transaction = {
  expenses() {
    // somar as saidas aqui
  }
}

// Substituir os dados do HTML com os dados do JS
const DOM = {
  innerHTMLTransaction() {
    const html = `
      <tr>
        <td class="description">Luz</td>
        <td class="expense">- R$ 500,00</td>
        <td class="date">23/09/2021</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação" />
        </td>
      </tr>
    `
  }
}
