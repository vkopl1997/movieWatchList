import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SingleMoviePage } from "./pages/SingleMoviePage";
import { PopularActorsPage } from "./pages/PopularActorsPage";
import { TvShowsPage } from "./pages/TvShowsPage";
import { GenreProvider } from "./contexts/genreContext/GenreContext";
import { SingleTvShow } from "./pages/SingleTvShow";
import { PersonalPage } from "./pages/PersonalPage";
import { ProtectedRoute } from "./ProtectedRoute";



function App() {
  

  return (
    <div className="App">
      <GenreProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movie/:id" element={<SingleMoviePage />} />
          <Route path="actors" element={<PopularActorsPage />} />
          <Route path="tvShow/:id" element={<SingleTvShow />} />
          <Route path="tvShows" element={<TvShowsPage />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/personalPG" element={<PersonalPage/>}/>
          </Route>
        </Routes>
      </GenreProvider>
    </div>
  );

  
}

export default App;
