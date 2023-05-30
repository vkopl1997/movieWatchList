import React, { useEffect, useState } from 'react';
import './popularActors.css';
import { PersonBox } from '../personbox/PersonBox';

const API_URL = `https://api.themoviedb.org/3/person/popular?api_key=2ada23b09a1350182a469aee846b3f9c`;

export const PopularActors = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="popularActors-header">
        <span className='header'>Popular Actors</span>
      </div>
      <div className='main-container-person'>
        {people.map((personReq) => {
          if (!personReq.profile_path) {
            return null;
          }

          return <PersonBox key={personReq.id} {...personReq} />;
        })}
      </div>
    </>
  );
};
