import Skeleton from 'react-loading-skeleton'
import s from './MovieDetailsPage.module.css'

export const MovieInfoSkeleton = () => {
  return (
    <section className={s.movieInfo} aria-label="Loading movie details">
      <div className={s.poster}>
        <Skeleton height="100%" borderRadius={16} />
      </div>

      <div className={s.details}>
        <header className={s.header}>
          <div className={s.titleRow}>
            <div style={{ flex: 1 }}>
              <Skeleton height={48} width="75%" />
            </div>
            <Skeleton height={40} width={75} borderRadius={8} />
          </div>

          <div className={s.meta}>
            <Skeleton width={140} height={20} />
            <Skeleton width={70} height={20} />
            <Skeleton width={130} height={20} />
          </div>
        </header>

        <div>
          <Skeleton count={4} height={20} style={{ marginBottom: 10 }} />
          <Skeleton height={20} width="60%" />
        </div>

        <div className={s.genres}>
          <Skeleton height={28} width={90} />

          <div className={s.genreList}>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} height={34} width={85} borderRadius={999} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
