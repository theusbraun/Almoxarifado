import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useLocation } from "react-router-dom";

import {
    FaUsers,
    FaPercentage,
    FaFileInvoiceDollar,
    FaBuilding,
    FaClock,
    FaCalendarAlt,
    FaChartBar
} from "react-icons/fa";

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
            setTitle(`Olá, ${usuario.nome}!`);
        }

        if (message) {

            setSuccessMessage(message);
            setOpen(true);

            window.history.replaceState({}, document.title);

        }

    }, [location.state]);

    return (

        <div className="Page">

            <div className="PageHeader">
                <h1>{title}</h1>
                <span>
                    Acompanhe os principais indicadores do sistema contábil.
                </span>
            </div>

            <div className="DashboardCards">

                <div className="DashboardCard clientes">

                    <div className="DashboardCardTop">

                        <div className="DashboardCardTitle">

                            <FaUsers className="DashboardIcon" />

                            <span>Clientes</span>

                        </div>

                        <h2>148</h2>

                    </div>

                    <small>12 novos este mês</small>

                </div>

                <div className="DashboardCard impostos">

                    <div className="DashboardCardTop">

                        <div className="DashboardCardTitle">

                            <FaPercentage className="DashboardIcon" />

                            <span>Impostos</span>

                        </div>

                        <h2>24</h2>

                    </div>

                    <small>Tipos cadastrados</small>

                </div>

                <div className="DashboardCard pendencias">

                    <div className="DashboardCardTop">

                        <div className="DashboardCardTitle">

                            <FaFileInvoiceDollar className="DashboardIcon" />

                            <span>Guias Pendentes</span>

                        </div>

                        <h2>18</h2>

                    </div>

                    <small>Vencem esta semana</small>

                </div>

                <div className="DashboardCard empresas">

                    <div className="DashboardCardTop">

                        <div className="DashboardCardTitle">

                            <FaBuilding className="DashboardIcon" />

                            <span>Empresas Ativas</span>

                        </div>

                        <h2>63</h2>

                    </div>

                    <small>Todas em dia</small>

                </div>

            </div>

            <div className="DashboardGrid">

                <div className="Card">

                    <h2 className="SectionTitle">
                        <FaClock />
                        Atividades Recentes
                    </h2>

                    <ul className="ActivityList">

                        <li>
                            Cliente <strong>Mercado Central</strong> cadastrado.
                        </li>

                        <li>
                            Novo tipo de imposto <strong>ISSQN</strong> criado.
                        </li>

                        <li>
                            Cliente <strong>Farmácia Vida</strong> atualizado.
                        </li>

                        <li>
                            Fechamento contábil realizado com sucesso.
                        </li>

                    </ul>

                </div>

                <div className="Card">

                    <h2 className="SectionTitle">
                        <FaCalendarAlt />
                        Próximas Obrigações
                    </h2>

                    <ul className="ActivityList">

                        <li>15/07 • Envio da DCTFWeb</li>

                        <li>20/07 • Recolhimento do Simples Nacional</li>

                        <li>25/07 • Fechamento da Folha</li>

                        <li>31/07 • Entrega do SPED Fiscal</li>

                    </ul>

                </div>

            </div>

            <div className="Card">

                <h2 className="SectionTitle">
                    <FaChartBar />
                    Resumo do Sistema
                </h2>

                <p className="DashboardText">

                    Este sistema foi desenvolvido para centralizar o cadastro de
                    clientes, obrigações fiscais, tributos e demais informações
                    contábeis, oferecendo uma gestão simples, rápida e organizada.

                </p>

            </div>

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