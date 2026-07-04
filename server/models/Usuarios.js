const conexao = require('../infraestrutura/conexao')

const bcrypt = require('bcrypt')
const saltRounds = 10

class Usuario {

    verificarCpf(usuario) {

      let cpfInvalido = false;
      const cpf = usuario.cpf;

      let soma = 0;
      let resto = 0;

      if (cpf === "00000000000" || cpf.length !== 11) {
          return true;
      }

      for (let i = 1; i <= 9; i++) {
          soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }

      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
          resto = 0;
      }

      if (resto !== parseInt(cpf.substring(9, 10))) {
          cpfInvalido = true;
      }

      soma = 0;

      for (let i = 1; i <= 10; i++) {
          soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }

      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
          resto = 0;
      }

      if (resto !== parseInt(cpf.substring(10, 11))) {
          cpfInvalido = true;
      }

      return cpfInvalido;
  }
      
    async cpfCadastrado(usuario) {

        return new Promise((resolve, reject) => {

            const sql = 'SELECT * FROM u_usuarios WHERE cpf = ?';

            conexao.query(sql, usuario.cpf, (erro, resultados) => {

                if (erro) {
                    return reject(erro);
                }

                resolve(resultados.length > 0);

            });

        });

    }
      
      async emailCadastrado(usuario) {
        return new Promise((resolve, reject) => {
          let email = usuario.email

          const sql = 'SELECT * FROM u_usuarios WHERE email = ?';
      
          conexao.query(sql, email, (erro, resultados) => {
            if (erro) {
              return reject(erro);
            } 

            resolve(resultados.length > 0);
          })
        });
      }
      
      async adiciona(usuario, res) {
        try {
          const cpfInvalido = this.verificarCpf(usuario);
          const isCpfCadastrado = await this.cpfCadastrado(usuario);
          const isEmailCadastrado = await this.emailCadastrado(usuario);
      
          if (!isCpfCadastrado && !cpfInvalido && !isEmailCadastrado) {
            const sql = 'INSERT INTO u_usuarios SET ?'
      
            bcrypt.hash(usuario.senha, saltRounds, (err, hash) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({
                      message: "Erro ao criptografar senha."
                  });
              }
              usuario.senha = hash
      
              conexao.query(sql, usuario, (erro) => {
                if (erro) {
                    return res.status(500).json(erro);
                }

                return res.status(201).json({message: "Usuário cadastrado com sucesso!"});
              })
            })
          } else {
            if (cpfInvalido) {
              return res.status(400).json({ message: 'CPF INVALIDO' })
            } else if (isCpfCadastrado) {
              return res.status(400).json({ message: 'CPF JÁ CADASTRADO' })
            } else {
              return res.status(400).json({ message: 'E-mail JÁ CADASTRADO' })
            }
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Erro no servidor' });
        }
      }

    async login(usuario) {

    const usuarioLogin = usuario.login;
    const senha = usuario.senha;

    const sql = Number.isInteger(usuarioLogin * 1)
        ? 'SELECT * FROM u_usuarios WHERE cpf = ?'
        : 'SELECT * FROM u_usuarios WHERE email = ?';

    return new Promise((resolve, reject) => {

        conexao.query(sql, usuarioLogin, (erro, resultados) => {

            if (erro) {
                return reject(erro);
            }

            if (resultados.length === 0) {
                return resolve(null);
            }

            bcrypt.compare(senha, resultados[0].senha, (erro, senhaCorreta) => {

                if (erro) {
                    return reject(erro);
                }

                if (!senhaCorreta) {
                    return resolve(null);
                }

                return resolve(resultados[0]);

            });

        });

    });

    }

    /* NECESSARIO CRIAR A TELA DE ALTERAR DADOS
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
    */

    /*Necessario criar troca de senha:
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
    */
}

module.exports = new Usuario