const Usuario = require('../models/Usuarios')

module.exports = app => {

    app.post('/register', (req, res) => {

        const usuario = req.body;

        Usuario.adiciona(usuario, res);

    });

    app.post('/login', async (req, res) => {

        try {

            const usuario = await Usuario.login(req.body);

            if (!usuario) {
                return res.status(401).json({
                    message: "Usuário ou senha inválidos."
                });
            }

            req.session.user = usuario;

            return res.status(200).json({
                message: `Bora trabalhar!`,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({
                message: "Erro interno do servidor."
            });

        }

    });

    app.get('/login', (req, res) => {

        if (req.session.user) {
            return res.send({
                loggedIn: true,
                user: req.session.user
            });
        }
        return res.send({
            loggedIn: false
        });
    });

    
    app.post('/trocarSenha', (req, res) => {

        const usuario = req.body;

        Usuario.trocarSenha(usuario, res);

    });

    /*app.patch('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Usuario.altera(id, valores, res)
    })*/

    /*app.delete('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Usuario.deleta(id, res)
    })*/
}