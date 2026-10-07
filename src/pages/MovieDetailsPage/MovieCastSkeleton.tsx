import Skeleton from 'react-loading-skeleton'
import s from './MovieDetailsPage.module.css'

export const MovieCastSkeleton = () => {
  return (
    <section className={s.castSection} aria-label="Loading cast">
      <h2>Cast</h2>

      <div className={s.grid}>
        {Array.from({ length: 6 }, (_, index) => (
          <article className={s.actorCard} key={index}>
            <div className={s.actorPhoto}>
              <Skeleton height="100%" />
            </div>

            <div className={s.actorInfo}>
              <Skeleton height={18} width="90%" />
              <Skeleton height={16} width="65%" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
