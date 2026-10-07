import { Route, Routes } from 'react-router'
import { Path } from './path'
import { MainPage } from '@/pages/MainPage/MainPage'
import { CategoryMoviesPage } from '@/pages/CategoryMoviesPage/CategoryMoviesPage'
import { FavoritesMoviesPage } from '@/pages/FavoritesMoviesPage/FavoritesMoviesPage'
import { FilteredMoviesPage } from '@/pages/FilteredMoviesPage/FilteredMoviesPage'
import { SearchMoviePage } from '@/pages/SearchMoviePage/SearchMoviePage'
import { PageNotFound } from '@/pages/PageNotFound/PageNotFound'
import { MovieDetailsPage } from '@/pages/MovieDetailsPage/MovieDetailsPage'

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.CategoryMovies} element={<CategoryMoviesPage />} />
    <Route path={Path.FavoritesMovies} element={<FavoritesMoviesPage />} />
    <Route path={Path.FilteredMovies} element={<FilteredMoviesPage />} />
    <Route path={Path.SearchMovie} element={<SearchMoviePage />} />
    <Route path={Path.MovieDetails} element={<MovieDetailsPage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
