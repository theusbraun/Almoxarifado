import React from "react";
import { useLocation } from "react-router-dom";

import Root from "../components/root";
import Menu from "../components/menu";

const App = () => {
    const location = useLocation();

    const hideMenu =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!hideMenu && <Menu />}

            <main className={hideMenu ? "" : "MainContent"}>
                <Root />
            </main>
        </>
    );
};

export default App;