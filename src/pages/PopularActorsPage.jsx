import React from 'react'
import { PopularActors } from '../components/popularactors/PopularActorsList'
import { Navbar } from '../components/navbar/Navbar'

export const PopularActorsPage = () => {
  return (
    <>
      <Navbar/>
      <PopularActors/>
    </>
  )
}
