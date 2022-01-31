const axios = require('axios')
const { SHEETS_API } = require('./config')

const sheetsAPI = async (id, produtos, endereco) => {
    await axios.post(SHEETS_API, {
            id: id,
            produtos: produtos,
            endereco: endereco,
            data: Date().toString()});
}

module.exports = sheetsAPI