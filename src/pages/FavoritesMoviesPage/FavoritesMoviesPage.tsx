import { MovieList } from '@/features/movies/ui/MovieList/MovieList'
import s from './FavoritesMoviesPage.module.css'
import { useFavorites } from '@/features/movies/model/favorites/useFavorites'

export const FavoritesMoviesPage = () => {
  const { favorites } = useFavorites()
  return (
    <section className={s.section}>
      <h1>Favorites</h1>

      <div>
        {favorites.length === 0 ? (
          <div className={s.empty}>
            <p className={s.emptyText}>No favorite movies yet.</p>
          </div>
        ) : (
          <>
            <h2>Favorites Movies</h2>
            <MovieList movies={favorites} columns={6} />
          </>
        )}
      </div>
    </section>
  )
}
