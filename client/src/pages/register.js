import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";

import "./style.css";

axios.defaults.withCredentials = true;

const Register = () => {

const history = useHistory();

const [usuario, setUsuario] = useState({

    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    senha: ""

});


const [errorMessage, setErrorMessage] = useState("");
const [successMessage, setSuccessMessage] = useState("");



const handleChange = (e) => {

    setUsuario({

        ...usuario,

        [e.target.name]: e.target.value

    });

};



const submitUser = async () => {

    setErrorMessage("");
    setSuccessMessage("");


    const dadosUsuario = {

        ...usuario,

        cpf: usuario.cpf.replace(/\D/g, "")

    };



    try {


        const response = await axios.post(

            "http://localhost:3001/register",

            dadosUsuario

        );



        setSuccessMessage(

            response.data.message

        );



        history.push({

            pathname: "/login",

            state: {

                successMessage: response.data.message

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

                    Criar conta

                </h1>



                <span>

                    Cadastre um novo usuário no sistema.

                </span>


            </div>





            <div className="FormGrid">





                <div className="FormItem">


                    <label>
                        Nome
                    </label>


                    <input

                        type="text"

                        name="nome"

                        className="Small"

                        placeholder="Digite seu nome"

                        value={usuario.nome}

                        onChange={handleChange}

                    />


                </div>





                <div className="FormItem">


                    <label>
                        Data de nascimento
                    </label>


                    <input

                        type="date"

                        name="data_nascimento"

                        className="Small"

                        value={usuario.data_nascimento}

                        onChange={handleChange}

                    />


                </div>





                <div className="FormItem">


                    <label>
                        CPF
                    </label>



                    <InputMask

                        mask="999.999.999-99"

                        name="cpf"

                        className="Small"

                        placeholder="Digite seu CPF"

                        value={usuario.cpf}

                        onChange={handleChange}

                    />



                </div>





                <div className="FormItem">


                    <label>
                        E-mail
                    </label>


                    <input

                        type="email"

                        name="email"

                        className="Small"

                        placeholder="Digite seu e-mail"

                        value={usuario.email}

                        onChange={handleChange}

                    />


                </div>





                <div className="FormItem">


                    <label>
                        Senha
                    </label>


                    <input

                        type="password"

                        name="senha"

                        className="Small"

                        placeholder="Digite sua senha"

                        value={usuario.senha}

                        onChange={handleChange}

                    />


                </div>






                <div className="Actions LoginActions">


                    <button

                        type="button"

                        className="Button"

                        onClick={submitUser}

                    >

                        Criar conta

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







                <div className="RegisterLink">


                    <span>

                        Já possui uma conta?

                    </span>



                    <button

                        type="button"

                        className="LinkButton"

                        onClick={() => history.push("/login")}

                    >

                        Entrar

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

export default Register;
