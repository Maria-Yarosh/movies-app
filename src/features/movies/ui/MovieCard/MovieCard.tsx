import { getImageUrl } from '@/common/utils'
import type { MovieCardData } from '../../api/moviesApi.types'
import s from './MovieCard.module.css'
import { NO_IMAGE_PLACEHOLDER } from '@/common/constsnts'
import { HeartIcon } from '@/common/components/icons/HeartIcon'
import { useFavorites } from '../../model/favorites/useFavorites'
import { generatePath, Link } from 'react-router'
import { Path } from '@/common/routing'

type Props = {
  movie: MovieCardData
}

export const MovieCard = ({ movie }: Props) => {
  const movieDetailsPath = generatePath(Path.MovieDetails, {
    movieId: movie.id.toString(),
  })

  const posterUrl = getImageUrl(movie.poster_path)

  const { favorites, toggleFavorite } = useFavorites()

  const isFavorite = favorites.some((favorite) => favorite.id === movie.id)

  return (
    <article className={s.card}>
      <div className={s.posterConteiner}>
        <Link to={movieDetailsPath}>
          <img
            src={posterUrl}
            alt={movie.title}
            className={s.poster}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = NO_IMAGE_PLACEHOLDER
            }}
          />
          <span className={s.ratingBadge}>
            {movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </Link>
        <button
          onClick={() => toggleFavorite(movie)}
          className={s.favoriteButton}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <Link to={movieDetailsPath}>
        <h3>{movie.title}</h3>
      </Link>
    </article>
  )
}
