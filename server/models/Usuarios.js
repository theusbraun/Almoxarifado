const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

const bcrypt = require('bcrypt')
const session = require('express-session')
const saltRounds = 10
var cpfInvalido = false

class Usuario {

    verificarCpf(usuario, res) {
        let cpf = usuario.cpf

        let Soma = 0
        let Resto = 0
        let i = 0

        if (cpf == "00000000000" || cpf.length != 11) {
            cpfInvalido = true
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10))) {
            cpfInvalido = true
        }

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11))) {
            cpfInvalido = true
        }
    }
    
    async cpfCadastrado(usuario) {
        return new Promise((resolve, reject) => {
          if (cpfInvalido == false) {
            let cpf = usuario.cpf
            let sql = 'select * from u_usuarios where cpf = ?'
      
            conexao.query(sql, cpf, (erro, resultados) => {
              if (erro) {
                reject(erro);
              } else {
                resolve(resultados.length > 0);
              }
            })
          } else {
            resolve(false);
          }
        });
      }
      
      async emailCadastrado(usuario) {
        return new Promise((resolve, reject) => {
          let email = usuario.email
          console.log(email)
          let emailSql = 'select * from u_usuarios where email = ?'
      
          conexao.query(emailSql, email, (erro, resultados) => {
            if (erro) {
              reject(erro);
            } else {
              resolve(resultados.length > 0);
            }
          })
        });
      }
      
      async adiciona(usuario, res) {
        try {
          await this.verificarCpf(usuario);
          const isCpfCadastrado = await this.cpfCadastrado(usuario);
          const isEmailCadastrado = await this.emailCadastrado(usuario);
      
          console.log(isCpfCadastrado, isEmailCadastrado, cpfInvalido)
          if (!isCpfCadastrado && !cpfInvalido && !isEmailCadastrado) {
            let sql = 'INSERT INTO u_usuarios SET ?'
      
            bcrypt.hash(usuario.senha, saltRounds, (err, hash) => {
              if (err) {
                console.log(err)
                throw new Error('Erro ao gerar hash de senha');
              }
              usuario.senha = hash
      
              conexao.query(sql, usuario, (erro) => {
                if (erro) {
                  res.json(erro)
                } else {
                  res.json(usuario)
                }
              })
            })
          } else {
            if (cpfInvalido) {
              res.status(400).json({ message: 'CPF INVALIDO' })
            } else if (isCpfCadastrado) {
              res.status(400).json({ message: 'CPF JÁ CADASTRADO' })
            } else {
              res.status(400).json({ message: 'E-mail JÁ CADASTRADO' })
            }
          }
          cpfInvalido = false
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro no servidor' });
        }
      }

    Login(login, res) {
        const user = login.login
        const pass = login.senha
        let sql = ''

        if (Number.isInteger(user * 1)) {
          sql = `SELECT * FROM u_usuarios WHERE cpf= ?`;
      } else {
          sql = `SELECT * FROM u_usuarios WHERE email= ?`;
      }      

        conexao.query(sql, user, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            }


            if (resultados.length > 0) {
                bcrypt.compare(pass, resultados[0].senha, (error, response) => {
                    if (response) {
                        session.user = resultados[0]
                        res.send({ message: session.user})
                    }
                    else { 
                      res.status(401).json({ message: "Combinação inválida" })
                    }
                })
            } 
            else {
              res.status(401).json({ message: "Usuário não identificado"})
            }
        })

    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        let sql = 'UPDATE u_usuarios set ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }

    deleta(id, res) {
        let sql = 'DELETE FROM u_usuarios where id =?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }

    trocarSenha(id, senha, res) {
        let sql = 'update u_usuarios set ? where id=?'

        bcrypt.hash(senha, saltRounds, (err, hash) => {
            if (err) {
                console.log(err)
            }
            senha = hash

            conexao.query(sql,[senha, id], (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                }
                else {
                    res.send({ message: "Troca realizada" })
                }
            } )
        })

        
    }
}

module.exports = new Usuario