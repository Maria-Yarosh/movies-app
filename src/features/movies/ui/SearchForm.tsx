import { Path } from '@/common/routing'
import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import s from './SearchForm.module.css'

type Props = {
  initialValue?: string
  onClear?: () => void
}

export const SearchForm = ({ onClear, initialValue }: Props) => {
  const [search, setSearch] = useState(initialValue ?? '')

  const navigate = useNavigate()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    setSearch(value)

    if (!value) {
      onClear?.()
    }
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!search.trim()) return
    navigate(`${Path.SearchMovie}?query=${encodeURIComponent(search)}`)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        placeholder="Search for a movie"
        type="search"
        value={search}
        onChange={handleSearchChange}
      />
      <button className={s.button} type="submit" disabled={!search.trim()}>
        Search
      </button>
    </form>
  )
}
