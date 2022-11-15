import React from 'react';
import './MoviesCard.css';
import SaveButton from '../../images/save-button.svg';
import SaveButtonSaved from '../../images/save-button_saved.svg';
import SaveButtonDelete from '../../images/save-button_delete.svg';
import Pic from '../../images/pic.png';
import Pic1 from '../../images/pic2.png';
import Pic2 from '../../images/pic3.png';
import Pic3 from '../../images/pic4.png';

import { useLocation } from 'react-router-dom';



function MoviesCard() {
    let SavedMovie;
    const { pathname } = useLocation();
    SavedMovie = pathname === '/saved-movies';

    return (
        <>
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic1} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButton} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >


            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic2} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButtonSaved} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButton} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic3} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButton} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic3} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButton} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic3} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButton} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic3} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButton} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>В погоне за Бенкси</h3>
                        <p className='moviecard__duration'>27 минут</p>
                    </div>
                    <img className='moviecard__pic' src={Pic3} alt="ntcn" />
                    {SavedMovie ? (
                        <button className='moviecard__button'>
                            <img src={SaveButtonDelete} alt='кнопка удаления фильмов из сохранённых' />
                        </button>
                    ) : (
                        <button className='moviecard__button' ><img src={SaveButton} alt='кнопка Сохранить' /></button>
                    )}
                </div>
            </section >
        </>
    );
};

export default MoviesCard;