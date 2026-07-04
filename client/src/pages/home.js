import React, { useEffect, useState } from "react";
import './style.css';
import Axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";
import { useLocation } from "react-router-dom";

const Home = () => {

    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.successMessage) {
            setOpen(true);
        }
    }, [location]);

    return (
    <div className="Formulario">
        <h1>BEM VINDO</h1>
        <div>
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
            message={location.state?.successMessage}
        />
        </div>
    </div>

    );
}

export default Home;