import React from 'react';
import { debounce } from 'lodash';
import './SavedMoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import '../MoviesCardList/MoviesCardList.css';
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

function SavedMoviesCardList(props) {
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
        const newMovies = props?.savedMovies?.slice(0, moviesCount().count);
        setFilteredMovies(newMovies);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.savedMovies, windowSize]);

    React.useEffect(() => {
        window.addEventListener('resize', onChange);
        return () => {
            window.removeEventListener('resize', onChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onMoreButtonClick = () => {
        setFilteredMovies(props.savedMovies.slice(0, (filteredMovies.length += moviesCount().more)));
    };

    return (
        <section className='movies-cardlist'>
            <section className='movies-cardlist__section'>
                {props.savedMovies.length === 0
                    ? (<p className='cards__not-found'>Ничего не найдено</p>)
                    : <ul className='cards__list'>
                        {props?.savedMovies?.reduce((filmsBatch, item) => {
                            if (filmsBatch?.length < filteredMovies?.length) {
                                filmsBatch.push(
                                    <MoviesCard
                                        movieCard={item}
                                        key={item._id}
                                        deleteMovie={props.deleteMovie}
                                        isSaved={true}
                                    />
                                );
                            }
                            return filmsBatch;
                        }, [])}
                    </ul>
                }
                <div className='more'>
                    {props?.savedMovies?.length > filteredMovies?.length
                        ? (
                            <button className='more__button' type='button' onClick={onMoreButtonClick}>
                                Ещё
                            </button>
                        ) : null}
                </div>
            </section>
        </section>
    );
}

export default SavedMoviesCardList;
