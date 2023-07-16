var sql = ''

class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarUsuarios()
        this.criarGrupo()
        this.criarProduto()
    }

    criarUsuarios() {
        sql = 'CREATE TABLE IF NOT EXISTS u_usuarios (id int NOT NULL AUTO_INCREMENT,nome varchar(100) NOT NULL,data_nascimento date NOT NULL,cpf varchar(11) NOT NULL,email varchar(50) NOT NULL,senha varchar(255) DEFAULT NULL,PRIMARY KEY (id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } 
        })
    }
    
    criarGrupo() {
        sql = 'create table IF NOT EXISTS a_grupo ( id int not null auto_increment, descricao varchar(60) not null, primary key (id));'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } 
        })
    }

    criarProduto() {
        sql = 'create table IF NOT EXISTS a_produto ( id int not null auto_increment, descricao varchar(60) not null,descricao_detalhada varchar(500), volume int not null,id_grupo int,primary key (id),foreign key (id_grupo) references a_grupo(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } 
        })
    }
}

module.exports = new Tabelas