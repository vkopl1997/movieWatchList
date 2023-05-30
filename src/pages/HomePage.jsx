import React from 'react'
import { MovieList } from '../components/movielist/MovieList'
import { Navbar } from '../components/navbar/Navbar'

export const HomePage = () => {
  return (
    <>
        <Navbar/>
        <MovieList/>
    </>
  )
}
