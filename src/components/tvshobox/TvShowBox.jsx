import React,{ useState } from 'react';
import './tvshowbox.css';
import { Link } from 'react-router-dom';

export const TvShowBox = ({
    id,
    name,
    poster_path,
    vote_average,
    first_air_date,
    overview,
    vote_count,
    onAddToWatchlist
}) => {
    const API_IMG = 'https://image.tmdb.org/t/p/w500/';
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');
    
    const [buttonText, setButtonText] = useState('Add to Watchlist');


    const handleAddToWatchlist = () => {
        const movie = { id, name, poster_path };
        onAddToWatchlist(movie);
        setButtonText('Added!');
        setTimeout(() => {
            setButtonText('Add to Watchlist');
        }, 2000);
      };

    return (
        <div className='card'>
            <img src={API_IMG + poster_path} alt={name} className='card-img' />
            <div className="card-body">
                <h2 className='card-title'>{name}</h2>
                <Link to={`/tvshow/${id}`}>
                    <button className='card-btn'>View more</button>
                </Link>
                {isAuthenticated ? <button className='card-btn' onClick={handleAddToWatchlist}>{buttonText}</button> :'' }

            </div>
        </div>
    );
};
