import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./style.css";

axios.defaults.withCredentials = true;

const Login = ({ refreshAuth }) => {

const history = useHistory();

const [login, setLogin] = useState("");
const [senha, setSenha] = useState("");

const [errorMessage, setErrorMessage] = useState("");



const formatarLogin = (valor) => {

    if (!valor) {
        return "";
    }


    // Se começar com número, aplica máscara de CPF
    if (/^[0-9]/.test(valor)) {


        const apenasNumeros = valor.replace(/\D/g, "");


        return apenasNumeros

            .slice(0, 11)

            .replace(
                /(\d{3})(\d)/,
                "$1.$2"
            )

            .replace(
                /(\d{3})(\d)/,
                "$1.$2"
            )

            .replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            );

    }


    // Caso contrário mantém como e-mail
    return valor;

};



const goToRegister = () => {

    history.push("/register");

};



const submitLogin = async () => {

    setErrorMessage("");


    try {


        const loginEnvio = login.includes("@")

            ? login

            : login.replace(/\D/g, "");



        const response = await axios.post(

            "http://localhost:3001/login",

            {
                login: loginEnvio,
                senha
            }

        );



        if (refreshAuth) {

            await refreshAuth();

        }



        history.push({

            pathname: "/",

            state: {

                successMessage:

                    response.data.message ||

                    "Login realizado com sucesso!",


                usuario:

                    response.data.usuario

            }

        });



    } catch (error) {


        if (error.response) {


            setErrorMessage(

                error.response.data.message

            );


        } else {


            setErrorMessage(

                "Erro ao conectar com o servidor."

            );


        }


    }


};



return (

    <div className="LoginContainer">


        <div className="Card LoginCard">



            <div className="LoginHeader">


                <h1>
                    Login
                </h1>


                <span>
                    Acesse sua conta para continuar.
                </span>


            </div>




            <div className="FormGrid">



                <div className="FormItem">


                    <label>
                        CPF ou e-mail
                    </label>



                    <input

                        type="text"

                        className="Small"

                        placeholder="Digite seu CPF ou e-mail"

                        value={login}

                        onChange={(e) =>

                            setLogin(

                                formatarLogin(
                                    e.target.value
                                )

                            )

                        }

                    />



                </div>




                <div className="FormItem">


                    <label>
                        Senha
                    </label>



                    <input

                        type="password"

                        className="Small"

                        placeholder="Digite sua senha"

                        value={senha}

                        onChange={(e) =>

                            setSenha(
                                e.target.value
                            )

                        }

                    />


                </div>





                <div className="Actions LoginActions">



                    <button

                        type="button"

                        className="Button"

                        onClick={submitLogin}

                    >

                        Entrar

                    </button>



                </div>





                {errorMessage && (

                    <p className="ErrorMessage">

                        {errorMessage}

                    </p>

                )}






                <div className="RegisterLink">


                    <span>
                        Ainda não possui uma conta?
                    </span>



                    <button

                        type="button"

                        className="LinkButton"

                        onClick={goToRegister}

                    >

                        Cadastre-se

                    </button>



                </div>





                <img

                    src="/opcao_contabil.png"

                    className="LoginLogo"

                    alt="Logo da empresa"

                />



            </div>


        </div>


    </div>

);

};

export default Login;
