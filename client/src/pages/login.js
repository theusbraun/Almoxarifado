import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

import "./style.css";

axios.defaults.withCredentials = true;

const Login = () => {
    const history = useHistory();

    console.log(history);
    const location = useLocation();

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        if (location.state?.successMessage) {
            setSnackbarMessage(location.state.successMessage);
            setOpenSnackbar(true);

            // Remove o state para não aparecer novamente ao atualizar a página
            history.replace({
                pathname: location.pathname,
                state: {}
            });
        }
    }, [location, history]);

    const submitLogin = () => {
        setErrorMessage("");

        axios
            .post("http://localhost:3001/login", {
                login,
                senha
            })
            .then((response) => {
                history.push("/");
                window.location.reload();
            }).catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("Erro ao conectar com o servidor.");
                }
            });
    };

    return (
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

            <br />

            {errorMessage && <p>{errorMessage}</p>}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </div>
    );
};

export default Login;