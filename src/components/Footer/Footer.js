import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__section'>
                <div className='footer__block'>
                    <h3 className='footer__block_title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                </div>

                <div className='footer__block_content'>
                    <p className='footer__copyright'>&copy; 2022</p>

                    <nav className='footer__links'>
                        <li className='footer__links_item'>
                            <a className='footer__links_link' href='https://practicum.yandex.ru/' target='_blank' rel='noopener noreferrer'>
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li className='footer__links_item'>
                            <a className='footer__links_link' href='https://github.com/GlebProk' target='_blank' rel='noopener noreferrer'>
                                Github
                            </a>
                        </li>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;