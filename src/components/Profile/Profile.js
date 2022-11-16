import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';

function Profile() {
    return (
        <>
            <Header />
            <main className='profile'>
                <h2 className='profile__heading'>Привет, Глеб!</h2>
                <div className='profile__content'>
                    <form className='profile__form' >
                        <div className='profile__input-box'>
                            <span className='profile__input'>Имя</span>
                            <input className='profile__field_name' name='name' type='text' minLength='2' maxLength='40' placeholder='' value='Глеб' required />
                            <span className='profile__input_error'></span>
                        </div>
                        <div className='profile__input-box'>
                            <span className='profile__input'>E-mail</span>
                            <input className='profile__field_email' name='email' type='email' placeholder='' value='prokofyevg@yandex.ru' required />
                            <span className='profile__input_error'></span>
                        </div>
                        <button type='submit' className='profile__form_button'>
                            Редактировать
                        </button>
                        <Link to='/' className='profile__link'>
                            Выйти из аккаунта
                        </Link>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Profile;