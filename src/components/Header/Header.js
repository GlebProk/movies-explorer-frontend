import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './Header.css';
import './../App/App.css';
import Logo from '../../images/logo.svg';
import ProfileIcon from '../../images/ProfileIcon.svg';
import Burger from '../../images/burger_menu.svg';
import CloseButton from '../../images/burger_close.svg';


function Header({ loggedIn }) {
    const isTablet = window.matchMedia('(max-width: 768px)').matches;
    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

    function handleOpenBurgerMenu() {
        setIsBurgerMenuOpened(true);
    }

    function handleCloseBurgerMenu() {
        setIsBurgerMenuOpened(false);
    }

    return (
        <header className="header">
            <Switch>
                <Route exact path="/">
                    <header className="header">
                        {!loggedIn ? (
                            <div className='header__section'>
                                <Link to='/'>
                                    <img className="header__logo" src={Logo} alt="логотип" />
                                </Link>
                                <div className='header__nav'>
                                    <Link to='/signup' className='header__link'>Регистрация</Link>
                                    <button className='header__button' type="button">
                                        <Link to='/signin' className='header__button_link'>Войти</Link>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='header__section_loggedIn'>
                                    <Link to='/'>
                                        <img className="header__logo" src={Logo} alt="логотип" />
                                    </Link>
                                    <div className='header__nav_loggedIn'>
                                        <Link to='/movies' className='header__link_loggedIn'>
                                            Фильмы
                                        </Link>
                                        <Link to='/saved-movies' className='header__link_loggedIn'>
                                            Сохранённые фильмы
                                        </Link>
                                    </div>
                                    <Link to='/profile' className='header__link_profile'>
                                        <p className='header__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'>
                                            <img className='header__link_profile_image' src={ProfileIcon} alt='значок аккаунта' />
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )}

                    </header>
                </Route>

                <Route path="/movies">
                    <header className="header header_loggedIn">
                        <div className='header__section_loggedIn'>
                            <Link to='/'>
                                <img className="header__logo" src={Logo} alt="логотип" />
                            </Link>
                            {isTablet ? (
                                <button onClick={handleOpenBurgerMenu} className='header__button-burger' type="button">
                                    <img src={Burger} alt='кнопка скрытого меню' />
                                </button>
                            ) : (
                                <>
                                    <div className='header__nav_loggedIn'>
                                        <Link to='/movies' className='header__link_loggedIn'>
                                            Фильмы
                                        </Link>
                                        <Link to='/saved-movies' className='header__link_loggedIn'>
                                            Сохранённые фильмы
                                        </Link>
                                    </div>
                                    <Link to='/profile' className='header__link_profile'>
                                        <p className='header__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'>
                                            <img className='header__link_profile_image' src={ProfileIcon} alt='значок аккаунта' />
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className={`burger__overlay ${isBurgerMenuOpened ? '_showed' : ''}`}>
                            <div className={`burger-menu ${isBurgerMenuOpened ? '_opened' : ''}`}>
                                <button onClick={handleCloseBurgerMenu} className='burger__close-button' type="button">
                                    <img src={CloseButton} alt='кнопка закрытия скрытого меню' />
                                </button>
                                <div className='burger-menu__links'>
                                    <Link to='/' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Главная
                                    </Link>
                                    <Link to='/movies' className='burger-menu__link _active' onClick={handleCloseBurgerMenu}>
                                        Фильмы
                                    </Link>
                                    <Link to='/saved-movies' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Сохранённые фильмы
                                    </Link>
                                    <Link to='/profile' className='burger-menu__link_profile' onClick={handleCloseBurgerMenu}>
                                        <p className='burger-menu__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'>
                                            <img className='burger-menu__link_profile_image' src={ProfileIcon} alt='значок аккаунта' />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                </Route >

                <Route path="/saved-movies">
                    <header className="header header_loggedIn">
                        <div className='header__section_loggedIn'>
                            <Link to='/'>
                                <img className="header__logo" src={Logo} alt="логотип" />
                            </Link>
                            {isTablet ? (
                                <button onClick={handleOpenBurgerMenu} className='header__button-burger' type="button">
                                    <img src={Burger} alt='кнопка скрытого меню' />
                                </button>
                            ) : (
                                <>
                                    <div className='header__nav_loggedIn'>
                                        <Link to='/movies' className='header__link_loggedIn'>
                                            Фильмы
                                        </Link>
                                        <Link to='/saved-movies' className='header__link_loggedIn'>
                                            Сохранённые фильмы
                                        </Link>
                                    </div>
                                    <Link to='/profile' className='header__link_profile'>
                                        <p className='header__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'>
                                            <img className='header__link_profile_image' src={ProfileIcon} alt='значок аккаунта' />
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className={`burger__overlay ${isBurgerMenuOpened ? '_showed' : ''}`}>
                            <div className={`burger-menu ${isBurgerMenuOpened ? '_opened' : ''}`}>
                                <button onClick={handleCloseBurgerMenu} className='burger__close-button' type="button">
                                    <img src={CloseButton} alt='кнопка закрытия скрытого меню' />
                                </button>
                                <div className='burger-menu__links'>
                                    <Link to='/' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Главная
                                    </Link>
                                    <Link to='/movies' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Фильмы
                                    </Link>
                                    <Link to='/saved-movies' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Сохранённые фильмы
                                    </Link>
                                    <Link to='/profile' className='burger-menu__link_profile' onClick={handleCloseBurgerMenu}>
                                        <p className='burger-menu__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'>
                                            <img className='burger-menu__link_profile_image' src={ProfileIcon} alt='значок аккаунта' />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                </Route>

                <Route path="/profile">
                    <header className="header header_loggedIn">
                        <div className='header__section_loggedIn'>
                            <Link to='/'>
                                <img className="header__logo" src={Logo} alt="логотип" />
                            </Link>
                            {isTablet ? (
                                <button onClick={handleOpenBurgerMenu} className='header__button-burger' type="button">
                                    <img src={Burger} alt='кнопка скрытого меню' />
                                </button>
                            ) : (
                                <>
                                    <div className='header__nav_loggedIn'>
                                        <Link to='/movies' className='header__link_loggedIn'>
                                            Фильмы
                                        </Link>
                                        <Link to='/saved-movies' className='header__link_loggedIn'>
                                            Сохранённые фильмы
                                        </Link>
                                    </div>
                                    <Link to='/profile' className='header__link_profile'>
                                        <p className='header__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'>
                                            <img className='header__link_profile_image' src={ProfileIcon} alt='значок аккаунта' />
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className={`burger__overlay ${isBurgerMenuOpened ? '_showed' : ''}`}>
                            <div className={`burger-menu ${isBurgerMenuOpened ? '_opened' : ''}`}>
                                <button onClick={handleCloseBurgerMenu} className='burger__close-button' type="button">
                                    <img src={CloseButton} alt='кнопка закрытия скрытого меню' />
                                </button>
                                <div className='burger-menu__links'>
                                    <Link to='/' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Главная
                                    </Link>
                                    <Link to='/movies' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Фильмы
                                    </Link>
                                    <Link to='/saved-movies' className='burger-menu__link' onClick={handleCloseBurgerMenu}>
                                        Сохранённые фильмы
                                    </Link>
                                    <Link to='/profile' className='burger-menu__link_profile' onClick={handleCloseBurgerMenu}>
                                        <p className='burger-menu__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'>
                                            <img className='burger-menu__link_profile_image' src={ProfileIcon} alt='значок аккаунта' />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                </Route>
            </Switch >
        </header >

    );
}

export default Header;