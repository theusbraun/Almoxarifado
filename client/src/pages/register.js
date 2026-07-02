import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const Register = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const submitUser = () => {
    axios
      .post("http://localhost:3001/register", usuario)
      .then((response) => {
        console.log(response);

        // Limpa o formulário após o cadastro
        setUsuario({
          nome: "",
          data_nascimento: "",
          cpf: "",
          email: "",
          senha: "",
        });

        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Erro ao conectar com o servidor.");
        }
      });
  };

  return (
    <div className="Formulario">
      <h1>Usuário</h1>

      <div>
        <input
          type="text"
          name="nome"
          className="Small"
          placeholder="Nome"
          value={usuario.nome}
          onChange={handleChange}
        />

        <input
          type="date"
          name="data_nascimento"
          className="Small"
          value={usuario.data_nascimento}
          onChange={handleChange}
        />

        <input
          type="text"
          name="cpf"
          className="Small"
          placeholder="CPF"
          maxLength="11"
          value={usuario.cpf}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          className="Small"
          placeholder="E-mail"
          value={usuario.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="senha"
          className="Small"
          placeholder="Senha"
          value={usuario.senha}
          onChange={handleChange}
        />

        <button onClick={submitUser} className="Button">
          Salvar
        </button>

        <br />

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;