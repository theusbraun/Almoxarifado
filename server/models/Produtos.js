const moment = require('moment')
const { query } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')
const session = require('express-session')


class Produto {

    criarProduto(produto, res) {

        const values = produto

        const sql = 'INSERT INTO a_produto SET ?'

        console.log(values)

        conexao.query(sql, values, (err) => {
            if (err) {
                console.log(err)
                res.json(err)
            } 
        })
    }

    criarGrupo(grupo, res) {

        const values = grupo

        const sql = 'INSERT INTO a_grupo set ?'

        console.log(sql)

        conexao.query(sql, values, (err) => {
            if (err) {
                console.log(err)
                res.json(err)
            } 
        })
    }
}



module.exports = new Produto