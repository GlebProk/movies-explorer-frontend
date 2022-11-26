import React from 'react';
import { debounce } from 'lodash';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
    PC_WINDOW_SIZE,
    TABLET_WINDOW_SIZE,
    MOBILE_WINDOW_SIZE,

    PC_CARD_COUNT,
    TABLET_CARD_COUNT,
    MOBILE_CARD_COUNT,

    PC_CARD_COUNT_MORE,
    TABLET_CARD_COUNT_MORE,
    MOBILE_CARD_COUNT_MORE
} from '../../utils/consts';

function MoviesCardList(props) {
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);

    function moviesCount() {
        if (windowSize >= PC_WINDOW_SIZE) return { count: PC_CARD_COUNT, more: PC_CARD_COUNT_MORE };
        if (windowSize >= TABLET_WINDOW_SIZE) return { count: TABLET_CARD_COUNT, more: TABLET_CARD_COUNT_MORE };
        if (windowSize >= MOBILE_WINDOW_SIZE) return { count: MOBILE_CARD_COUNT, more: MOBILE_CARD_COUNT_MORE };
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
                {props.moviesCards.length === 0
                    ? <p className='cards__not-found'>Ничего не найдено</p>
                    : <ul className='cards__list'>
                        {props?.moviesCards?.reduce((filmsBatch, item) => {
                            if (filmsBatch?.length < filteredMovies?.length) {
                                filmsBatch.push(
                                    <MoviesCard
                                        movieCard={item}
                                        key={item.id}
                                        handleSaveMovie={props.handleSaveMovie}
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
                {props.moviesCards.length === 0
                    ? <div className='more'></div>
                    : <div className='more'>
                        {props?.moviesCards?.length > filteredMovies?.length
                            ? (
                                <button className='more__button' onClick={onMoreButtonClick} type='button'>
                                    Ещё
                                </button>
                            ) : null}
                    </div>
                }
            </section>
        </section>
    );
}

export default MoviesCardList;