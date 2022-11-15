import React from 'react';
import PageLogo from '../../images/landing-logo.svg'
import './Promo.css';

function Promo() {
    return (
        <section className='promo'>
            <div className='promo__section'>
                <img className='promo__image' src={PageLogo} alt='логотип лендинга' />
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button className='promo__button'>Узнать больше</button>
            </div>
        </section>
    );
};

export default Promo;