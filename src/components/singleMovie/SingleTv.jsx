import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './singleMovie.css';

export const SingleTVShow = () => {
  const { id } = useParams();
  const API_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=2ada23b09a1350182a469aee846b3f9c`;
  
  const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

  const [buttonText, setButtonText] = useState('Add to Watchlist');

  const [tvShow, setTVShow] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTVShow(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [API_URL]);

  if (!tvShow) {
    return <div>Loading...</div>;
  }

  const {
    name,
    poster_path,
    vote_average,
    first_air_date,
    overview,
    vote_count,
    number_of_seasons,
    number_of_episodes
  } = tvShow;
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';



  const handleAddToWatchlist = () => {
    const existingWatchlist = localStorage.getItem('watchlist');

    const watchlist = existingWatchlist ? JSON.parse(existingWatchlist) : [];

    const isMovieInWatchlist = watchlist.some((item) => item.id === tvShow.id);

    if (!isMovieInWatchlist) {
      watchlist.push(tvShow);

      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setButtonText('Added!');
      setTimeout(() => {
        setButtonText('Add to Watchlist');
      }, 2000);
    }else{
      setButtonText('Already in')
      setTimeout(()=>{
        setButtonText('Add to Watchlist')
      },2000)
    }
    
  };

  return (
    <div
      className="single-movie-main"
      style={{ backgroundImage: `url(${API_IMG + poster_path})`, borderRadius: '10px' }}
    >
      <div className="single-container">
        <div className="sngl-poster">
          <img src={API_IMG + poster_path} alt={name} />
        </div>
        <div className="sngl-info">
          <div className="singlemovie-title">{name}</div>
          <div className="sngl-movie-detail">
            <div className="set">
              <label>First air date</label>
              <span>{first_air_date}</span>
            </div>
            <div className="set">
              <label>Vote average</label>
              <span>{vote_average}</span>
            </div>
            <div className="set">
              <label>Votes</label>
              <span>{vote_count}</span>
            </div>
            <div className="set">
              <label>number of episodes</label>
              <span>{number_of_episodes}</span>
            </div>
            <div className="set">
              <label>number of seasons</label>
              <span>{number_of_seasons}</span>
            </div>
          </div>
          <div className="sngl-movie-description">{overview}</div>
          <div className="buttons-wrapper">
                  <Link to='/tvshows'>
                    <button className='btn-back'>go back</button>
                  </Link>
                  {isAuthenticated ?<button className='btn-back' onClick={handleAddToWatchlist}>
                    {buttonText}
                  </button>: ''}
            </div>
        </div>
      </div>
    </div>
  );
};
