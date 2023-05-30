import React, { useContext, useEffect, useState, useCallback } from 'react';
import { GenreContext } from '../../contexts/genreContext/GenreContext';
import './moviegenres.css';

const API_URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=2ada23b09a1350182a469aee846b3f9c`;

export const MovieGenres = ({ setMovies }) => {
  const { selectedGenre, setSelectedGenre } = useContext(GenreContext);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);

  const fetchMovies = useCallback(async (genreId) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=2ada23b09a1350182a469aee846b3f9c&with_genres=${genreId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }, [setMovies]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchMovies(selectedGenre);
    }
  }, [selectedGenre, fetchMovies]);

  useEffect(() => {
    setActiveGenre(selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="genres-container">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className={`genre-item ${activeGenre === genre.id ? 'active' : ''}`}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};
