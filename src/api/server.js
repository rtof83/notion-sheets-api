require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sheetsAPI = require('./sheets')
const sendEmail = require('./email')
const { PORT } = require('./config')

const { createCompras,
        getCompras,
        getProdutos,
      } = require('./notion');

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  const compras = await getCompras()
  res.send(compras)
})

app.get('/produtos', async (req, res) => {
  const produtos = await getProdutos()
  res.send(produtos)
})

app.get('/sendemail/:produtos', (req, res) => {
  const produtos = req.params.produtos
  sendEmail(produtos)
  res.send('email enviado')
})

app.post('/', async (req, res) => {
  const { id, produtos, endereco, listaNomeProd } = req.body;

  await createCompras({
    id,
    produtos,
    endereco
  })
  
  // enviar requisição para google sheets
  await sheetsAPI(id, listaNomeProd.toString(), endereco)
  
  res.redirect('/')
})

app.listen(PORT)