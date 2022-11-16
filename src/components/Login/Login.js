import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';

function Login() {
    return (
        <section className='login'>
            <div className='login__block'>
                <div className='logo__center'>
                    <Link to='/'>
                        <img className="header__logo" src={Logo} alt="логотип" />
                    </Link>
                </div>
                <h2 className='login__heading'>Рады видеть!</h2>
            </div>

            <form className='login__form' noValidate>
                <span className='login__input'>E-mail</span>
                <input
                    className='login__field'
                    id='email-login'
                    name='email'
                    type='email'
                    required
                />
                <span className='register__input_error'></span>

                <span className='login__input'>Пароль</span>
                <input
                    className='login__field login__field_password'
                    id='password-login'
                    name='password'
                    type='password'
                    required
                    minLength='10'
                />
                <span className='register__input_error'></span>

                <button
                    type='submit'
                    className='login__form_button'>
                    Войти
                </button>

                <div className='login__signin'>
                    <p className='login__link_title'>Ещё не зарегистрированы?</p>
                    <Link to='/signup' className='login__login_link'>
                        Регистрация
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default Login;