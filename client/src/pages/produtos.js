import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"; // Importa o componente Redirect
import './style.css';
import Axios from 'axios';

const Produto = () => {
  const [authenticated, setAuthenticated] = useState(false); // Estado para verificar se o usuário está autenticado
  const [descricaoReg, setdescricaoReg] = useState('');
  const [descricaoDetalhadaReg, setdescricaoDetalhadaReg] = useState('');
  const [volumeReg, setvolumeReg] = useState('');
  const [idGrupoReg, setidGrupoReg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [grupoOptions, setGrupoOptions] = useState([]);

  useEffect(() => {
    // Simulação de uma função de verificação de autenticação assíncrona
    const checkAuthentication = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/checkAuthentication");
        if (response.data.authenticated) {
          setAuthenticated(true); // Define o estado de autenticação como verdadeiro se o usuário estiver autenticado
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    checkAuthentication(); // Chama a função de verificação de autenticação ao montar o componente
  }, []);

  useEffect(() => {
    // Função para fazer a busca dos grupos no banco de dados
    const searchGrupos = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/buscarGrupos?descricao=${idGrupoReg}`);
        setGrupoOptions(response.data);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    };

    if (idGrupoReg.length >= 3) {
      searchGrupos();
    }
  }, [idGrupoReg]);

  const handleGrupoChange = (e) => {
    const selectedGroupId = e.target.value;
    setidGrupoReg(selectedGroupId);
  };

  const submitUser = () => {
    Axios.post("http://localhost:3001/criarProduto", {
      descricao: descricaoReg,
      descricao_detalhada: descricaoDetalhadaReg,
      volume: volumeReg,
      id_grupo: idGrupoReg,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    });
  }

  // Verifica se o usuário está autenticado, se não, redireciona para a página de login
  if (!authenticated) {
    return <Redirect to="/register" />;
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
          value={idGrupoReg}
          onChange={handleGrupoChange}
        />

        <ul>
          {grupoOptions.map((grupo) => (
            <li key={grupo.id}>
              <button onClick={() => handleGrupoChange({ target: { value: grupo.id } })}>
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
};

export default Produto;