import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

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

export default MoviesCardList;