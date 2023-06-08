import React, { useContext, useState ,useEffect} from 'react';
import './navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { GenreContext } from '../../contexts/genreContext/GenreContext';
import { RxAvatar } from 'react-icons/rx';
import { LoginReg } from '../auth/LoginReg';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BsFillSunFill,BsMoonStarsFill} from 'react-icons/bs';
import { ThemeContext } from '../../contexts/themeContext/ThemContext';


export const Navbar = ({ onScrollToListDesc }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGenre, setSelectedGenre } = useContext(GenreContext);
  const [showLogin, setShowLogin] = useState(false);
  const {isLightTheme,toggleTheme} = useContext(ThemeContext);
  const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = isLightTheme ? '#FFFFFF' : '#000000';
  }, [isLightTheme]);

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
  const handleThemeToggle = () =>{
    toggleTheme();
    console.log(isLightTheme);
  }

  return (
    <div className={isLightTheme? 'main navbar-light-main' : 'main'}>
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
          <div className={isLightTheme? 'personpage-white' : "personpage"} onClick={handlePersonalPage}>
            <BsFillPersonCheckFill />
          </div>
        ) : (
          <div className={isLightTheme? "loginform-white" : "loginform"} onClick={handleLogin}>
            <RxAvatar className="avatar" />
            {selectedGenre}
          </div>
        )}
        {showLogin && (
          <div className="login-overlay">
            <LoginReg setShowLogin={handleLoginClose} handleLoginClose={handleLoginClose} />
          </div>
        )}
        <div className={isLightTheme? 'personpage-white' : "personpage"} onClick={handleThemeToggle}>
          {isLightTheme? <BsMoonStarsFill/> : <BsFillSunFill/>}
        </div>
      </div>
    </div>
  );
};
