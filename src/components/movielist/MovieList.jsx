import React, { useState, useEffect } from 'react';
import { MovieBox } from '../moviebox/MovieBox';
import './movieList.css';
import { FiSearch } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import { MovieGenres } from '../movieGenres/MovieGenres';
import { GenreProvider } from '../../contexts/genreContext/GenreContext';
import { ImageSlider } from '../imageSlider/ImageSlider';
import { animateScroll } from 'react-scroll';

export const MovieList = ({ listDescRef }) => {
  const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=2ada23b09a1350182a469aee846b3f9c';
  const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=2ada23b09a1350182a469aee846b3f9c&query=';

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleAddToWatchlist = (movie) => {
    const existingWatchlist = localStorage.getItem('watchlist');

    const watchlist = existingWatchlist ? JSON.parse(existingWatchlist) : [];

    const isMovieInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (!isMovieInWatchlist) {
      watchlist.push(movie);

      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      let url = searchTerm ? `${API_SEARCH}${searchTerm}` : API_URL;
      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [searchTerm, selectedGenre]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.elements.search.value);
    e.target.reset();
    animateScroll.scrollTo('search-section', {
      smooth: true,
      duration: 500,
      offset: -100,
    });
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedGenre(null);
  };

  return (
    <GenreProvider value={selectedGenre}>
      <div className="homepage-main">
        <div className="searchbox-wrapper" ref={listDescRef} name="search-section">
          <form className="search-box" onSubmit={handleSearch}>
            <input type="search" name="search" placeholder="Movie Search" className="search-txt" />
            <button type="submit" className="search-btn">
              <FiSearch />
            </button>
          </form>
        </div>
        <MovieGenres onGenreChange={handleGenreChange} setMovies={setMovies} />
        <ImageSlider />
        {searchTerm || selectedGenre ? (
          <div  onClick={handleClear} className="list-desc">
            Clear <span className="x-span"><MdClear /></span>
          </div>
        ) : (
          <div className="list-desc" >Popular Now</div>
        )}
        {movies.length > 1 ? (
          <div className="main-container">
            {movies.map((movie) => (
              <MovieBox key={movie.id} {...movie} onAddToWatchlist={handleAddToWatchlist} />
            ))}
          </div>
        ) : (
          <div>
            <div className="movie-not-found">There are no movies in this genre yet!</div>
          </div>
        )}
      </div>
    </GenreProvider>
  );
};
