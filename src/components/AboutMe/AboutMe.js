import React from 'react';
import './AboutMe.css';
import Photo from '../../images/Ava.jpg';

function AboutMe() {
    return (
        <section className='student'>
            <div className='student__section'>
                <p className='project-title'>Студент</p>
                <div className='student__profile'>
                    <div className='student__info'>
                        <h2 className='student__heading student__heading_size_l'>Глеб</h2>
                        <h3 className='student__heading student__heading_size_m'>Фронтенд-разработчик, 26 лет</h3>
                        <p className='student__text'>Я родился и живу в Москве, закончил факультет Информатики и вычислительной техники МГУПП. Люблю слушать музыку и увлекаюсь спортом. Недавно начал кодить. После того, как прошел курс по веб-разработке, устроился на стажировку в Тинькофф.</p>
                        <nav className='column-social'>
                            <li className='column-social__item'><a className='column-social__item-link' href='https://github.com/GlebProk' target='_blank' rel='noopener noreferrer'>GitHub</a></li>
                        </nav>
                    </div>
                    <div className='student__image-card'>
                        <img className='student__image' src={Photo} alt='фото' />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;