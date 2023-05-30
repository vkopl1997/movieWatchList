import React, { useEffect, useState } from 'react';
import './personal.css';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';

export const Personal = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

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

  const handleClearItem = (itemId) =>{
    const updatedWatchlist = watchlist.filter((item) => item.id !== itemId);
    setWatchlist(updatedWatchlist);
  }

  return (
    <div className='personal-main-container'>
      <div className="person-info-container">
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
          <button className='btn-back-personal' onClick={handleClear}>Clear Acc.</button>
        </div>
      </div>
      <div className="watchlist-container">
        <div className="watchlist-title">
          {localStorage.getItem('username')}'s watchlist
        </div>
        <div className="watchlist">
          {watchlist.length > 0 ? (
            watchlist.map((item) => (
              <div key={item.id} className="watchlist-item">
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.name} className="watchlist-poster" />
                <div className="watchlist-info">
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

