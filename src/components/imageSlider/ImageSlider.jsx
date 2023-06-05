import React, { useEffect, useState } from 'react';
import './imageSlider.css';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=2ada23b09a1350182a469aee846b3f9c`;
const API_IMG = 'https://image.tmdb.org/t/p/w500';

export const ImageSlider = ({onAddToWatchlist}) => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');
  const [buttonText, setButtonText] = useState('Add to Watchlist');


  useEffect(() => {
    let isMounted = true;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setImages(data.results);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleAddToWatchlist = () => {
    const movie = { 
      id: currentImage.id,
      title: currentImage.title,
      poster_path: currentImage.poster_path,
    };
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const isMovieInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (isMovieInWatchlist) {
      setButtonText('Already Added!');
      return;
    }
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));

  setButtonText('Added!');
  setTimeout(() => {
    setButtonText('Add to Watchlist');
  }, 2000);
  };

  const currentImage = images.length > 0 ? images[currentImageIndex] : null;
  return (
    <div className='slide-container'>
      {currentImage && (
        <div
          className='image-slide active'
          style={{ backgroundImage: `url(${API_IMG + currentImage.poster_path})` }}
        >
            <div className="image-title">{currentImage.title}</div>
            <div className="image-more-info">
              <div className="image-popularity">Popularity: {currentImage.popularity}</div>
              <div className="image-date">Release Date: {currentImage.release_date}</div>
              <div className="image-date">IMDB: {currentImage.vote_average}</div>
            </div>
            <div className="image-desc">{currentImage.overview}</div>
            {isAuthenticated ? <button className='image-btn' onClick={handleAddToWatchlist}>{buttonText}</button> :'' }
        </div>
      )}
      <div className='arrow-left' onClick={goToPreviousImage}>
        <BsChevronCompactLeft size={35} />
      </div>
      <div className='arrow-right' onClick={goToNextImage}>
        <BsChevronCompactRight size={35} />
      </div>
      
    </div>
  );
};
