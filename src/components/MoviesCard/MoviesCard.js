import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import SaveButton from '../../images/save-button.svg';
import SaveButtonSaved from '../../images/save-button_saved.svg';
import SaveButtonDelete from '../../images/save-button_delete.svg';

function MoviesCard(props) {
    const { pathname } = useLocation();
    let SavedMovies = pathname === '/saved-movies';

    function durationMovie(min) {
        let hours = Math.trunc(min / 60);
        let minutes = min % 60;
        if (min >= 60) {
            return hours + 'ч ' + minutes + 'м';
        } else {
            return minutes + 'м';
        }
    }

    function handleSaveMovie() {
        if (props.isSaved) {
            props.deleteMovie(props.movieCard);
        } else if (props.isSaved) {
            props.deleteMovie(props.movieCard);
        } else {
            props.handleSaveMovie(props.movieCard);
        }
    }

    return (
        <>
            <section className='moviecard'>
                <div className='moviecard__block'>
                    <div className='moviecard__info'>
                        <h3 className='moviecard__title'>{props.movieCard.nameRU}</h3>
                        <p className='moviecard__duration'>{durationMovie(props.movieCard.duration)}</p>
                    </div>
                    <a className='moviecard__box' href={props.movieCard.trailerLink} target='_blank' rel="noreferrer"  >
                        <img className='moviecard__pic' src={props.movieCard.image.url ? `https://api.nomoreparties.co${props.movieCard.image.url}` : props.movieCard.image} alt="Кадр из фильма" />
                    </a>
                    {SavedMovies ? (
                        <button className='moviecard__button' type="button" onClick={handleSaveMovie}>
                            <img src={SaveButtonDelete} alt='кнопка "Удалить фильм из сохраненных"' />
                        </button>
                    ) : (
                        <>
                            {props.isSaved ?
                                (
                                    <button className='moviecard__button' type="button" onClick={handleSaveMovie}>
                                        <img src={SaveButtonSaved} alt='кнопка "Фильм сохранен"' />
                                    </button>
                                ) : (
                                    <button className='moviecard__button' type="button" onClick={handleSaveMovie}>
                                        <img src={SaveButton} alt='кнопка "Сохранить фильм"' />
                                    </button>
                                )}
                        </>
                    )}
                </div>
            </section >
        </>
    );
};

export default MoviesCard;