import { MovieCategories } from '@/common/enums'
import { Path } from '@/common/routing'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import { NavLink, useParams, useSearchParams } from 'react-router'
import s from './CategoryMoviesPage.module.css'
import { Pagination } from '@/common/components/Pagination/Pagination'
import { MovieListSkeleton } from '@/features/movies/ui/MovieListSkeleton/MovieListSkeleton'

export const CategoryMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { categoryParams } = useParams()
  const pageParam = searchParams.get('page')
  const pageParamOrDefault = pageParam ?? '1'
  const currentPage = +pageParamOrDefault

  const categoryLinksList = MovieCategories

  const currentCategory = MovieCategories.find((el) => el.urlParam === categoryParams)

  const {
    data: popular,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useGetPopularMoviesQuery({ page: currentPage }, { skip: categoryParams !== 'popular' })
  const {
    data: topRated,
    isLoading: isTopRatedLoading,
    isError: isTopRatedError,
  } = useGetTopRatedMoviesQuery({ page: currentPage }, { skip: categoryParams !== 'top-rated' })
  const {
    data: upcoming,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useGetUpcomingMoviesQuery({ page: currentPage }, { skip: categoryParams !== 'upcoming' })
  const {
    data: nowPlaying,
    isLoading: isNowPlayingLoading,
    isError: isNowPlayingError,
  } = useGetNowPlayingMoviesQuery({ page: currentPage }, { skip: categoryParams !== 'now-playing' })

  const currentMovies =
    popular?.results ?? topRated?.results ?? upcoming?.results ?? nowPlaying?.results

  const pagesCount =
    popular?.total_pages ??
    topRated?.total_pages ??
    upcoming?.total_pages ??
    nowPlaying?.total_pages ??
    1

  const isLoading =
    isPopularLoading || isTopRatedLoading || isUpcomingLoading || isNowPlayingLoading

  const isError = isPopularError || isTopRatedError || isUpcomingError || isNowPlayingError

  const handleChangePage = (page: number) => {
    setSearchParams({ page: page.toString() })
  }

  return (
    <section className={s.section}>
      <div className={s.categoryLinks}>
        {categoryLinksList.map((category) => (
          <NavLink
            key={category.urlParam}
            to={Path.CategoryMovies.replace(':categoryParams', category.urlParam)}
            className={({ isActive }) => `${s.categoryLink} ${isActive ? s.activeLink : ''}`}
          >
            {category.title}
          </NavLink>
        ))}
      </div>
      <h2>{currentCategory?.title}</h2>

      {isLoading ? (
        <MovieListSkeleton columns={5} count={20} />
      ) : isError ? (
        <p>Failed to load movies. Please try again later.</p>
      ) : currentMovies?.length ? (
        <MovieList movies={currentMovies} columns={5} />
      ) : (
        <p>No movies</p>
      )}

      {!isLoading && !isError && currentMovies && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={handleChangePage}
          pagesCount={pagesCount}
        />
      )}
    </section>
  )
}
