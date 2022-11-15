import React from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/find.svg';

function SearchForm() {
    return (
        <>
            <section className='search'>
                <div className='search__container'>
                    <form className='search__form' noValidate>
                        <div className='search__input-block'>
                            <input className='search__input' type='text' name='keyWord'
                                id='search' placeholder='Фильм'
                                autoComplete='off' minLength='1' maxLength='200' required />
                            <button className='search__button' type='submit'><img src={SearchIcon} alt='иконка кнопки поиска' /></button>
                        </div>
                    </form>
                    <div className='search__short'>
                        <div className='search__short_button'>
                            <div className='search__short_tumb'></div>
                        </div>
                        <p className='search__short_title'>Короткометражки</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchForm; 