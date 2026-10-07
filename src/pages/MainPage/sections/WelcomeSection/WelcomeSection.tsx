import { getImageUrl } from '@/common/utils'
import s from './WelcomeSection.module.css'
import { SearchForm } from '@/features/movies/ui/SearchForm'
import { useRandomPopularMovie } from '@/features/movies/model'

export const WelcomeSection = () => {
  const { movie, isLoading } = useRandomPopularMovie()

  const backdropUrl = movie?.backdrop_path ? getImageUrl(movie.backdrop_path) : null

  return (
    <section
      className={`${s.container} ${isLoading ? s.loading : ''}`}
      style={{
        backgroundImage: backdropUrl
          ? `linear-gradient(rgba(4, 21, 45, 0) 0%, rgb(18, 18, 18) 79.17%), url(${backdropUrl})`
          : undefined,
      }}
    >
      <div className={s.content}>
        <h1 className={s.title}>Welcome</h1>
        <h2 className={s.subtitle}>Millions of movies, TV shows, and people. Explore now.</h2>
        <SearchForm />
      </div>
    </section>
  )
}
