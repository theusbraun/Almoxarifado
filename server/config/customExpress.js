const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const consign = require('consign');

module.exports = () => {

  const app = express();

  // Configurações de middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }));

  // Configuração de sessão
  app.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  app.get('/checkAuthentication', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ authenticated: true });
    }

    return res.status(401).json({ authenticated: false });
});

  // Verificação de autenticação
app.use((req, res, next) => {

    const rotasPublicas = [
      '/login',
      '/register',
      '/checkAuthentication'
    ];

    if (rotasPublicas.includes(req.path)) {
        return next();
    }

    if (!req.session.user) {
        return res.status(401).json({
            authenticated: false,
            message: 'Usuário não autenticado.'
        });
    }

    next();
});

  // Inclusão dos controllers
  consign()
    .include('controllers')
    .into(app);

  return app;
};
