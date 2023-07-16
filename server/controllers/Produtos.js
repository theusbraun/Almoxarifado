const Produto = require('../models/Produtos')

module.exports = app => {
    app.get('/produto', (req, res) => {

        Produto.escolasUsuario(req, res)
    
    })

    app.post('/criarProduto', (req, res) => {
        
        const produto = req.body
        console.log(produto)

        Produto.criarProduto(produto,res)

    })

    app.post('/criarGrupo', (req, res) => {
        
        const produto = req.body
        console.log(produto)

        Produto.criarGrupo(produto,res)

    })
}
