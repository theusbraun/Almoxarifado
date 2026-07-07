import React, { useState } from "react";
import axios from "axios";

import "./style.css";

axios.defaults.withCredentials = true;

const TipoImposto = () => {
    const [imposto, setImposto] = useState({
        descricao: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setImposto({
            ...imposto,
            [e.target.name]: e.target.value
        });
    };

    const limparFormulario = () => {
        setImposto({
            descricao: ""
        });

        setErrorMessage("");
        setSuccessMessage("");
    };

    const submitImposto = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await axios.post(
                "http://localhost:3001/criarImposto",
                imposto
            );

            setSuccessMessage(
                response.data.message || "Tipo de imposto cadastrado com sucesso."
            );

            setImposto({
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
                <h1>Cadastro de Tipo de Imposto</h1>

                <span>
                    Cadastre os tipos de impostos utilizados no sistema.
                </span>
            </div>

            <div className="Card">
                <fieldset className="Fieldset">
                    <legend>Dados do Tipo de Imposto</legend>

                    <div className="FormGrid">
                        <div className="FormItem">
                            <label>Descrição</label>

                            <input
                                type="text"
                                name="descricao"
                                className="Small"
                                placeholder="Informe a descrição do tipo de imposto"
                                value={imposto.descricao}
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
                        onClick={submitImposto}
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

export default TipoImposto;