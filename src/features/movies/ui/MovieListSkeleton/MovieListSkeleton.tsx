import { MovieCardSkeleton } from '../MovieCardSkeleton/MovieCardSkeleton'
import s from '../MovieList/MovieList.module.css'

type Props = {
  columns: number
  count?: number
}

export const MovieListSkeleton = ({ columns, count = 10 }: Props) => {
  return (
    <div className={s.grid} style={{ '--columns': columns } as React.CSSProperties}>
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  )
}
