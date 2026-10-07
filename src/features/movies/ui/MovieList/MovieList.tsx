import type { MovieCardData } from '../../api/moviesApi.types'
import { MovieCard } from '../MovieCard/MovieCard'
import s from './MovieList.module.css'

type Props = {
  movies: MovieCardData[]
  columns: number
}

export const MovieList = ({ movies, columns }: Props) => {
  return (
    <div className={s.grid} style={{ '--columns': columns } as React.CSSProperties}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
