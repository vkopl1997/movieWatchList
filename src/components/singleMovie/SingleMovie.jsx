import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './singleMovie.css';

export const SingleMovie = () => {
  const { id } = useParams();
  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=2ada23b09a1350182a469aee846b3f9c`;

  const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

  const [movie, setMovie] = useState(null);
  const [buttonText, setButtonText] = useState('Add to Watchlist');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [API_URL]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, vote_average, release_date, overview, vote_count } = movie;
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';

  const handleAddToWatchlist = () => {
    const existingWatchlist = localStorage.getItem('watchlist');

    const watchlist = existingWatchlist ? JSON.parse(existingWatchlist) : [];

    const isMovieInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (!isMovieInWatchlist) {
      watchlist.push(movie);

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
    <div className="single-movie-main" style={{ backgroundImage: `url(${API_IMG + poster_path})`, borderRadius: '10px' }}>
      <div className="single-container">
        <div className="sngl-poster">
          <img src={API_IMG + poster_path} alt={title} />
        </div>
        <div className="sngl-info">
          <div className="singlemovie-title">{title}</div>
          <div className="sngl-movie-detail">
            <div className="set">
              <label>Release date</label>
              <span>{release_date}</span>
            </div>
            <div className="set">
              <label>vote average</label>
              <span>{vote_average}</span>
            </div>
            <div className="set">
              <label>votes</label>
              <span>{vote_count}</span>
            </div>
          </div>
          <div className="sngl-movie-description">{overview}</div>
          <div className="buttons-wrapper">
            <Link to="/">
              <button className="btn-back">go back</button>
            </Link>
            {isAuthenticated && (
              <button className="btn-back" onClick={handleAddToWatchlist}>
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
