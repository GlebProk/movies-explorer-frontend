import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';

import { DURATION_SHORT_FILM } from '../../utils/consts';
import mainApi from '../../utils/MainApi';

function SavedMovies(
  { isSearched, isLoading, deleteMovie, savedMovies, setSavedMovies, handleLogout }) {

  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);
  const [searchBarText, setSearchBarText] = React.useState('');
  const [isShortSavedMovieTumb, setIsShortSavedMovieTumb] = React.useState(false);

  React.useEffect(() => {
    setSearchedSavedMovies(savedMovies);
    handleSearch(searchBarText, isShortSavedMovieTumb);
  }, [savedMovies]);

  React.useEffect(() => {
    if (savedMovies && savedMovies.length !== 0) {
      handleSearch(searchBarText, isShortSavedMovieTumb);
    }
  }, [isShortSavedMovieTumb]);

  function handleSearch(searchBarText, isShortSavedMovieTumb) {
    const searchMovies = getSearchMovieList(savedMovies, searchBarText, isShortSavedMovieTumb);
    setSearchBarText(searchBarText);
    setSearchedSavedMovies(searchMovies);
  }

  function deleteMovie(card) {
    const movieDeleted = savedMovies.filter((item) => item.nameRU.toLowerCase() === card.nameRU.toLowerCase());
    mainApi.deleteMovie(movieDeleted[0]._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== movieDeleted[0]._id));
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          handleLogout();
        }
        console.log(err);
      });
  }

  function getSearchMovieList(savedMovies, searchBarText, isShortSavedMovieTumb) {
    if (isShortSavedMovieTumb) {
      return savedMovies.filter((item) => {
        return item.duration < DURATION_SHORT_FILM && item.nameRU.toLowerCase().includes(searchBarText.trim().toLowerCase());
      });
    } else {
      return savedMovies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchBarText.trim().toLowerCase());
      })
    }
  }

  return (
    <>
      <Header />
      <main className='movies'>
        <SearchForm
          isSaved={true}
          moviesCards={savedMovies}
          isShortMovieTumb={isShortSavedMovieTumb}
          setIsShortMovieTumb={setIsShortSavedMovieTumb}
          isLoading={isLoading}
          handleSubmit={handleSearch}
          getSearchMovieList={getSearchMovieList}
        />
        <SavedMoviesCardList
          setSavedMovies={setSavedMovies}
          isSaved={true}
          savedMovies={searchedSavedMovies}
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