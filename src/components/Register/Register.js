import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';

function Register() {

    return (
        <section className='register'>
            <div className='register__block'>
                <div className='register__center'>
                    <Link to='/'>
                        <img className="header__logo" src={Logo} alt="логотип" />
                    </Link>
                </div>
                <h2 className='register__heading'>Добро пожаловать!</h2>
            </div>

            <form className='register__form' noValidate>

                <span className='register__input'>Имя</span>
                <input className='register__field' id='name' name='name' type='text' minLength='2' maxLength='40' required />
                <span className='register__input_error'></span>

                <span className='register__input'>E-mail</span>
                <input
                    className='register__field'
                    id='email' name='email'
                    type='email'
                    required
                />
                <span className='register__input_error'></span>

                <span className='register__input'>Пароль</span>
                <input
                    className='register__field register__field_password'
                    id='password'
                    name='password'
                    type='password'
                    required
                    minLength='2'
                />
                <span className='register__input_error'></span>

                <button
                    type='submit'
                    className='register__form_button'>
                    Зарегистрироваться
                </button>

                <div className='register__signin'>
                    <p className='register__link_title'>Уже зарегистрированы?</p>
                    <Link to='/signin' className='register__login_link' >
                        Войти
                    </Link>
                </div>

            </form>
        </section>
    );
}

export default Register;