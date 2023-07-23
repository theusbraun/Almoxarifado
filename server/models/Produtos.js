const moment = require('moment')
const { query } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')
const session = require('express-session')


class Produto {

    buscarGrupos(descricao, res) {
        const searchTerm = `%${descricao}%`; // Adiciona os '%' para fazer uma pesquisa parcial
      
        const sql = "SELECT * FROM a_grupo WHERE UPPER(descricao) LIKE ?";
        const values = [searchTerm.toUpperCase()]; // Converte o termo de pesquisa para maiúsculas
      
        // Executa a consulta no banco de dados para obter os grupos correspondentes
        conexao.query(sql, values, (error, resultados) => {
          if (error) {
            console.error("Erro ao buscar grupos:", error);
            return res.status(500).json({ message: "Erro ao buscar grupos" });
          }
      
          // Verifica se há resultados e retorna a lista de grupos como resposta
          if (resultados.length > 0) {
            res.send(resultados);
          } else {
            res.send([]); // Retorna um array vazio se não houver resultados
          }
        });
      }
      

    criarProduto(produto, res) {

        const values = [produto.toUpperCase()]; // Converte o termo de pesquisa para maiúsculas

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