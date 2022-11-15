import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import './App.css';



function App() {

  return (
    <CurrentUserContext.Provider>
      <>
        <Switch>
          <Route
            path="/" exact
            component={Main}
          />
          <Route
            path="/movies"
            component={Movies}
          />
          <Route
            path="/saved-movies"
            component={SavedMovies}
          />
          <Route
            path="/profile"
            component={Profile}
          />
          <Route path="/signup"
            component={Register}
          />
          <Route path="/signin"
            component={Login}
          />
          <Route path="*"
            component={NotFound}
          />
        </Switch>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
