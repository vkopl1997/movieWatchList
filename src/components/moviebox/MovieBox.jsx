import React, { useState } from 'react';
import './movieBox.css';
import { Link } from 'react-router-dom';
export const MovieBox = ({
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    overview,
    vote_count,
    onAddToWatchlist
}) => {
  const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');
  const [buttonText, setButtonText] = useState('Add to Watchlist');

  const handleAddToWatchlist = () => {
    const movie = { id, title, poster_path };
    onAddToWatchlist(movie);
    setButtonText('Added!');
    setTimeout(() => {
      setButtonText('Add to Watchlist');
    }, 2000);
  };
    
  const API_IMG = 'https://image.tmdb.org/t/p/w500/'

  return (
    <div className='card'>
        <img src={API_IMG+poster_path} alt={title} className='card-img'/>
        <div className="card-body">
            <h2 className='card-title'>{title}</h2>
            <Link to={`/movie/${id}`}>
              <button className='card-btn'>view more</button>
            </Link>
            {isAuthenticated ? <button className='card-btn' onClick={handleAddToWatchlist}>{buttonText}</button> :'' }
        </div>
     
    </div>
  )
}
