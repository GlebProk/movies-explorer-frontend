import React from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('isLogin') || false);
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSearchedSavedMovie, setIsSearchedSavedMovie] = React.useState(false);
    const [isShortSavedMovie, setIsShortSavedMovie] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isSaved, setIsSaved] = React.useState(false);

    const [savedMovies, setSavedMovies] = React.useState([]);

    function handleTokenCheck() {
        // если у пользователя есть токен в localStorage, 
        // эта функция проверит, действующий он или нет
        const jwt = localStorage.getItem("jwt");
        console.log(loggedIn);
        if (jwt) {
            apiAuth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        localStorage.setItem('isLogin', true);
                        setLoggedIn(true);
                        setEmail(res.data.email);
                    }
                })
                .catch((err) => {
                    handleLogout();
                    console.log(`Ошибка: ${err}`)
                })
        }
        console.log(loggedIn);
    }

    React.useEffect(() => {
        handleTokenCheck()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleRegister(name, email, password) {
        setIsLoading(true);
        apiAuth.register(name, email, password)
            .then(() => {
                handleLogin(email, password);
            })
            .catch((err) => {
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
                    history.push('/movies');
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
                localStorage.clear();
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

    React.useEffect(() => {
        if (loggedIn === true) {
            setIsLoading(true);
            mainApi.getSavedMovies()
                .then((res) => {
                    console.log(res);
                    setSavedMovies(res || []);
                    localStorage.setItem('savedMovies', JSON.stringify(res || []));
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

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <Switch>
                <Route path="/" exact>
                    <Main loggedIn={loggedIn} />
                </Route>
                <ProtectedRoute
                    path="/movies"
                    component={Movies}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setSavedMovies={setSavedMovies}
                    savedMovies={savedMovies}
                    onSignout={handleLogout}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setSavedMovies={setSavedMovies}
                    savedMovies={savedMovies}
                    onSignout={handleLogout}
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
                    {!loggedIn
                        ? <Register onRegister={handleRegister} isLoading={isLoading} />
                        : <Redirect to='/' />
                    }
                </Route>
                <Route path="/signin">
                    {!loggedIn
                        ? <Login onLogin={handleLogin} isLoading={isLoading} />
                        : <Redirect to='/' />
                    }
                </Route>
                <Route
                    path='*'>
                    <NotFound />
                </Route>
                <Route>
                    {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/signup' />}
                </Route>
            </Switch>

        </CurrentUserContext.Provider >
    );
}

export default App;