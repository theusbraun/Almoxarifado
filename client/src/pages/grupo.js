import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

const Grupo = () => {

    const [grupo, setGrupo] = useState({
        descricao: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {

        axios.defaults.withCredentials = true;

    }, []);

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

        <div className="Formulario">

            <h1>Novo Grupo</h1>

            <input
                type="text"
                className="Small"
                placeholder="Descrição"
                value={grupo.descricao}
                onChange={(e) =>
                    setGrupo({
                        ...grupo,
                        descricao: e.target.value
                    })
                }
            />

            <button
                className="Button"
                onClick={submitGrupo}
            >
                Salvar
            </button>

            <br />

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

    );

};

export default Grupo;