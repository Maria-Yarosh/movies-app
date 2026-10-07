import type { MovieCardData } from '../../api/moviesApi.types'

const FAVORITES_KEY = 'favorites'

export const getFavorites = (): MovieCardData[] => {
  const favoriteMovies = localStorage.getItem(FAVORITES_KEY)
  return favoriteMovies ? JSON.parse(favoriteMovies) : []
}

export const saveFavorites = (movies: MovieCardData[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies))
}
