import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const schema = new PasswordValidator();
  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces();

  const senhaMensagens = {
    min: "Mínimo de 8 caracteres.",
    max: "Máximo de 100 caracteres.",
    uppercase: "Deve conter letra maiúscula.",
    lowercase: "Deve conter letra minúscula.",
    digits: "Deve conter pelo menos 2 dígitos.",
    spaces: "Não pode conter espaços."
  };

  useEffect(() => {
    checkFormValidity(email, senha);
  }, [email, senha]);

  function handleChangeEmail(e) {
    const value = e.target.value;
    setEmail(value);
    setEmailError(EmailValidator.validate(value) ? '' : 'Email incorreto');
  }

  function handleChangeSenha(e) {
    const value = e.target.value;
    setSenha(value);
    const erros = schema.validate(value, { list: true });
    setSenhaError(erros.map(e => senhaMensagens[e]));
  }

  function checkFormValidity(currentEmail, currentSenha) {
    const valid = EmailValidator.validate(currentEmail) && schema.validate(currentSenha);
    setIsDisabled(!valid);
  }

  function handleLogin() {
    if (!EmailValidator.validate(email)) {
      document.getElementById('email').focus();
      return;
    }
    if (!schema.validate(senha)) {
      document.getElementById('senha').focus();
      return;
    }
    localStorage.setItem("usuarioLogado", email);
    if(!localStorage.getItem("carrinho-"+email)){
        localStorage.setItem("carrinho-"+email, "[]");
    }
    navigate('/produtos');
  }

  return (
    <div id="container-login">
      <label htmlFor="email">Login</label>
      <input type="text" id="email" value={email} onChange={handleChangeEmail} autoComplete="off" required placeholder="Email"/>
      {emailError && <div className="error">{emailError}</div>}

      <label htmlFor="senha">Senha</label>
      <input type="password" id="senha" value={senha} onChange={handleChangeSenha} required placeholder="Senha" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
      {senhaError.length > 0 && (
        <ul className="error">
          {senhaError.map((erro, index) => (
            <h5 key={index}>{erro}</h5>
          ))}
        </ul>
      )}
      <button onClick={handleLogin} disabled={isDisabled}>Logar</button>
    </div>
  );
}
