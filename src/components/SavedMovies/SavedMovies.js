import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isShortMovie, isShortSavedMovieTumb, isSearched, isLoading,
  handleSubmit, savedMovies, deleteMovie }) {
  return (
    <>
      <Header />
      <main className='movies'>
        <SearchForm
          isSaved={true}
          moviesCards={savedMovies}
          isShortMovieTumb={isShortSavedMovieTumb}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          isShortMovie={isShortMovie}
        />
        <SavedMoviesCardList
          isSaved={true}
          moviesCards={savedMovies}
          isSearched={isSearched}
          isLoading={isLoading}
          deleteMovie={deleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;