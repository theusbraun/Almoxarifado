import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

import {
    tributacoes,
    situacoes
} from "../constants/clienteOptions";

import "./style.css";

axios.defaults.withCredentials = true;

const Cliente = () => {

    const [cliente, setCliente] = useState({
        nome: "",
        tipo_documento: "f",
        documento: "",
        tipo_entrega: "E",
        email: "",
        telefone: "",
        tributacao: "",
        tipo_situacao: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {

        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });

    };

    const alterarTipoPessoa = (e) => {

        setCliente({
            ...cliente,
            tipo_pessoa: e.target.value,
            documento: "",
            tributacao: "",
            tipo_situacao: ""
        });

    };

    const submitCliente = async () => {

        setErrorMessage("");
        setSuccessMessage("");

        try {

            const dadosCliente = {
                ...cliente,
                documento: cliente.documento.replace(/\D/g, "")
            };

            const response = await axios.post(
                "http://localhost:3001/criarCliente",
                dadosCliente
            );

            setSuccessMessage(
                response.data.message || "Cliente cadastrado com sucesso."
            );

            setCliente({
                nome: "",
                tipo_documento: "f",
                documento: "",
                tipo_entrega: "E",
                email: "",
                telefone: "",
                tributacao: "",
                tipo_situacao: ""
            });

        } catch (error) {

            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erro ao conectar com o servidor.");
            }

        }

    };

    return (
        <div className="Page">

            <div className="PageHeader">
                <h1>Cadastro de Cliente</h1>
                <span>
                    Registre os dados cadastrais, fiscais e tributários do cliente.
                </span>
            </div>

            <div className="Card">

                <fieldset className="Fieldset">

                    <legend>Dados do Cliente</legend>

                    <div className="FormGrid">

                        <div className="FormItem">
                            <label>Nome / Razão Social</label>

                            <input
                                type="text"
                                name="nome"
                                className="Small"
                                placeholder="Nome ou razão social"
                                value={cliente.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="FormItem">
                            <label>Tipo de pessoa</label>

                            <select
                                name="tipo_documento"
                                className="Small"
                                value={cliente.tipo_documento}
                                onChange={alterarTipoPessoa}
                            >
                                <option value="f">Pessoa Física</option>
                                <option value="j">Pessoa Jurídica</option>
                                <option value="e">Estrangeiro</option>
                            </select>
                        </div>

                        <div className="FormItem">
                            <label>Documento</label>

                            {cliente.tipo_documento === "f" && (
                                <InputMask
                                    mask="999.999.999-99"
                                    name="documento"
                                    className="Small"
                                    placeholder="CPF"
                                    value={cliente.documento}
                                    onChange={handleChange}
                                />
                            )}

                            {cliente.tipo_documento === "j" && (
                                <InputMask
                                    mask="99.999.999/9999-99"
                                    name="documento"
                                    className="Small"
                                    placeholder="CNPJ"
                                    value={cliente.documento}
                                    onChange={handleChange}
                                />
                            )}

                            {cliente.tipo_documento === "e" && (
                                <input
                                    type="text"
                                    name="documento"
                                    className="Small"
                                    placeholder="Documento estrangeiro"
                                    value={cliente.documento}
                                    onChange={handleChange}
                                />
                            )}

                        </div>

                        <div className="FormItem">
                            <label>Tipo de entrega</label>

                            <select
                                name="tipo_entrega"
                                className="Small"
                                value={cliente.tipo_entrega}
                                onChange={handleChange}
                            >
                                <option value="E">Email</option>
                                <option value="W">Whatsapp</option>
                                <option value="I">Impresso</option>
                            </select>
                        </div>


                    </div>

                </fieldset>

                <fieldset className="Fieldset">

                    <legend>Dados Fiscais</legend>

                    <div className="FormGrid">

                        <div className="FormItem">

                            <label>Tributação</label>

                            <select
                                name="tributacao"
                                className="Small"
                                value={cliente.tributacao}
                                onChange={handleChange}
                            >
                                <option value="">Selecione</option>

                                {(tributacoes[cliente.tipo_documento] || []).map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="FormItem">

                            <label>Tipo Situação</label>

                            <select
                                name="tipo_situacao"
                                className="Small"
                                value={cliente.tipo_situacao}
                                onChange={handleChange}
                            >
                                <option value="">Selecione</option>

                                {(situacoes[cliente.tipo_documento] || []).map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                </fieldset>

                <fieldset className="Fieldset">

                    <legend>Contatos do cliente</legend>

                    <div className="FormGrid">

                        <div className="FormItem">
                            <label>E-mail</label>

                            <input
                                type="email"
                                name="email"
                                className="Small"
                                placeholder="E-mail"
                                value={cliente.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="FormItem">
                            <label>Telefone</label>

                            <input
                                type="text"
                                name="telefone"
                                className="Small"
                                placeholder="Telefone"
                                value={cliente.telefone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <div className="Actions">

                    <button
                        type="button"
                        className="SecondaryButton"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="Button"
                        onClick={submitCliente}
                    >
                        Salvar
                    </button>

                </div>

                {errorMessage && (
                    <p className="ErrorMessage">
                        {errorMessage}
                    </p>
                )}

                {successMessage && (
                    <p className="SuccessMessage">
                        {successMessage}
                    </p>
                )}

            </div>

        </div>
    );
};

export default Cliente;