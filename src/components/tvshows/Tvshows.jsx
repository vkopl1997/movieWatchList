import React, { useState, useEffect } from 'react';
import './tvshows.css';
import { FiSearch } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import { TvShowBox } from '../tvshobox/TvShowBox';

export const Tvshows = () => {
  const API_URL = 'https://api.themoviedb.org/3/tv/popular?api_key=2ada23b09a1350182a469aee846b3f9c';
  const API_SEARCH = 'https://api.themoviedb.org/3/search/tv?api_key=2ada23b09a1350182a469aee846b3f9c&query=';

  const [tvShows, setTVShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTVShows = async () => {
      const url = searchTerm ? `${API_SEARCH}${searchTerm}` : API_URL;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTVShows(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTVShows();
  }, [searchTerm]);

  const handleAddToWatchlist = (movie) => {
    const existingWatchlist = localStorage.getItem('watchlist');

    const watchlist = existingWatchlist ? JSON.parse(existingWatchlist) : [];

    const isMovieInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (!isMovieInWatchlist) {
      watchlist.push(movie);

      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.elements.search.value);
    e.target.reset();
  };

  return (
    <div className='homepage-main'>
      <div className="searchbox-wrapper">
        <form className="search-box" onSubmit={handleSearch}>
          <input type="search" name="search" placeholder='TV Show Search' className='search-txt' />
          <button type="submit" className='search-btn'> <FiSearch /></button>
        </form>
      </div>

      {
        searchTerm ? <div onClick={()=>setSearchTerm('')} className="list-desc">Clear <span className='x-span'><MdClear/></span></div> :
        <div className="list-desc-tv">Popular TV Shows</div>
      }
      <div className='main-container-tv'>
        {tvShows.map((tvShow) => <TvShowBox key={tvShow.id} {...tvShow} onAddToWatchlist={handleAddToWatchlist} />)}
      </div>
    </div>
  );
};
