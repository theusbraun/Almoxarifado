import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import Axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    Axios.defaults.withCredentials = true;

    async function checkAuthentication() {

        try {

            const response = await Axios.get(
                "http://localhost:3001/checkAuthentication"
            );

            if (response.data.authenticated) {

                setAuthenticated(true);
                setUser(response.data.user);

            } else {

                setAuthenticated(false);
                setUser(null);

            }

        } catch {

            setAuthenticated(false);
            setUser(null);

        } finally {

            setLoading(false);

        }

    }

    async function login(login, senha) {

        const response = await Axios.post(
            "http://localhost:3001/login",
            {
                login,
                senha
            }
        );

        setAuthenticated(true);
        setUser(response.data.usuario);

        return response.data;

    }

    async function logout() {

        await Axios.post(
            "http://localhost:3001/logout"
        );

        setAuthenticated(false);
        setUser(null);

    }

    useEffect(() => {

        checkAuthentication();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                authenticated,
                user,
                loading,
                login,
                logout,
                checkAuthentication
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}