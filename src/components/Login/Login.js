import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Logo from '../../images/logo.svg';

function Login({ onLogin, isLoading, message }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    React.useEffect(() => {
        resetForm({});
    }, [resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        const { email, password } = values;
        onLogin(email, password);
    }

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

            <form className='login__form' onSubmit={handleSubmit} noValidate>
                <span className='login__input'>E-mail</span>
                <input
                    className='login__field'
                    id='email-login'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    value={values.email || ''}
                    required
                />
                {errors.email ? (<span className='register__input_error'>{errors.email}</span>) : null}

                <span className='login__input'>Пароль</span>
                <input
                    className='login__field login__field_password'
                    id='password-login'
                    name='password'
                    type='password'
                    onChange={handleChange}
                    value={values.password || ''}
                    minLength='2'
                    required
                />
                {errors.password ? (<span className='register__input_error'>{errors.password}</span>) : null}

                <span className='login__message'>{message}</span>
                <button
                    type='submit'
                    className={`login__form_button ${!isValid || isLoading ? 'login__form_button_disabled' : ''} `}>
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
