import React, { useEffect, useState,useContext } from 'react';
import './personal.css';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { ThemeContext } from '../../contexts/themeContext/ThemContext';

export const Personal = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const { isLightTheme } = useContext(ThemeContext);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  const handleClear = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleClearItem = (itemId) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== itemId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };
  

  return (
    <div className={isLightTheme? 'personal-main-container-white' :'personal-main-container'}>
      <div className={isLightTheme? "person-info-container-white" : "person-info-container"}>
        <div className="personphoto">
          <BsPersonCircle className='photoinphoto' />
        </div>
        <div className="user-label">
          <label>User</label>
        </div>
        <div className="personname">{localStorage.getItem('username')}</div>
        <div className="goback-div">
          <button className='btn-back-personal' onClick={() => navigate('/')}>Go Back</button>
        </div>
        <div className="goback-div">
          <button className='btn-back-personal' onClick={handleClear}>Delete Acc.</button>
        </div>
      </div>
      <div className="watchlist-container">
        <div className={isLightTheme? "watchlist-title-white" : "watchlist-title"}>
          {localStorage.getItem('username')}'s watchlist
        </div>
        <div className="watchlist">
          {watchlist.length > 0 ? (
            watchlist.map((item) => (
              <div key={item.id} className="watchlist-item">
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.name} className="watchlist-poster" />
                <div className={isLightTheme? "watchlist-info-white" : "watchlist-info"}>
                <div className="watchlist-name">{item.name || item.title}</div>
                <button className="id-clear-btn" onClick={() => handleClearItem(item.id)}>
                  Clear
                </button>
                </div>
              </div>
            ))
          ) : (
            <div className="watchlist-empty">Watchlist is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

