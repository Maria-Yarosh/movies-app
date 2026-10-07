import { useState, type ReactNode } from 'react'
import type { MovieCardData } from '../../api/moviesApi.types'
import { getFavorites, saveFavorites } from './favoritesStorage'
import { FavoritesContext } from './FavoritesContext'

type Props = {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<MovieCardData[]>(getFavorites)

  const toggleFavorite = (movie: MovieCardData) => {
    const isFavorite = favorites.some((favorite) => favorite.id === movie.id)

    const favoriteMovie: MovieCardData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }

    let updatedFavorites: MovieCardData[]

    if (isFavorite) {
      updatedFavorites = favorites.filter((favorite) => favorite.id !== movie.id)
    } else {
      updatedFavorites = [...favorites, favoriteMovie]
    }
    setFavorites(updatedFavorites)
    saveFavorites(updatedFavorites)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
