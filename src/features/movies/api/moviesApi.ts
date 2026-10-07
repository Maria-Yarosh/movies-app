import { baseApi } from '@/app/api/baseApi'
import type {
  DiscoverMovieParams,
  GenresResponse,
  MovieCredits,
  MovieDetails,
  MoviesQueryParams,
  MoviesResponse,
  MoviesWithDatesResponse,
  SearchMovieParams,
} from './moviesApi.types'
import { withZodCatch } from '@/common/utils'
import {
  genresResponseSchema,
  movieCreditsSchema,
  movieDetailsSchema,
  moviesResponseSchema,
  moviesWithDatesResponseSchema,
} from './movies.schemas'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query<MoviesResponse, MoviesQueryParams>({
      query: (params) => ({ url: '/movie/popular', params }),
      providesTags: ['Movies'],
      ...withZodCatch(moviesResponseSchema),
    }),
    getTopRatedMovies: build.query<MoviesResponse, MoviesQueryParams>({
      query: (params) => ({ url: '/movie/top_rated', params }),
      providesTags: ['Movies'],
      ...withZodCatch(moviesResponseSchema),
    }),
    getUpcomingMovies: build.query<MoviesWithDatesResponse, MoviesQueryParams>({
      query: (params) => ({ url: '/movie/upcoming', params }),
      providesTags: ['Movies'],
      ...withZodCatch(moviesWithDatesResponseSchema),
    }),
    getNowPlayingMovies: build.query<MoviesWithDatesResponse, MoviesQueryParams>({
      query: (params) => ({ url: '/movie/now_playing', params }),
      providesTags: ['Movies'],
      ...withZodCatch(moviesWithDatesResponseSchema),
    }),
    searchMovie: build.query<MoviesResponse, SearchMovieParams>({
      query: (params) => ({ url: '/search/movie', params }),
      providesTags: ['Movies'],
      ...withZodCatch(moviesResponseSchema),
    }),
    getDiscoverMovie: build.query<MoviesResponse, DiscoverMovieParams>({
      query: (params) => ({ url: '/discover/movie', params }),
      providesTags: ['Movies'],
      ...withZodCatch(moviesResponseSchema),
    }),
    getGenres: build.query<GenresResponse, void>({
      query: () => ({ url: '/genre/movie/list' }),
      providesTags: ['Movies'],
      ...withZodCatch(genresResponseSchema),
    }),
    getMovieDetails: build.query<MovieDetails, number>({
      query: (movieId) => ({ url: `/movie/${movieId}` }),
      providesTags: ['Movies'],
      ...withZodCatch(movieDetailsSchema),
    }),
    getMovieCredits: build.query<MovieCredits, number>({
      query: (movieId) => ({ url: `/movie/${movieId}/credits` }),
      providesTags: ['Movies'],
      ...withZodCatch(movieCreditsSchema),
    }),
    getMovieSimilar: build.query<MoviesResponse, number>({
      query: (movieId) => ({ url: `/movie/${movieId}/similar` }),
      providesTags: ['Movies'],
      ...withZodCatch(moviesResponseSchema),
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useSearchMovieQuery,
  useGetDiscoverMovieQuery,
  useGetGenresQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetMovieSimilarQuery,
} = moviesApi
