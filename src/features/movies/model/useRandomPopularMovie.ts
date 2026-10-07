import { useState } from 'react'
import { useGetPopularMoviesQuery } from '../api/moviesApi'

export const useRandomPopularMovie = () => {
  const [randomSeed] = useState(() => Math.random())

  const { data, isLoading, isError } = useGetPopularMoviesQuery({
    page: Math.floor(randomSeed * 40) + 1,
  })

  const movies = data?.results
  const movie = movies?.length ? movies[Math.floor(randomSeed * movies.length)] : undefined

  return { movie, isLoading, isError }
}
