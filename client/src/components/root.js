import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Produto from "../pages/produtos";
import Grupo from "../pages/grupo";

const Root = () => {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [authVersion, setAuthVersion] = useState(0);

    useEffect(() => {

        const checkAuthentication = async () => {

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

        };

        checkAuthentication();

    }, [authVersion]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <Switch>

            <Route
                path="/login"
                render={() =>
                    authenticated ? <Redirect to="/" /> : <Login />
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

        </Switch>
    );
};

export default Root;