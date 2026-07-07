import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useLocation } from "react-router-dom";

import "./style.css";

const Home = () => {
    const location = useLocation();

    const [title, setTitle] = useState("Bem-vindo!");
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const message = location.state?.successMessage;
        const usuario = location.state?.usuario;

        if (usuario?.nome) {
            setTitle(`Bem-vindo ${usuario.nome}!`);
        }

        if (message) {
            setSuccessMessage(message);
            setOpen(true);

            // limpa state após uso
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <div className="Content">
            <h1>{title}</h1>

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