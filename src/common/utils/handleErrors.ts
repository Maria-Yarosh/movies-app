import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { errorToast } from './errorToast'
import { isErrorWithProperty } from './isErrorWithProperty'

export const handleErrors = (error: FetchBaseQueryError) => {
  switch (error.status) {
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
    case 'TIMEOUT_ERROR':
      errorToast(error.error)
      break

    case 401:
    case 404:
      if (isErrorWithProperty(error.data, 'status_message')) {
        errorToast(error.data.status_message)
      } else {
        errorToast(JSON.stringify(error.data))
      }
      break

    default:
      if (error.status >= 500 && error.status < 600) {
        errorToast('Server error occurred. Please try again later.')
      } else {
        errorToast('Some error occurred')
      }
  }
}
