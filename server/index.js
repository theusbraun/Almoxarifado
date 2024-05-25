// No arquivo server.js (ou onde você configurou o servidor)
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'suaChaveSecreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Dependendo do ambiente, pode ser necessário mudar para true
}));

// Rota para verificar a autenticação do usuário
app.get('/checkAuthentication', (req, res) => {
  // Verifica se existe um usuário na sessão
  if (req.session.user) {
    res.status(200).json({ authenticated: true }); // Se houver, retorna que está autenticado
  } else {
    res.status(401).json({ authenticated: false }); // Caso contrário, retorna que não está autenticado
  }
});

// Resto da configuração do servidor...

// Porta que o servidor irá escutar
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));