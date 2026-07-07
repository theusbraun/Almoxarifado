import React, { useState } from "react";
import axios from "axios";

import "./style.css";

axios.defaults.withCredentials = true;

const Grupo = () => {
    const [grupo, setGrupo] = useState({
        descricao: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setGrupo({
            ...grupo,
            [e.target.name]: e.target.value
        });
    };

    const limparFormulario = () => {
        setGrupo({
            descricao: ""
        });

        setErrorMessage("");
        setSuccessMessage("");
    };

    const submitGrupo = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await axios.post(
                "http://localhost:3001/criarGrupo",
                grupo
            );

            setSuccessMessage(
                response.data.message || "Grupo cadastrado com sucesso."
            );

            setGrupo({
                descricao: ""
            });

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erro ao conectar com o servidor.");
            }
        }
    };

    return (
        <div className="Page">
            <div className="PageHeader">
                <h1>Cadastro de Grupo</h1>

                <span>
                    Cadastre grupos para organizar os produtos do sistema.
                </span>
            </div>

            <div className="Card">
                <fieldset className="Fieldset">
                    <legend>Dados do Grupo</legend>

                    <div className="FormGrid">
                        <div className="FormItem">
                            <label>Descrição</label>

                            <input
                                type="text"
                                name="descricao"
                                className="Small"
                                placeholder="Informe a descrição do grupo"
                                value={grupo.descricao}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <div className="Actions">
                    <button
                        type="button"
                        className="SecondaryButton"
                        onClick={limparFormulario}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="Button"
                        onClick={submitGrupo}
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
    );
};

export default Grupo;