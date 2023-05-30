import React from 'react';
import './personBox.css';

export const PersonBox = ({
  name,
  profile_path,
  gender,
  known_for_department
}) => {

  const API_IMG = 'https://image.tmdb.org/t/p/w500';

  return (
    <>
      <div className='card-person'>
      <img src={`${API_IMG}${profile_path}`} alt={name} className='card-img' />
        <div className="card-body-person">
            <h2 className='card-title-person'>{name}</h2>
            {gender === 2 ? 
              <p className='card-subtitle-person'>male</p> :
              <p className='card-subtitle-person'>female</p>
            }
            <p className='card-subtitle-person'>{known_for_department}</p>
        </div>
     
      </div>
    </>
  )
}
