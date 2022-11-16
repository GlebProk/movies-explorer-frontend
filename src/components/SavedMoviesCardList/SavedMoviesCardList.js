import MoviesCard from '../MoviesCard/MoviesCard.js';
import './SavedMoviesCardList.css';

function SavedMoviesCardList() {
    return (
        <section className='movies-cardlist'>
            <section className='movies-cardlist__section'>
                <ul className='cards__list'>
                    <MoviesCard />
                </ul>
                <div className='more'>
                    <button className='more__button' type='button'>
                        Ещё
                    </button>
                </div>
            </section>
        </section>
    );
}

export default SavedMoviesCardList;