import { Link } from 'react-router'
import { Path } from '@/common/routing'
import s from './PageNotFound.module.css'

export const PageNotFound = () => {
  return (
    <section className={s.container}>
      <div className={s.content}>
        <span className={s.errorCode}>404</span>

        <h1 className={s.title}>Page Not Found</h1>

        <p className={s.description}>
          Looks like this scene didn't make the final cut.
          <br />
          The page you're looking for doesn't exist.
        </p>

        <Link to={Path.Main} className={s.homeLink}>
          Back to Main
        </Link>
      </div>
    </section>
  )
}
