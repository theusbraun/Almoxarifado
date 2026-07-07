const moment = require('moment')
const { query } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')
const session = require('express-session')


class Cliente {

    criarProduto(cliente, res) {

        const values = cliente
        const sql = 'INSERT INTO u_cliente SET ?'

        console.log(values)

        conexao.query(sql, values, (err) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
        })
    }


}



module.exports = new Cliente