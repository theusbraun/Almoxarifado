import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";

import "./style.css";

const Login = () => {

    const [loginReg, setLogin] = useState("");
    const [senhaReg, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [open, setOpen] = useState(false);

    const location = useLocation();

    const history = useHistory();

    useEffect(() => {
        Axios.defaults.withCredentials = true;
    }, []);

    useEffect(() => {
        if (location.state?.successMessage) {
            setOpen(true);
        }
    }, [location]);

    const submitLogin = () => {

        setErrorMessage("");

        Axios.post("http://localhost:3001/login", {
            login: loginReg,
            senha: senhaReg
        })
            .then((response) => {
                setSuccessMessage(response.data.message);
                    history.push({
                        pathname: "/",
                        state: {
                  successMessage: response.data.message
                }
            });
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

            <h1>Login</h1>

            <input
                type="text"
                className="Small"
                placeholder="CPF ou e-mail"
                onChange={(e) => setLogin(e.target.value)}
            />

            <input
                type="password"
                className="Small"
                placeholder="Senha"
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
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={location.state?.successMessage}
            />

        </div>
    );
};

export default Login;