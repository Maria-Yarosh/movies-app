import { createContext } from 'react'
import type { MovieCardData } from '../../api/moviesApi.types'

type FavoritesContextValue = {
  favorites: MovieCardData[]
  toggleFavorite: (movie: MovieCardData) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
