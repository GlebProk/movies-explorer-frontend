import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies({isLoading, handleSubmit, setSavedMovies, savedMovies, deleteMovie, setIsLoading, handleLogout}) 
{

    let initialCardsValue;

    if (JSON.parse(localStorage.getItem('isShortMovieTumb'))) {
        if (localStorage.getItem('searchedCards')) {
            initialCardsValue = JSON.parse(localStorage.getItem('searchedCards')).filter((item) => item.duration < 40)
        } else {
            initialCardsValue = [];
        }
    } else {
        if (localStorage.getItem('searchedCards')) {
            initialCardsValue = JSON.parse(localStorage.getItem('searchedCards'))
        } else {
            initialCardsValue = [];
        }
    }

    const [moviesCards, setMoviesCards] = React.useState(initialCardsValue);

    const [isShortMovieTumb, setIsShortMovieTumb] = React.useState(
        localStorage.getItem('isShortMovieTumb')
            ? JSON.parse(localStorage.getItem('isShortMovieTumb'))
            : false);

    function isShortMovie(value) {
        setIsShortMovieTumb(value);
        localStorage.setItem('isShortMovieTumb', value);
        value
            ? setMoviesCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40))
            : setMoviesCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
    }

    function handleSaveMovie(card) {
        mainApi.saveMovie(card)
            .then((res) => {
                setSavedMovies([res, ...savedMovies]);
            })
            .catch((err) => {
                console.log(err);
                if (err === 'Ошибка: 401') {
                    handleLogout();
                }
            });
    }

    function deleteMovie(card) {
        const movieDeleted = savedMovies.filter((item) => item.nameRU.toLowerCase() === card.nameRU.toLowerCase());
        mainApi.deleteMovie(movieDeleted[0]._id)
            .then(() => {
                setSavedMovies(savedMovies.filter((i) => i._id !== movieDeleted[0]._id));
            })
            .catch((err) => {
                console.log(err);
                if (err === 'Ошибка: 401') {
                    handleLogout();
                }
            });
    }

    function handleSubmit(searchValue) {
        setIsLoading(true);
        new Promise(() => {
            moviesApi.getMovies()
                .then((data) => {
                    localStorage.setItem('searchedCards', JSON.stringify(data.filter((item) => {
                        return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                    })
                    ));
                    if (isShortMovieTumb) {
                        setMoviesCards(
                            data.filter((item) => {
                                return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                            })
                        );
                    } else {
                        setMoviesCards(
                            data.filter((item) => {
                                return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                            })
                        );
                    }
                })
                .finally(() => setIsLoading(false));
        })
            .catch((err) => {
                console.log(`${err}`);
            });
    }

    return (
        <>
            <Header />
            <main className='movies'>
                <SearchForm
                    moviesCards={moviesCards}
                    isShortMovieTumb={isShortMovieTumb}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    isShortMovie={isShortMovie}
                />
                <MoviesCardList
                    moviesCards={moviesCards}
                    isLoading={isLoading}
                    handleSaveMovie={handleSaveMovie}
                    savedMovies={savedMovies}
                    deleteMovie={deleteMovie}
                />
            </main>
            <Footer />
        </>
    );
}

export default Movies;