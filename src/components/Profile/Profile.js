import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Header from '../Header/Header';

function Profile({ isLoading, onUpdateUser, onSignout, message }) {
    const { email, name } = React.useContext(CurrentUserContext);

    const { values, handleChange, errors, isValid } = useFormWithValidation({
        name: '',
        email: ''
    })

    const [hasChanges, setHasChanges] = React.useState(false);

    React.useEffect(() => {
        values.name = name;
        values.email = email;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        setHasChanges((values.name !== name) || (values.email !== email));
    }, [values.name, values.email, name, email]
    );

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ email: values.email || email, name: values.name || name });
    }


    return (
        <>
            <Header />
            <main className='profile'>
                <h2 className='profile__heading'>{`Привет, ${name}!`}</h2>
                <div className='profile__content'>
                    <form className='profile__form' onSubmit={handleSubmit} >
                        <div className='profile__input-box'>
                            <span className='profile__input'>Имя</span>
                            <input
                                className='profile__field_name'
                                name='name'
                                type='text'
                                value={values.name || name}
                                disabled={isLoading}
                                onChange={handleChange}
                                minLength='2'
                                maxLength='40'
                                placeholder='Введите новое имя'
                                required
                            />
                        </div>
                        {errors.name ? (<span className='profile__input_error'>{errors.name}</span>) : null}
                        <div className='profile__input-box'>
                            <span className='profile__input'>E-mail</span>
                            <input
                                className='profile__field_email'
                                name='email'
                                type='email'
                                value={values.email || email}
                                disabled={isLoading}
                                onChange={handleChange}
                                placeholder='Введите новую почту'
                                required
                            />
                        </div>
                        {errors.email ? (<span className='profile__input_error'>{errors.email}</span>) : null}
                        <span className='profile__message'>{message}</span>
                        <button
                            type='submit'
                            disabled={!hasChanges || !isValid}
                            className={`profile__form_button ${!isValid || !hasChanges || isLoading ? 'profile__form_button_disabled' : ''}`}
                        >
                            Редактировать
                        </button>
                        <Link to='/' className='profile__link' onClick={onSignout}>
                            Выйти из аккаунта
                        </Link>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Profile;
