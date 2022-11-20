import React from 'react';
import { debounce } from 'lodash';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { LargeWindowSize, MediumWindowSize, SmallWindowSize } from '../../utils/consts';

function MoviesCardList(props) {
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);

    function moviesCount() {
        if (windowSize >= LargeWindowSize) return { count: 12, more: 3 };
        if (windowSize >= MediumWindowSize) return { count: 8, more: 2 };
        if (windowSize >= SmallWindowSize) return { count: 5, more: 1 };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handler = React.useCallback(
        debounce(function () {
            setWindowSize(window.innerWidth);
        }, 500),
        []
    );

    const onChange = () => {
        handler();
    };

    React.useEffect(() => {
        const newMovies = props?.moviesCards?.slice(0, moviesCount().count);
        setFilteredMovies(newMovies);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.moviesCards, windowSize]);

    React.useEffect(() => {
        window.addEventListener('resize', onChange);
        return () => {
            window.removeEventListener('resize', onChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onMoreButtonClick = () => {
        setFilteredMovies(props?.moviesCards?.slice(0, (filteredMovies.length += moviesCount().more)));
    };

    return (
        <section className='movies-cardlist'>
            <section className='movies-cardlist__section'>
                {props.isSearched && props.moviesCards.length === 0 && !props.isLoading
                    ? (<p className='cards__not-found'>Ничего не найдено</p>)
                    : <ul className='cards__list'>
                        {props?.moviesCards?.reduce((filmsBatch, item) => {
                            if (filmsBatch?.length < filteredMovies?.length) {
                                filmsBatch.push(
                                    <MoviesCard
                                        handleSaveMovie={props.handleSaveMovie}
                                        movieCard={item}
                                        key={item.id}
                                        savedMovies={props.savedMovies}
                                        deleteMovie={props.deleteMovie}
                                        isSaved={props?.savedMovies?.some((card) => card.nameRU.toLowerCase() === item.nameRU.toLowerCase())}
                                    />
                                );
                            }
                            return filmsBatch;
                        }, [])}
                    </ul>
                }
                <div className='more'>
                    {props?.moviesCards?.length > filteredMovies?.length
                        ? (
                            <button className='more__button' onClick={onMoreButtonClick} type='button'>
                                Ещё
                            </button>
                        ) : null}
                </div>
            </section>
        </section>
    );
}

export default MoviesCardList;