import React, { useState } from "react";
import './style.css';
import Axios from 'axios';


const Register = () => {
  const [descricaoReg, setdescricaoReg] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitUser = () => {
    Axios.post("http://localhost:3001/criarGrupo", {
      descricao: descricaoReg,
    }).then((response) => {
      console.log(response);
      // Lógica para lidar com a resposta de sucesso no cadastro de produto
    }).catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    });
  }

  return (
    <div className="Formulario">
      <h1>novo grupo</h1>

      <div>
        <input type="text" class="Small" placeholder="Descrição"
          onChange={(e) => {
            setdescricaoReg(e.target.value);
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