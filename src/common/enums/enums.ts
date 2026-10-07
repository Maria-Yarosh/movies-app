import type { SortOption } from '@/features/movies/api/moviesApi.types'

export const MovieCategories = [
  { title: 'Popular', urlParam: 'popular' },
  { title: 'Top Rated', urlParam: 'top-rated' },
  { title: 'Upcoming', urlParam: 'upcoming' },
  { title: 'Now Playing', urlParam: 'now-playing' },
] as const

export type MovieCategory = (typeof MovieCategories)[number]['urlParam']

export const sortOptions: SortOption[] = [
  { value: 'popularity.desc', label: 'Popularity (High to Low)' },
  { value: 'popularity.asc', label: 'Popularity (Low to High)' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'vote_average.asc', label: 'Rating (Low to High)' },
  { value: 'primary_release_date.desc', label: 'Release Date (Newest First)' },
  { value: 'primary_release_date.asc', label: 'Release Date (Oldest First)' },
  { value: 'title.asc', label: 'Title A-Z' },
  { value: 'title.desc', label: 'Title Z-A' },
]
