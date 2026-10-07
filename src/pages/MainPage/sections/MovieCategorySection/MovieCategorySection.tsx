import type { Movie } from '@/features/movies/api/moviesApi.types'
import s from './MovieCategorySection.module.css'
import { Link } from 'react-router'
import { Path } from '@/common/routing'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import type { MovieCategory } from '@/common/enums'
import { MovieListSkeleton } from '@/features/movies/ui/MovieListSkeleton/MovieListSkeleton'

type Props = {
  title: string
  movies?: Movie[]
  urlParam: MovieCategory
  isLoading: boolean
  isError: boolean
}

export const MovieCategorySection = ({ title, movies, urlParam, isLoading, isError }: Props) => {
  const slicedMovies = movies?.slice(0, 6)

  return (
    <section className={s.section}>
      <div className={s.header}>
        <h2>{title}</h2>
        {!isError && (
          <Link
            to={Path.CategoryMovies.replace(':categoryParams', urlParam)}
            className={s.viewMoreLink}
          >
            View more
          </Link>
        )}
      </div>
      {isLoading ? (
        <MovieListSkeleton columns={6} count={6} />
      ) : isError ? (
        <p>Failed to load movies. Please try again later.</p>
      ) : slicedMovies?.length ? (
        <MovieList movies={slicedMovies} columns={6} />
      ) : (
        <p>No movies</p>
      )}
    </section>
  )
}
