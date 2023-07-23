import React, { useState, useEffect } from "react";
import './style.css';
import Axios from 'axios';

const Register = () => {
  const [descricaoReg, setdescricaoReg] = useState('');
  const [descricaoDetalhadaReg, setdescricaoDetalhadaReg] = useState('');
  const [volumeReg, setvolumeReg] = useState('');
  const [idGrupoReg, setidGrupoReg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [grupoOptions, setGrupoOptions] = useState([]); // Para armazenar as opções de grupo vindas do backend

  useEffect(() => {
    // Função para fazer a busca dos grupos no banco de dados
    const searchGrupos = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/buscarGrupos?descricao=${idGrupoReg}`);
        setGrupoOptions(response.data); // Armazena as opções de grupo vindas do backend
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    };

    // Realiza a busca apenas se a descrição do grupo tiver pelo menos 3 caracteres (pode ajustar esse valor)
    if (idGrupoReg.length >= 3) {
      searchGrupos();
    }
  }, [idGrupoReg]);

  const handleGrupoChange = (e) => {
    setidGrupoReg(e.target.value);
  };

  const submitUser = () => {
    Axios.post("http://localhost:3001/criarProduto", {
      descricao: descricaoReg,
      descricao_detalhada: descricaoDetalhadaReg,
      volume: volumeReg,
      id_grupo: idGrupoReg,
    }).then((response) => {
      console.log(response);
      // Lógica para lidar com a resposta de sucesso no cadastro do produto
    }).catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    });
  }

  return (
    <div className="Formulario">
      <h1>Novo Produto</h1>

      <div>
        <input type="text" placeholder="Descrição" className="Small"
          onChange={(e) => {
            setdescricaoReg(e.target.value);
          }} />
        <textarea type="text" placeholder="Descrição Detalhada" className="Big"
          onChange={(e) => {
            setdescricaoDetalhadaReg(e.target.value)
          }} />
        <input type="number" placeholder="Volume" className="Small"
          onChange={(e) => {
            setvolumeReg(e.target.value)
          }} />
        <input type="text" name="grupo" rows='2' placeholder="Grupo" className="Small"
          value={idGrupoReg} // Exibe o valor atual do campo
          onChange={handleGrupoChange} // Usa a função de alteração personalizada
        />

        {/* Mostra as opções de grupo disponíveis */}
        <ul>
          {grupoOptions.map((grupo) => (
            <li key={grupo.id}>
              <button onClick={() => setidGrupoReg(grupo.descricao)}>
                {grupo.descricao}
              </button>
            </li>
          ))}
        </ul>

        <button onClick={submitUser} className="Button">
          Salvar
        </button>
        <br />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Register;