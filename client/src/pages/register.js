import React, { useState } from "react";
import './style.css';
import Axios from 'axios';


const Register = () => {
  const [nomeReg, setNomeReg] = useState('')
  const [dateReg, setDateReg] = useState('')
  const [cpfReg, setCpfReg] = useState('')
  const [emailReg, setEmailReg] = useState('')
  const [senhaReg, setSenhaReg] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitUser = () => {
    Axios.post("http://localhost:3001/register", {
      nome: nomeReg,
      data_nascimento: dateReg,
      cpf: cpfReg,
      email: emailReg,
      senha: senhaReg
    }).then((response) => {
      console.log(response);
      // Lógica para lidar com a resposta de sucesso no cadastro de usuário
    }).catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    });
  }

  return (
    <div className="Formulario">
      <h1>usuario</h1>

      <div>
        <input type="text" class="Small" placeholder="Nome"
          onChange={(e) => {
            setNomeReg(e.target.value);
          }} />
        <input type="date" class="Small" placeholder="Data Nascimento"
          onChange={(e) => {
            setDateReg(e.target.value)
          }} />
        <input type="text" class="Small" placeholder="CPF" maxLength='11'
          onChange={(e) => {
            setCpfReg(e.target.value)
          }} />
        <input type="email" class="Small" placeholder="Email"
          onChange={(e) => {
            setEmailReg(e.target.value)
          }} />
        <input type="password" class="Small" placeholder="Senha"
          onChange={(e) => {
            setSenhaReg(e.target.value)
          }} />
        <button onClick={submitUser} class="Button">
          Salvar
        </button> 
        <br />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>

  );

}


export default Register;