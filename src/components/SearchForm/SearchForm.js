import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import SearchIcon from '../../images/find.svg';
import Preloader from '../Preloader/Preloader';

function SearchForm(props) {
    const [isShortMovie, setIsShortMovie] = React.useState(props.isShortMovieTumb);
    const [isShowError, setIsShowError] = React.useState(false);
    const { values, handleChange, isValid, setIsValid, setValues } = useFormWithValidation({ keyWord: '' });
    const location = useLocation();
    const [searchValue, setSearchValue] = React.useState('');

    function handlePick() {
        //props.isShortMovie(!isShortMovie);
        props.isShortMovie(!props.isShortMovieTumb);
        setIsShortMovie(!isShortMovie);
    }

    React.useEffect(() => {
        if (location.pathname === '/movies') {
            setSearchValue(localStorage.getItem('search-text'));
            setValues({ keyWord: searchValue });
        }
        if (searchValue !== '') {
            setIsValid(true);
        }

    }, [location.pathname, setValues, searchValue, setIsValid]);


    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isValid) {
            props.handleSubmit(values.keyWord, props.isShortMovie);
        } else {
            setIsShowError(true);
        }

        if (location.pathname === '/movies') {
            localStorage.setItem('search-text', values.keyWord);
        }
    };

    React.useEffect(() => {
        setIsShowError(false);
    }, [isValid]);

    return (
        <>
            <section className='search'>
                <div className='search__container'>
                    <form onSubmit={handleSubmit} className='search__form' noValidate>
                        <div className='search__input-block'>
                            <input className='search__input'
                                type='text'
                                name='keyWord'
                                value={values.keyWord || ''}
                                id='search'
                                onChange={handleChange}
                                placeholder='Фильм'
                                minLength='1'
                                maxLength='100'
                                required
                            />
                            <button className='search__button' type='submit'><img src={SearchIcon} alt='иконка кнопки поиска' /></button>
                        </div>
                        {isShowError ? (<p className='search__input_error'>Нужно ввести ключевое слово</p>) : null}
                    </form>
                    <div className='search__short'>
                        <div onClick={handlePick}
                            className='search__short_button'>
                            <div
                                className={`search__short_tumb ${!props.isShortMovieTumb ? '_isChoosenButton' : ''}`}>
                            </div>
                        </div>
                        <p className='search__short_title'>Короткометражки</p>
                    </div>
                </div>
            </section>
            {props.isLoading ? <Preloader /> : null}
        </>

    );
};

export default SearchForm; 