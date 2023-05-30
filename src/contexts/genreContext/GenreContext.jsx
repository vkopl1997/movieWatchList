import React, { createContext, useState } from 'react';

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

