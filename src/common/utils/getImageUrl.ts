import { NO_IMAGE_PLACEHOLDER } from '../constsnts'

export const getImageUrl = (path?: string | null, size: string = 'original') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : NO_IMAGE_PLACEHOLDER
}
