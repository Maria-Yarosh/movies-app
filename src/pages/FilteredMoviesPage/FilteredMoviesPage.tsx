import s from './FilteredMoviesPage.module.css'
import type { DiscoverMovieParams, DiscoverSortBy } from '@/features/movies/api/moviesApi.types'
import { useGetDiscoverMovieQuery, useGetGenresQuery } from '@/features/movies/api/moviesApi'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import { Pagination } from '@/common/components/Pagination/Pagination'
import { sortOptions } from '@/common/enums'
import { useMovieFilters } from '@/features/movies/model'
import { MovieListSkeleton } from '@/features/movies/ui/MovieListSkeleton/MovieListSkeleton'
import Skeleton from 'react-loading-skeleton'

export const FilteredMoviesPage = () => {
  const {
    currentSort,
    currentVoteAverageGte,
    currentVoteAverageLte,
    currentGenresParam,
    selectedGenreIds,
    currentPage,
    voteAverageGte,
    voteAverageLte,
    handleChangePage,
    handleChangeOption,
    handleGenreClick,
    handleChangeMinRating,
    handleChangeMaxRating,
    handleResetFilters,
  } = useMovieFilters()

  const discoverParams: DiscoverMovieParams = {
    page: currentPage,
    sort_by: currentSort,
    'vote_average.gte': currentVoteAverageGte,
    'vote_average.lte': currentVoteAverageLte,
  }
  if (currentGenresParam) {
    discoverParams.with_genres = currentGenresParam
  }

  const {
    data: discoverMovieData,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useGetDiscoverMovieQuery(discoverParams)
  const {
    data: genresMovieData,
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useGetGenresQuery()

  const minRating = 0
  const maxRating = 10
  const minRatingPercent = ((voteAverageGte - minRating) / (maxRating - minRating)) * 100
  const maxRatingPercent = ((voteAverageLte - minRating) / (maxRating - minRating)) * 100

  return (
    <div className={s.container}>
      <aside className={s.filters}>
        <h2 className={s.title}>Filters / Sort</h2>

        <div className={s.filterSection}>
          <label className={s.sortLabel}>
            <span>Sort by</span>
            <select
              className={s.select}
              value={currentSort}
              onChange={(e) => handleChangeOption(e.currentTarget.value as DiscoverSortBy)}
            >
              {sortOptions.map((sortOption) => (
                <option key={sortOption.value} value={sortOption.value}>
                  {sortOption.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={s.filterSection}>
          <div className={s.ratingHeader}>
            <span>Rating</span>
            <span>
              {voteAverageGte.toFixed(1)} - {voteAverageLte.toFixed(1)}
            </span>
          </div>

          <div className={s.rangeSlider}>
            <div
              className={s.rangeTrack}
              style={{
                left: `${minRatingPercent}%`,
                right: `${100 - maxRatingPercent}%`,
              }}
            />
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              aria-label="Minimum rating"
              value={voteAverageGte}
              onChange={(e) => handleChangeMinRating(+e.currentTarget.value)}
            />
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              aria-label="Maximum rating"
              value={voteAverageLte}
              onChange={(e) => handleChangeMaxRating(+e.currentTarget.value)}
            />
          </div>
        </div>

        <div className={s.genres}>
          {isGenresLoading ? (
            Array.from({ length: 12 }, (_, index) => (
              <Skeleton key={index} width={75} height={34} borderRadius={999} />
            ))
          ) : isGenresError ? (
            <p>Failed to load genres.</p>
          ) : (
            genresMovieData?.genres.map((genre) => (
              <button
                key={genre.id}
                className={`${s.genreButton} ${
                  selectedGenreIds.includes(genre.id.toString()) ? s.activeGenre : ''
                }`}
                onClick={() => handleGenreClick(genre.id)}
              >
                {genre.name}
              </button>
            ))
          )}
        </div>

        <button className={s.resetButton} onClick={handleResetFilters}>
          Reset filters
        </button>
      </aside>

      <section className={s.movies}>
        {isMoviesLoading ? (
          <MovieListSkeleton columns={5} count={20} />
        ) : isMoviesError ? (
          <p>Failed to load movies. Please try again later.</p>
        ) : discoverMovieData?.results.length ? (
          <MovieList movies={discoverMovieData.results} columns={5} />
        ) : (
          <p>No movies found for the selected filters.</p>
        )}

        {!isMoviesLoading && !isMoviesError && discoverMovieData && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={handleChangePage}
            pagesCount={discoverMovieData.total_pages}
          />
        )}
      </section>
    </div>
  )
}
