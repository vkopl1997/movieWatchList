import React, { useRef } from 'react';
import { MovieList } from '../components/movielist/MovieList';
import { Navbar } from '../components/navbar/Navbar';
import { Element } from 'react-scroll';

export const HomePage = () => {
  const listDescRef = useRef(null);

  const handleScrollToListDesc = () => {
    if (listDescRef.current) {
      listDescRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onScrollToListDesc={handleScrollToListDesc} />
      <Element name="search-section">
        <MovieList listDescRef={listDescRef} />
      </Element>
    </>
  );
};
