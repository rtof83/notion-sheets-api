// import axios from 'axios'
const axios = require('axios')

const sheetsAPI = async (id, produtos, endereco) => {
    await axios.post(
        process.env.SHEETS_API, {
            id: id,
            produtos: produtos,
            endereco: endereco,
            data: Date().toString()});
}

// export default sheetsAPI
module.exports = sheetsAPI