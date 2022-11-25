import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';

import mainApi from '../../utils/MainApi';

function SavedMovies(
  { isSearched, isLoading, deleteMovie, setIsLoading, savedMovies, setSavedMovies, handleLogout }) {

  const [moviesList, setMoviesList] = React.useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);
  const [searchBarText, setSearchBarText] = React.useState('');
  const [isShortSavedMovieTumb, setIsShortSavedMovieTumb] = React.useState(false);

  React.useEffect(() => {
    setMoviesList(savedMovies);
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
    console.log(searchMovies);

    setSearchBarText(searchBarText);
    setMoviesList(searchMovies);
    setSearchedSavedMovies(searchMovies);
  }

  /*function isShortSavedMovie(value) {
    setIsShortSavedMovieTumb(value);
    localStorage.setItem('isShortSavedMovieTumb', value);
  }*/

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
        return item.duration < 40 && item.nameRU.toLowerCase().includes(searchBarText.trim().toLowerCase());
      });
    } else {
      return savedMovies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchBarText.trim().toLowerCase());
      })
    }
  }

  /*setIsLoading(true);
  console.log(savedMovies);
  if (isShortSavedMovieTumb) {
    console.log(setSearchedSavedMovies(
      savedMovies.filter((item) => {
        return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
      })
    ));
  } else {
    console.log(setSearchedSavedMovies(
      savedMovies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
      })
    ));
  };
  setIsLoading(false);
}

/*function handleSearch(savedMovies, searchValue, isShortSavedMovieTumb) {
  getSearchMovieList(savedMovies, searchValue, isShortSavedMovieTumb);
}*/

return (
  <>
    <Header />
    <main className='movies'>
      <SearchForm
        isSaved={true}
        moviesCards={savedMovies}
        isShortMovieTumb={isShortSavedMovieTumb}
        isLoading={isLoading}
        handleSubmit={handleSearch}
        isShortMovie={setIsShortSavedMovieTumb}
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