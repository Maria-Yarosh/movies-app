import { useSearchParams } from 'react-router'
import type { DiscoverSortBy } from '../api/moviesApi.types'
import { useEffect, useState } from 'react'

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortByParam = searchParams.get('sort_by')
  const currentSort = (sortByParam ?? 'popularity.desc') as DiscoverSortBy

  const voteAverageGteParam = searchParams.get('vote_average.gte')
  const voteAverageGteParamOrDefault = voteAverageGteParam ?? '0'
  const currentVoteAverageGte = +voteAverageGteParamOrDefault

  const voteAverageLteParam = searchParams.get('vote_average.lte')
  const voteAverageLteParamOrDefault = voteAverageLteParam ?? '10'
  const currentVoteAverageLte = +voteAverageLteParamOrDefault

  const genresParam = searchParams.get('with_genres')
  const currentGenresParam = genresParam ?? ''
  const selectedGenreIds = currentGenresParam.length > 0 ? currentGenresParam.split(',') : []

  const pageParam = searchParams.get('page')
  const pageParamOrDefault = pageParam ?? '1'
  const currentPage = +pageParamOrDefault

  const [voteAverageGte, setVoteAverageGte] = useState(currentVoteAverageGte)
  const [voteAverageLte, setVoteAverageLte] = useState(currentVoteAverageLte)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentVoteAverageGte === voteAverageGte && currentVoteAverageLte === voteAverageLte) {
        return
      }
      setSearchParams((prev) => {
        prev.set('vote_average.gte', voteAverageGte.toString())
        prev.set('vote_average.lte', voteAverageLte.toString())
        prev.delete('page')
        return prev
      })
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [
    voteAverageGte,
    voteAverageLte,
    currentVoteAverageGte,
    currentVoteAverageLte,
    setSearchParams,
  ])

  const handleChangePage = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString())
      return prev
    })
  }

  const handleChangeOption = (value: DiscoverSortBy) => {
    setSearchParams((prev) => {
      prev.set('sort_by', value)
      prev.delete('page')
      return prev
    })
  }

  const handleGenreClick = (genreId: number) => {
    setSearchParams((prev) => {
      const genresParam = prev.get('with_genres')
      const selectedGenres = genresParam?.length ? genresParam.split(',') : []
      const isSelected = selectedGenres.includes(genreId.toString())

      let updatedGenres: string[]

      if (isSelected) {
        updatedGenres = selectedGenres.filter((id) => id !== genreId.toString())
      } else {
        updatedGenres = [...selectedGenres, genreId.toString()]
      }

      const genresString = updatedGenres.join(',')

      if (updatedGenres.length > 0) {
        prev.set('with_genres', genresString)
      } else {
        prev.delete('with_genres')
      }
      prev.delete('page')

      return prev
    })
  }

  const handleChangeMinRating = (value: number) => {
    if (value > voteAverageLte) {
      return
    }
    setVoteAverageGte(value)
  }

  const handleChangeMaxRating = (value: number) => {
    if (value < voteAverageGte) {
      return
    }
    setVoteAverageLte(value)
  }

  const handleResetFilters = () => {
    setSearchParams((prev) => {
      prev.delete('sort_by')
      prev.delete('with_genres')
      prev.delete('vote_average.gte')
      prev.delete('vote_average.lte')
      prev.delete('page')

      return prev
    })
    setVoteAverageGte(0)
    setVoteAverageLte(10)
  }

  return {
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
  }
}
