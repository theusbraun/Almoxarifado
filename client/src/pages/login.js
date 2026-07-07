import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./style.css";

axios.defaults.withCredentials = true;

const Login = (props) => {
    const history = useHistory();

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const goToRegister = () => {
        history.push("/register");
    };

    const submitLogin = async () => {
        setErrorMessage("");

        try {
            const response = await axios.post(
                "http://localhost:3001/login",
                {
                    login,
                    senha
                },
                {
                    withCredentials: true
                }
            );

            if (props.refreshAuth) {
                await props.refreshAuth();
            }

            history.push({
                pathname: "/",
                state: {
                    successMessage:
                        response.data.message ||
                        "Login realizado com sucesso!",
                    usuario: response.data.usuario
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
    <div className="LoginContainer">
        <div className="Formulario">
            <h1>Login</h1>

            <input
                type="text"
                className="Small"
                placeholder="CPF ou e-mail"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />

            <input
                type="password"
                className="Small"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <button
                onClick={submitLogin}
                className="Button"
            >
                Login
            </button>

            {errorMessage && (
                <p className="ErrorMessage">{errorMessage}</p>
            )}

            <div className="RegisterLink">
                <span>Ainda não possui uma conta? </span>

                <button
                    type="button"
                    className="LinkButton"
                    onClick={goToRegister}
                >
                    Cadastre-se
                </button>
            </div>

        </div>
    </div>
);
};

export default Login;