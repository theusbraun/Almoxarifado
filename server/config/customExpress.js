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

  //Verificação de autenticação
  app.use((req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login'); // Redireciona para a página de login
    }
    next();
  });

  // Inclusão dos controllers
  consign()
    .include('controllers')
    .into(app);

  return app;
};
