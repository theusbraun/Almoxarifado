const app = require('./config/customExpress')();

const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar ao banco:');
        console.log(erro);
        return;
    }

    console.log('Banco conectado!');
    Tabelas.init(conexao);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});