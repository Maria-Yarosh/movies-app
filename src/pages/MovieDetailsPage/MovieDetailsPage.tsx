import { useNavigate, useParams } from 'react-router'
import s from './MovieDetailsPage.module.css'
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetMovieSimilarQuery,
} from '@/features/movies/api/moviesApi'
import { getImageUrl } from '@/common/utils'
import { NO_IMAGE_PLACEHOLDER } from '@/common/constsnts'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import { MovieListSkeleton } from '@/features/movies/ui/MovieListSkeleton/MovieListSkeleton'
import { MovieInfoSkeleton } from './MovieInfoSkeleton'
import { MovieCastSkeleton } from './MovieCastSkeleton'

export const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()

  const movieIdNumber = Number(movieId)
  const isValidMovieId =
    movieId !== undefined && Number.isInteger(movieIdNumber) && movieIdNumber > 0

  const {
    data: detailsMovieData,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useGetMovieDetailsQuery(movieIdNumber, {
    skip: !isValidMovieId,
  })

  const {
    data: creditsMovieData,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useGetMovieCreditsQuery(movieIdNumber, {
    skip: !isValidMovieId,
  })

  const {
    data: similarMoviesData,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
  } = useGetMovieSimilarQuery(movieIdNumber, {
    skip: !isValidMovieId,
  })

  if (!isValidMovieId) {
    return <p>Invalid movie ID.</p>
  }

  const posterUrl = detailsMovieData
    ? getImageUrl(detailsMovieData.poster_path)
    : NO_IMAGE_PLACEHOLDER

  const releaseYear = detailsMovieData?.release_date
    ? detailsMovieData.release_date.slice(0, 4)
    : 'N/A'

  const topCast = creditsMovieData?.cast.slice(0, 6) ?? []

  const similarMovies = similarMoviesData?.results.slice(0, 6) ?? []

  return (
    <div className={s.container}>
      {/* Movie Info */}

      {isDetailsLoading ? (
        <MovieInfoSkeleton />
      ) : isDetailsError ? (
        <p>Failed to load movie details.</p>
      ) : detailsMovieData ? (
        <section className={s.movieInfo}>
          <div className={s.poster}>
            <img
              src={posterUrl}
              alt={detailsMovieData.title}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = NO_IMAGE_PLACEHOLDER
              }}
            />
          </div>

          <div className={s.details}>
            <header className={s.header}>
              <div className={s.titleRow}>
                <h1>{detailsMovieData.title}</h1>

                <button className={s.backButton} onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>

              <div className={s.meta}>
                <span>Release year: {releaseYear}</span>

                <span>⭐ {detailsMovieData.vote_average.toFixed(1)}</span>

                <span>
                  Runtime:{' '}
                  {detailsMovieData.runtime !== null ? `${detailsMovieData.runtime} min` : 'N/A'}
                </span>
              </div>
            </header>

            <p className={s.overview}>{detailsMovieData.overview}</p>

            <div className={s.genres}>
              <h2>Genres</h2>

              <ul className={s.genreList}>
                {detailsMovieData.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* Cast */}

      {isCreditsLoading ? (
        <MovieCastSkeleton />
      ) : (
        <section className={s.castSection}>
          <h2>Cast</h2>

          {isCreditsError ? (
            <p>Failed to load cast.</p>
          ) : topCast.length ? (
            <div className={s.grid}>
              {topCast.map((actor) => (
                <article className={s.actorCard} key={actor.id}>
                  <div className={s.actorPhoto}>
                    <img
                      src={
                        actor.profile_path ? getImageUrl(actor.profile_path) : NO_IMAGE_PLACEHOLDER
                      }
                      alt={actor.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = NO_IMAGE_PLACEHOLDER
                      }}
                    />
                  </div>

                  <div className={s.actorInfo}>
                    <p className={s.actorName}>{actor.name}</p>

                    <p className={s.character}>{actor.character}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No cast information available.</p>
          )}
        </section>
      )}

      {/* Similar Movies */}

      <section className={s.similarSection}>
        <h2>Similar Movies</h2>

        {isSimilarLoading ? (
          <MovieListSkeleton columns={6} count={6} />
        ) : isSimilarError ? (
          <p>Failed to load similar movies.</p>
        ) : similarMovies.length ? (
          <MovieList movies={similarMovies} columns={6} />
        ) : (
          <p>No similar movies found.</p>
        )}
      </section>
    </div>
  )
}
