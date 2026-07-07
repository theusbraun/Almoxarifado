import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
    FaBoxOpen,
    FaLayerGroup,
    FaUsers,
    FaPercentage
} from "react-icons/fa";

import iconERP from "./erp.png";
import "./bar.css";

const Menu = () => {
    const location = useLocation();

    const menus = [
        {
            path: "/Produtos",
            title: "Produtos",
            icon: <FaBoxOpen />
        },
        {
            path: "/Grupos",
            title: "Grupos",
            icon: <FaLayerGroup />
        },
        {
            path: "/Clientes",
            title: "Clientes",
            icon: <FaUsers />
        },
        {
            path: "/Impostos",
            title: "Impostos",
            icon: <FaPercentage />
        }
    ];

    return (
        <aside className="Sidebar">

            <div className="LogoArea">
                <img src={iconERP} alt="ERP" />
            </div>

            <ul className="SidebarList">

                {menus.map((menu) => (

                    <li key={menu.path}>

                        <Link
                            to={menu.path}
                            className={
                                location.pathname === menu.path
                                    ? "MenuItem Active"
                                    : "MenuItem"
                            }
                        >

                            <span className="Icon">
                                {menu.icon}
                            </span>

                            <span>
                                {menu.title}
                            </span>

                        </Link>

                    </li>

                ))}

            </ul>

        </aside>
    );
};

export default Menu;