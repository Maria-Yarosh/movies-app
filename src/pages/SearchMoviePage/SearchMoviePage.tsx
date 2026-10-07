import { SearchForm } from '@/features/movies/ui/SearchForm'
import s from './SearchMoviePage.module.css'
import { useSearchParams } from 'react-router'
import { useSearchMovieQuery } from '@/features/movies/api/moviesApi'
import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import { Pagination } from '@/common/components/Pagination/Pagination'
import { MovieListSkeleton } from '@/features/movies/ui/MovieListSkeleton/MovieListSkeleton'

export const SearchMoviePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const page = +(searchParams.get('page') ?? '1')

  const { data, isLoading, isError } = useSearchMovieQuery(
    {
      query,
      page,
    },
    {
      skip: !query.trim(),
    },
  )

  const handleChangePage = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString())
      return prev
    })
  }

  const handleClearForm = () => {
    setSearchParams((prev) => {
      prev.delete('page')
      prev.delete('query')

      return prev
    })
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Search Movie</h1>

      <SearchForm initialValue={query} onClear={handleClearForm} />

      {!query.trim() ? (
        <p className={s.message}>Enter a movie title to start searching.</p>
      ) : isLoading ? (
        <div className={s.results}>
          <h2 className={s.resultsTitle}>Results for "{query}"</h2>
          <MovieListSkeleton columns={5} count={20} />
        </div>
      ) : isError ? (
        <p className={s.message}>Failed to search movies. Please try again later.</p>
      ) : data?.results.length === 0 ? (
        <p className={s.message}>No matches found for "{query}"</p>
      ) : data ? (
        <div className={s.results}>
          <h2 className={s.resultsTitle}>Results for "{query}"</h2>

          <MovieList movies={data.results} columns={5} />

          <div className={s.pagination}>
            <Pagination
              currentPage={page}
              setCurrentPage={handleChangePage}
              pagesCount={data.total_pages}
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
