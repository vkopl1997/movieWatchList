import React, { useContext, useState } from 'react';
import './navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { GenreContext } from '../../contexts/genreContext/GenreContext';
import { RxAvatar } from 'react-icons/rx';
import { LoginReg } from '../auth/LoginReg';
import { BsFillPersonCheckFill } from 'react-icons/bs';

export const Navbar = ({ onScrollToListDesc }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGenre, setSelectedGenre } = useContext(GenreContext);
  const [showLogin, setShowLogin] = useState(false);
  const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

  const handleActorsClick = () => {
    setSelectedGenre(null);
    const newPath = '/actors';
    navigate(newPath);
  };

  const handleTvClick = () => {
    setSelectedGenre(null);
    const newPath = '/tvShows';
    navigate(newPath);
  };

  const handleMoviesClick = () => {
    setSelectedGenre(null);
    const newPath = '/';
    navigate(newPath);
    window.location.reload(); // Reload the page
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handlePersonalPage = () => {
    const newPath = '/personalPG';
    navigate(newPath);
  };

  return (
    <div className="main">
      <div className="left-side">
        <div onClick={handleMoviesClick} className="title-h2">
          Your Movies
        </div>
      </div>
      <div className="right-side">
      {location.pathname === '/' && (
          <div className="nav-link" onClick={onScrollToListDesc}>
            SEARCH
          </div>
        )}
        <div className="nav-link" onClick={handleTvClick}>
          TV Shows
        </div>
        <div className="nav-link" onClick={handleActorsClick}>
          Actors
        </div>
        {isAuthenticated ? (
          <div className="personpage" onClick={handlePersonalPage}>
            <BsFillPersonCheckFill />
          </div>
        ) : (
          <div className="loginform" onClick={handleLogin}>
            <RxAvatar className="avatar" />
            {selectedGenre}
          </div>
        )}
        {showLogin && (
          <div className="login-overlay">
            <LoginReg setShowLogin={handleLoginClose} handleLoginClose={handleLoginClose} />
          </div>
        )}
      </div>
    </div>
  );
};
