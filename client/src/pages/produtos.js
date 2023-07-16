import React, { useState } from "react";
import './style.css';
import Axios from 'axios';


const Register = () => {
  const [descricaoReg, setdescricaoReg] = useState('')
  const [descricaoDetalhadaReg, setdescricaoDetalhadaReg] = useState('')
  const [volumeReg, setvolumeReg] = useState('')
  const [idGrupoReg, setidGrupoReg] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitUser = () => {
    Axios.post("http://localhost:3001/criarProduto", {
      descricao: descricaoReg,
      descricao_detalhada: descricaoDetalhadaReg,
      volume: volumeReg,
      id_grupo: idGrupoReg,
    }).then((response) => {
      console.log(response);
      // Lógica para lidar com a resposta de sucesso do login
    }).catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    });
  }

  return (
    <div className="Formulario">
      <h1>novo produto</h1>

      <div>
        <input type="text" placeholder="Descrição" class="Small"
          onChange={(e) => {
            setdescricaoReg(e.target.value);
          }} />
        <input type="text" placeholder="Descrição Detalhada" class="Big"
          onChange={(e) => {
            setdescricaoDetalhadaReg(e.target.value)
          }} />
        <input type="number" placeholder="Volume" class="Small"
          onChange={(e) => {
            setvolumeReg(e.target.value)
          }} />
        <input type="number" name="grupo" placeholder="Grupo" class="Small"
          onChange={(e) => {
            setidGrupoReg(e.target.value)
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