const Cliente = require('../models/Clientes')

module.exports = app => {

    app.post('/criarCliente', (req, res) => {

        const cliente = req.body
        console.log(cliente)

        Cliente.criarProduto(cliente, res)

    })

}
