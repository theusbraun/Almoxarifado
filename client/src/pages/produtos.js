import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";

axios.defaults.withCredentials = true;

const Produto = () => {
    const [produto, setProduto] = useState({
        descricao: "",
        descricao_detalhada: "",
        volume: "",
        id_grupo: ""
    });

    const [grupoOptions, setGrupoOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {

        const buscarGrupos = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:3001/buscarGrupos?descricao=${produto.id_grupo}`
                );

                setGrupoOptions(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        if (produto.id_grupo.length >= 3) {
            buscarGrupos();
        }

    }, [produto.id_grupo]);

    const selecionarGrupo = (grupo) => {

        setProduto({
            ...produto,
            id_grupo: grupo.id
        });

        setGrupoOptions([]);

    };

    const submitProduto = () => {

        setErrorMessage("");
        setSuccessMessage("");

        axios
            .post("http://localhost:3001/criarProduto", produto)
            .then((response) => {

                setSuccessMessage(response.data.message);

                setProduto({
                    descricao: "",
                    descricao_detalhada: "",
                    volume: "",
                    id_grupo: ""
                });

                setGrupoOptions([]);

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

            <h1>Novo Produto</h1>

            <input
                type="text"
                name="descricao"
                className="Small"
                placeholder="Descrição"
                value={produto.descricao}
                onChange={handleChange}
            />

            <textarea
                name="descricao_detalhada"
                className="Big"
                placeholder="Descrição detalhada"
                value={produto.descricao_detalhada}
                onChange={handleChange}
            />

            <input
                type="number"
                name="volume"
                className="Small"
                placeholder="Volume"
                value={produto.volume}
                onChange={handleChange}
            />

            <input
                type="text"
                name="id_grupo"
                className="Small"
                placeholder="Grupo"
                value={produto.id_grupo}
                onChange={handleChange}
            />

            {grupoOptions.length > 0 && (
                <ul className="ListaGrupos">
                    {grupoOptions.map((grupo) => (
                        <li key={grupo.id}>
                            <button
                                type="button"
                                onClick={() => selecionarGrupo(grupo)}
                            >
                                {grupo.descricao}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button
                className="Button"
                onClick={submitProduto}
            >
                Salvar
            </button>

            <br />

            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}

        </div>
    );
};

export default Produto;