const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const consign = require('consign');

module.exports = () => {

    const app = express();

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));

    // Sessão
    app.use(session({
        secret: "suaChaveSecreta",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true
        }
    }));

    // Verifica autenticação
    app.get("/checkAuthentication", (req, res) => {

        if (!req.session.user) {
            return res.status(401).json({
                authenticated: false
            });
        }

        return res.status(200).json({
            authenticated: true,
            user: {
                id: req.session.user.id,
                nome: req.session.user.nome,
                email: req.session.user.email
            }
        });

    });

    // Logout
    app.post("/logout", (req, res) => {

        req.session.destroy((erro) => {

            if (erro) {
                return res.status(500).json({
                    message: "Erro ao encerrar sessão."
                });
            }

            return res.status(200).json({
                message: "Logout realizado com sucesso."
            });

        });

    });

    // Rotas públicas
    app.use((req, res, next) => {

        const rotasPublicas = [
            "/login",
            "/register",
            "/checkAuthentication",
            "/logout"
        ];

        if (rotasPublicas.includes(req.path)) {
            return next();
        }

        if (!req.session.user) {

            return res.status(401).json({
                authenticated: false,
                message: "Usuário não autenticado."
            });

        }

        next();

    });

    // Controllers
    consign()
        .include("controllers")
        .into(app);

    return app;

};