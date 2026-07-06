import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./style.css";

const Register = () => {

    const history = useHistory();

    const [usuario, setUsuario] = useState({
        nome: "",
        data_nascimento: "",
        cpf: "",
        email: "",
        senha: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {

        axios.defaults.withCredentials = true;

    }, []);

    const handleChange = (e) => {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });

    };

    const submitUser = async () => {

        setErrorMessage("");
        setSuccessMessage("");

        try {

            const response = await axios.post(
                "http://localhost:3001/register",
                usuario
            );

            setSuccessMessage(response.data.message);

            history.push({
                pathname: "/login",
                state: {
                    successMessage: response.data.message
                }
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

            <h1>Novo Usuário</h1>

            <input
                type="text"
                name="nome"
                className="Small"
                placeholder="Nome"
                value={usuario.nome}
                onChange={handleChange}
            />

            <input
                type="date"
                name="data_nascimento"
                className="Small"
                value={usuario.data_nascimento}
                onChange={handleChange}
            />

            <input
                type="text"
                name="cpf"
                className="Small"
                placeholder="CPF"
                maxLength="11"
                value={usuario.cpf}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                className="Small"
                placeholder="E-mail"
                value={usuario.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="senha"
                className="Small"
                placeholder="Senha"
                value={usuario.senha}
                onChange={handleChange}
            />

            <button
                className="Button"
                onClick={submitUser}
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

export default Register;