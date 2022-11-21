import React from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as apiAuth from '../../utils/apiAuth';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';


function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [initialCards, setInitialCards] = React.useState([]);
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState(null);

    // eslint-disable-next-line no-unused-vars
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSearched, setIsSearched] = React.useState(false);
    const [isSearchedSavedMovie, setIsSearchedSavedMovie] = React.useState(false);
    const [isShortSavedMovie, setIsShortSavedMovie] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isSaved, setIsSaved] = React.useState(false);

    const [isShortMovieTumb, setIsShortMovieTumb] = React.useState(
        localStorage.getItem('isShortMovieTumb')
            ? JSON.parse(localStorage.getItem('isShortMovieTumb'))
            : false);

    const [isShortSavedMovieTumb, setIsShortSavedMovieTumb] = React.useState(
        localStorage.getItem('isShortSavedMovieTumb')
            ? JSON.parse(localStorage.getItem('isShortSavedMovieTumb'))
            : false);

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

    let initialSavedCardsValue;

    if (JSON.parse(localStorage.getItem('isShortSavedMovieTumb'))) {
        if (localStorage.getItem('savedMovies')) {
            initialSavedCardsValue = JSON.parse(localStorage.getItem('savedMovies')).filter((item) => item.duration < 40)
        } else {
            initialSavedCardsValue = [];
        }
    } else {
        if (localStorage.getItem('savedMovies')) {
            initialSavedCardsValue = JSON.parse(localStorage.getItem('savedMovies'))
        } else {
            initialSavedCardsValue = [];
        }
    }

    const [savedMovies, setSavedMovies] = React.useState(initialSavedCardsValue);

    function handleTokenCheck() {
        // если у пользователя есть токен в localStorage, 
        // эта функция проверит, действующий он или нет
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            apiAuth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setEmail(res.data.email);
                        history.push('/');
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`)
                })
        }
    }

    React.useEffect(() => {
        handleTokenCheck()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleRegister(name, email, password) {
        setIsLoading(true);
        apiAuth.register(name, email, password)
            .then(() => {
                setIsRegistered(true);
                history.push('/signin');
            })
            .catch((err) => {
                setIsRegistered(false);
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleLogin(email, password) {
        setIsLoading(true);
        apiAuth.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    handleTokenCheck();
                    setLoggedIn(true);
                    setEmail(email);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() =>
                setIsLoading(false));
    }

    function handleLogout() {
        apiAuth.logoff()
            .then(() => {
                setLoggedIn(false);
                setCurrentUser({
                    name: '',
                    email: '',
                });
                window.localStorage.clear();
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function showMessage(message) {
        setMessage(message);
        setTimeout(() => setMessage(''), 10000);
    }

    React.useEffect(() => {
        if (loggedIn === true) {
            setIsLoading(true);
            mainApi.getUserInfo()
                .then((userInfo) => {
                    setCurrentUser(userInfo.data);
                })
                .catch((err) => {
                    console.log(`${err}`);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
    }, [loggedIn]);

    function handleUpdateUser(data) {
        setIsLoading(true);
        mainApi.editUserInfo(data)
            .then((res) => {
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                setCurrentUser(res.data);
                showMessage('Данные успешно обновлены');
            })
            .catch((err) => {
                if (err === 'Ошибка: 500') {
                    return showMessage('Сервер не отвечает');
                } else if (err === 'Ошибка: 400') {
                    showMessage('Внесены некорректные данные');
                } else if (err === 'Ошибка: 409') {
                    return showMessage('Пользователь с таким email уже существует');
                }
                console.log(`${err}`);
            })
            .finally(() =>
                setIsLoading(false));
    }

    function handleSaveMovie(card) {
        mainApi.saveMovie(card)
            .then((res) => {
                localStorage.setItem('savedMovies', JSON.stringify([res, ...savedMovies]));
                setSavedMovies([res, ...savedMovies]);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteMovie(card) {
        const movieDeleted = savedMovies.filter((item) => item.nameRU.toLowerCase() === card.nameRU.toLowerCase());
        mainApi.deleteMovie(movieDeleted[0]._id)
            .then(() => {
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((i) => i._id !== movieDeleted[0]._id)));
                setSavedMovies(savedMovies.filter((i) => i._id !== movieDeleted[0]._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleSubmit(searchValue, isSaved) {
        if (!isSearched) {
            setIsLoading(true);
            new Promise(() => {
                moviesApi.getMovies()
                    .then((data) => {
                        if (isSaved === true) {
                            isShortSavedMovie
                                ? setSavedMovies(
                                    JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
                                        return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                                    })
                                )
                                : setSavedMovies(
                                    JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
                                        return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                                    })
                                );
                        } else {
                            localStorage.setItem('searchedCards', JSON.stringify(data.filter((item) => {
                                return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                            })
                            ));
                            setMoviesCards(
                                data.filter((item) => {
                                    return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                                })
                            );
                        }
                        setInitialCards(data);
                    })
                    .finally(() => setIsLoading(false));
            })
                .catch((err) => {
                    console.log(`${err}`);
                });
        }

        setIsSearchedSavedMovie(searchValue);

        if (isSaved === true) {
            isShortSavedMovie
                ? setSavedMovies(
                    JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
                        return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                    })
                )
                : setSavedMovies(
                    JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
                        return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                    })
                );
        } else {
            localStorage.setItem('searchedCards', JSON.stringify(initialCards.filter((item) => {
                return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
            })
            )
            );
            setMoviesCards(
                initialCards.filter((item) => {
                    return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                })
            );
        }
        setIsSearched(true);
    }

    function isShortMovie(value, isSaved) {

        if (isSaved) {
            setIsShortSavedMovieTumb(value);
            localStorage.setItem('isShortSavedMovieTumb', value);
        } else {
            setIsShortMovieTumb(value);
            localStorage.setItem('isShortMovieTumb', value);
        }

        setIsShortSavedMovie(value);
        if (isSaved === true) {
            if (isSearchedSavedMovie) {
                value
                    ? setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration < 40 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)))
                    : setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration > 0 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)));
            } else {
                value ? setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration < 40)) : setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration > 0));
            }
        } else {
            value ? setMoviesCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40)) : setMoviesCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <>
                <Switch>
                    <Route path="/" exact>
                        <Main loggedIn={loggedIn} />
                    </Route>
                    <ProtectedRoute
                        path="/movies"
                        component={Movies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        moviesCards={moviesCards}
                        handleSubmit={handleSubmit}
                        isShortMovie={isShortMovie}
                        handleSaveMovie={handleSaveMovie}
                        deleteMovie={deleteMovie}
                        isSearched={isSearched}
                        isShortMovieTumb={isShortMovieTumb}
                        savedMovies={savedMovies}
                    />
                    <ProtectedRoute
                        path="/saved-movies"
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        isSearched={isSearched}
                        handleSubmit={handleSubmit}
                        isShortMovie={isShortMovie}
                        deleteMovie={deleteMovie}
                        isShortSavedMovieTumb={isShortSavedMovieTumb}
                        savedMovies={savedMovies}
                    />
                    <ProtectedRoute
                        path="/profile"
                        component={Profile}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        onUpdateUser={handleUpdateUser}
                        onSignout={handleLogout}
                        message={message}
                    />
                    <Route path="/signup">
                        <Register onRegister={handleRegister} isLoading={isLoading} />
                    </Route>
                    <Route path="/signin">
                        <Login onLogin={handleLogin} isLoading={isLoading} />
                    </Route>
                    <Route
                        path='*'>
                        <NotFound />
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/signup' />}
                    </Route>
                </Switch>
            </>
        </CurrentUserContext.Provider >
    );
}

export default App;