import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './Header.css';
import './../App/App.css';
import Logo from '../../images/logo.svg';
import ProfileIcon from '../../images/ProfileIcon.svg';
import Burger from '../../images/burger_menu.svg';
import CloseButton from '../../images/burger_close.svg';



function Header() {
    const isTablet = window.matchMedia('(max-width: 1023px)').matches;
    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

    function handleOpenBurger() {
        setIsBurgerMenuOpened(true);
    }

    function handleCloseBurger() {
        setIsBurgerMenuOpened(false);
    }

    return (
        <header className="header">
            <Switch>

                <Route exact path="/">
                    <header className="header">
                        <div className='header__section'>
                            <img className="header__logo" src={Logo} alt="логотип" />
                            <div className='header__nav'>
                                <Link to='/signup' className='header__link'>Регистрация</Link>
                                <button className='header__button'>
                                    <Link to='/signin' className='header__button_link'>Войти</Link>
                                </button>
                            </div>
                        </div>
                    </header>
                </Route>

                <Route path="/movies">
                    <header className="header header_loggedIn">
                        <div className='header__section_loggedIn'>
                            <img className="header__logo" src={Logo} alt="логотип" />
                            {isTablet ? (
                                <button onClick={handleOpenBurger} className='header__button-burger'>
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
                                <button className='burger__close-button' onClick={handleCloseBurger}>
                                    <img src={CloseButton} alt='кнопка закрытия скрытого меню' />
                                </button>
                                <div className='burger-menu__links'>
                                    <Link to='/' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Главная
                                    </Link>
                                    <Link to='/movies' className='burger-menu__link _active' onClick={handleCloseBurger}>
                                        Фильмы
                                    </Link>
                                    <Link to='/saved-movies' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Сохранённые фильмы
                                    </Link>
                                    <Link to='/profile' className='burger-menu__link_profile' onClick={handleCloseBurger}>
                                        <p className='burger-menu__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'><img className='burger-menu__link_profile_image' src={ProfileIcon} alt='значок аккаунта' /></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                </Route >

                <Route path="/saved-movies">
                    <header className="header header_loggedIn">
                        <div className='header__section_loggedIn'>
                            <img className="header__logo" src={Logo} alt="логотип" />
                            {isTablet ? (
                                <button onClick={handleOpenBurger} className='header__button-burger'>
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
                                <button className='burger__close-button' onClick={handleCloseBurger}>
                                    <img src={CloseButton} alt='кнопка закрытия скрытого меню' />
                                </button>
                                <div className='burger-menu__links'>
                                    <Link to='/' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Главная
                                    </Link>
                                    <Link to='/movies' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Фильмы
                                    </Link>
                                    <Link to='/saved-movies' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Сохранённые фильмы
                                    </Link>
                                    <Link to='/profile' className='burger-menu__link_profile' onClick={handleCloseBurger}>
                                        <p className='burger-menu__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'><img className='burger-menu__link_profile_image' src={ProfileIcon} alt='значок аккаунта' /></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                </Route>

                <Route path="/profile">
                    <header className="header header_loggedIn">
                        <div className='header__section_loggedIn'>
                            <img className="header__logo" src={Logo} alt="логотип" />
                            {isTablet ? (
                                <button onClick={handleOpenBurger} className='header__button-burger'>
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
                                <button className='burger__close-button' onClick={handleCloseBurger}>
                                    <img src={CloseButton} alt='кнопка закрытия скрытого меню' />
                                </button>
                                <div className='burger-menu__links'>
                                    <Link to='/' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Главная
                                    </Link>
                                    <Link to='/movies' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Фильмы
                                    </Link>
                                    <Link to='/saved-movies' className='burger-menu__link' onClick={handleCloseBurger}>
                                        Сохранённые фильмы
                                    </Link>
                                    <Link to='/profile' className='burger-menu__link_profile' onClick={handleCloseBurger}>
                                        <p className='burger-menu__link_profile_title'>Аккаунт</p>
                                        <div className='header__link_profile_image-box'><img className='burger-menu__link_profile_image' src={ProfileIcon} alt='значок аккаунта' /></div>
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