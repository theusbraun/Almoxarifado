import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import "./style.css";

axios.defaults.withCredentials = true;

const Produto = () => {

    const [produto, setProduto] = useState({
        descricao: "",
        descricao_detalhada: "",
        volume: "",
        id_grupo: ""
    });

    const [grupoPesquisa, setGrupoPesquisa] = useState("");
    const [grupoSelecionado, setGrupoSelecionado] = useState(null);
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
                    `http://localhost:3001/buscarGrupos?descricao=${grupoPesquisa}`
                );

                setGrupoOptions(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        if (grupoPesquisa.length >= 3) {
            buscarGrupos();
        } else {
            setGrupoOptions([]);
        }

    }, [grupoPesquisa]);

    const grupoSelect = grupoOptions.map((grupo) => ({
        value: grupo.id,
        label: grupo.descricao
    }));

    const selectStyles = {

        control: (base, state) => ({
            ...base,
            minHeight: 48,
            borderRadius: 10,
            borderColor: state.isFocused ? "#2E73FF" : "#D8DCE5",
            boxShadow: state.isFocused
                ? "0 0 0 4px rgba(46,115,255,.12)"
                : "none",
            "&:hover": {
                borderColor: "#2E73FF"
            }
        }),

        menu: (base) => ({
            ...base,
            zIndex: 9999
        })

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

                setGrupoPesquisa("");
                setGrupoSelecionado(null);
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

        <div className="Page">

            <div className="PageHeader">

                <h1>Novo Produto</h1>
                <span>Cadastre um novo produto no sistema.</span>

            </div>

            <div className="Card">

                <div className="FormGrid">

                    <div className="FormItem">

                        <label>Descrição</label>

                        <input
                            type="text"
                            name="descricao"
                            className="Small"
                            placeholder="Descrição"
                            value={produto.descricao}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="FormItem">

                        <label>Volume</label>

                        <input
                            type="number"
                            name="volume"
                            className="Small"
                            placeholder="Volume"
                            value={produto.volume}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="FormItem">

                        <label>Grupo</label>

                        <Select
                            styles={selectStyles}
                            placeholder="Digite para pesquisar..."
                            options={grupoSelect}
                            value={grupoSelecionado}
                            noOptionsMessage={() => "Nenhum grupo encontrado"}

                            onInputChange={(value) => {
                                setGrupoPesquisa(value);
                            }}

                            onChange={(option) => {

                                setGrupoSelecionado(option);

                                setProduto({
                                    ...produto,
                                    id_grupo: option.value
                                });

                            }}

                        />

                    </div>

                    <div className="FormItem FullWidth">

                        <label>Descrição detalhada</label>

                        <textarea
                            name="descricao_detalhada"
                            className="Big"
                            placeholder="Descrição detalhada do produto"
                            value={produto.descricao_detalhada}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="Actions">

                        <button
                            type="button"
                            className="SecondaryButton"
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="Button"
                            onClick={submitProduto}
                        >
                            Salvar
                        </button>

                    </div>

                    {errorMessage && (
                        <p className="ErrorMessage">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className="SuccessMessage">
                            {successMessage}
                        </p>
                    )}

                </div>

            </div>

        </div>

    );
};

export default Produto;