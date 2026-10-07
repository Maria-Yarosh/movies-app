import Skeleton from 'react-loading-skeleton'
import s from './MovieCardSkeleton.module.css'

export const MovieCardSkeleton = () => {
  return (
    <article className={s.card} aria-label="Loading movie">
      <div className={s.posterContainer}>
        <Skeleton className={s.poster} containerClassName={s.posterWrapper} />

        <div className={s.favorite}>
          <Skeleton circle width={40} height={40} />
        </div>

        <div className={s.rating}>
          <Skeleton circle width={42} height={42} />
        </div>
      </div>

      <Skeleton height={20} width="85%" />
      <Skeleton height={16} width="55%" />
    </article>
  )
}
