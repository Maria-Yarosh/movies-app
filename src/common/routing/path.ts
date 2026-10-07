export const Path = {
  Main: '/',
  CategoryMovies: '/movies/category/:categoryParams',
  MovieDetails: '/movies/:movieId',
  FavoritesMovies: '/favorites',
  FilteredMovies: '/filtered',
  SearchMovie: '/search',
  NotFound: '*',
} as const
