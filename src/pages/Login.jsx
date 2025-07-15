import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

export default function Login(){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [emailError, setEmailError] = useState();
    const [senhaError, setSenhaError] = useState();
    const navigate = useNavigate();
    const schema = new PasswordValidator();
    const [isDisabled, setIsDisabled] = useState(true);
    
    schema
    .is().min(8)                                    // Mínimo de 8 caracteres
    .is().max(100)                                  // Máximo de 100 caracteres
    .has().uppercase()                              // Deve conter letras maiúsculas
    .has().lowercase()                              // Deve conter letras minúsculas
    .has().digits(2)                                // Deve conter pelo menos 2 dígitos
    .has().not().spaces();                          // Não pode conter espaços
    
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
        isTrue();
        if(!EmailValidator.validate(email)){
        
        }
    }
    const handleChangeSenha = (event) => {
        setSenha(event.target.value)
        isTrue();
        if(!schema.validate(senha, { list: true })){
        }
    }
    function isTrue(){
        if(EmailValidator.validate(email) && schema.validate(senha)){
            setIsDisabled(false);
        }else{
            setIsDisabled(true);
        }
    }
    
    function validate(){
        if(EmailValidator.validate(email) && schema.validate(senha)){
            navigate("/produtos");
        }else{
            buttonAtive();
        }
    }
    return(
        <>
            <div id="container-login">
                <label htmlFor="email">Login</label>
                <input type="text" id='email' onChange={handleChangeEmail} autocomplete="off"/>
                <label htmlFor="email" id='email-error' class="error">{}</label>
                <label htmlFor="senha">Senha</label>
                <input type="password" id='senha' onChange={handleChangeSenha}/>
                <label htmlFor="senha" id='senha-error' class="error">{}</label>
                <button onClick={validate} disabled={isDisabled}>Logar</button>
            </div>
        </>
    )
}