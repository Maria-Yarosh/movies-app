import { Path } from '@/common/routing'
import logo from '@/assets/images/logoMain.svg'
import { Link, NavLink } from 'react-router'
import s from './Header.module.css'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { changeThemeMode, selectThemeMode } from '@/app/model/appSlice'
import { themeStorage } from '@/common/utils'

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.CategoryMovies.replace(':categoryParams', 'popular'), label: 'Category Movies' },
  { to: Path.FilteredMovies, label: 'Filtered Movies' },
  { to: Path.SearchMovie, label: 'Search' },
  { to: Path.FavoritesMovies, label: 'Favorites' },
]

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const handleChangeTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light'
    dispatch(changeThemeMode({ themeMode: newTheme }))
    themeStorage.set(newTheme)
  }

  return (
    <header className={s.container}>
      <Link to={Path.Main} aria-label="to main page">
        <img src={logo} alt="Logo" className={s.logo} />
      </Link>
      <nav>
        <ul className={s.list}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? s.activeLink : undefined)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={s.btnToggle}
        onClick={handleChangeTheme}
        aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
      >
        {themeMode === 'light' ? 'Switch to 🌙 Dark' : 'Switch to ☀️ Light'}
      </button>
    </header>
  )
}
