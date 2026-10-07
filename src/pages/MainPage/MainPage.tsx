import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi'
import { MovieCategorySection } from './sections/MovieCategorySection/MovieCategorySection'
import { WelcomeSection } from './sections/WelcomeSection/WelcomeSection'

export const MainPage = () => {
  const {
    data: popular,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useGetPopularMoviesQuery({ page: 1 })
  const {
    data: topRated,
    isLoading: isTopRatedLoading,
    isError: isTopRatedError,
  } = useGetTopRatedMoviesQuery({ page: 1 })
  const {
    data: upcoming,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useGetUpcomingMoviesQuery({ page: 1 })
  const {
    data: nowPlaying,
    isLoading: isNowPlayingLoading,
    isError: isNowPlayingError,
  } = useGetNowPlayingMoviesQuery({ page: 1 })

  return (
    <>
      <WelcomeSection />
      <MovieCategorySection
        title="Popular"
        urlParam="popular"
        movies={popular?.results}
        isLoading={isPopularLoading}
        isError={isPopularError}
      />
      <MovieCategorySection
        title="Top Rated"
        urlParam="top-rated"
        movies={topRated?.results}
        isLoading={isTopRatedLoading}
        isError={isTopRatedError}
      />
      <MovieCategorySection
        title="Upcoming"
        urlParam="upcoming"
        movies={upcoming?.results}
        isLoading={isUpcomingLoading}
        isError={isUpcomingError}
      />
      <MovieCategorySection
        title="Now Playing"
        urlParam="now-playing"
        movies={nowPlaying?.results}
        isLoading={isNowPlayingLoading}
        isError={isNowPlayingError}
      />
    </>
  )
}
