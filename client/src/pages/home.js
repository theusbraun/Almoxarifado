import React, { useEffect, useState } from "react"
import './style.css'                                    
import Axios from 'axios'

const Home = () => {
  const [loginReg, setLogin] = useState('')
  const [senhaReg, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  Axios.defaults.withCredentials = true

  const submitLogin = () => {
    Axios.post("http://localhost:3001/login", {
      login: loginReg,
      senha: senhaReg
    })
      .then((response) => {
        console.log(response);
        // Lógica para lidar com a resposta de sucesso do login
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  return (
    <div className="Formulario">
      <h1>Login</h1>
      <input type="text" class="Small" placeholder="Cpf ou email"
        onChange={(e) => {
          setLogin(e.target.value);
        }} />
      <input type="password" class="Small" placeholder="Senha"
        onChange={(e) => {
          setSenha(e.target.value)
        }} />
       <button onClick={submitLogin} className="Button">Login</button>
    <br />
    {errorMessage && <p>{errorMessage}</p>}
  </div>
  );
}

export default Home;