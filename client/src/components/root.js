import React, { useEffect, useState, useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Produto from "../pages/produtos";
import Grupo from "../pages/grupo";
import Impostos from "../pages/impostos";
import Clientes from "../pages/clientes";

const Root = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const checkAuthentication = useCallback(async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/checkAuthentication",
                {
                    withCredentials: true
                }
            );

            setAuthenticated(response.data.authenticated);
        } catch {
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    // 👇 função que o Login vai chamar
    const refreshAuth = async () => {
        await checkAuthentication();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <Switch>

            <Route
                path="/login"
                render={(props) =>
                    authenticated ? (
                        <Redirect to="/" />
                    ) : (
                        <Login {...props} refreshAuth={refreshAuth} />
                    )
                }
            />

            <Route path="/register" component={Register} />

            <Route
                exact
                path="/"
                render={() =>
                    authenticated ? <Home /> : <Redirect to="/login" />
                }
            />

            <Route
                path="/produtos"
                render={() =>
                    authenticated ? <Produto /> : <Redirect to="/login" />
                }
            />

            <Route
                path="/grupos"
                render={() =>
                    authenticated ? <Grupo /> : <Redirect to="/login" />
                }
            />

            <Route
                path="/impostos"
                render={() =>
                    authenticated ? <Impostos /> : <Redirect to="/login" />
                }
            />

            <Route
                path="/clientes"
                render={() =>
                    authenticated ? <Clientes /> : <Redirect to="/login" />
                }
            />

        </Switch>
    );
};

export default Root;