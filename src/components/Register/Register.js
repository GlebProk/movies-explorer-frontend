import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Logo from '../../images/logo.svg';

function Register({ onRegister, isLoading, message }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    React.useEffect(() => {
        resetForm({});
    }, [resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        const { name, email, password } = values;
        onRegister(name, email, password);
    }

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

            <form className='register__form' onSubmit={handleSubmit} noValidate>

                <span className='register__input'>Имя</span>
                <input
                    className='register__field'
                    id='name'
                    name='name'
                    type='text'
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.name || ''}
                    minLength='2'
                    maxLength='40'
                    required
                />
                {errors.name ? (<span className='register__input_error'>{errors.name}</span>) : null}

                <span className='register__input'>E-mail</span>
                <input
                    className='register__field'
                    id='email'
                    name='email'
                    type='email'
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.email || ''}
                    required
                />
                {errors.email ? (<span className='register__input_error'>{errors.email}</span>) : null}

                <span className='register__input'>Пароль</span>
                <input
                    className='register__field register__field_password'
                    id='password'
                    name='password'
                    type='password'
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.password || ''}
                    minLength='2'
                    required
                />
                {errors.password ? (<span className='register__input_error'>{errors.password}</span>) : null}

                <span className='register__message'>{message}</span>
                <button
                    type='submit'
                    className={`register__form_button ${!isValid || isLoading ? 'register__form_button_disabled' : ''} `}
                >
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
