import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useLocation } from "react-router-dom";

import "./style.css";

const Home = () => {
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            setOpen(true);

            // Limpa o state da rota para que o Snackbar
            // não apareça novamente ao atualizar a página.
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className="Formulario">

            <h1>Bem-vindo!</h1>

            <p>Você está autenticado no sistema.</p>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={successMessage}
            />

        </div>
    );
};

export default Home;