import { z } from 'zod'
import {
  movieSchema,
  moviesResponseSchema,
  moviesWithDatesResponseSchema,
  genreSchema,
  genresResponseSchema,
  movieDetailsSchema,
  castMemberSchema,
  movieCreditsSchema,
} from './movies.schemas'

export type Movie = z.infer<typeof movieSchema>

export type MoviesResponse = z.infer<typeof moviesResponseSchema>

export type MoviesWithDatesResponse = z.infer<typeof moviesWithDatesResponseSchema>

export type Genre = z.infer<typeof genreSchema>

export type GenresResponse = z.infer<typeof genresResponseSchema>

export type MovieDetails = z.infer<typeof movieDetailsSchema>

export type CastMember = z.infer<typeof castMemberSchema>

export type MovieCredits = z.infer<typeof movieCreditsSchema>

export type MovieCardData = Pick<Movie, 'id' | 'title' | 'poster_path' | 'vote_average'>

export type MoviesQueryParams = {
  language?: string
  page?: number
  region?: string
}

export type DiscoverSortBy =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'title.asc'
  | 'title.desc'

export type SortOption = {
  value: DiscoverSortBy
  label: string
}

export type DiscoverMovieParams = {
  page?: number
  sort_by?: DiscoverSortBy
  with_genres?: string
  'vote_average.gte'?: number
  'vote_average.lte'?: number
}

export type SearchMovieParams = MoviesQueryParams & {
  query: string
}
