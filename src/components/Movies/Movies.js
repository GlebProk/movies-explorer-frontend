import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({
    moviesCards, isShortMovie, isShortMovieTumb, isSearched, isLoading, handleSubmit, handleSaveMovie, savedMovies, deleteMovie
}) {

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
                    isSearched={isSearched}
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