import Axios from 'axios'

function hasMessage(v: unknown): v is { message: string } {
  return typeof v === 'object' && v !== null && 'message' in v && typeof (v as any).message === 'string'
}

const extractErrorMessage = (err: unknown) => {
  if (Axios.isAxiosError(err)) {
    if (err.response) {
      if (err.response.status === 401) {
        return 'Your Labatt session has expired. Please refresh the page to log in again.'
      } else if (err.response.data) {
        if (typeof err.response.data === 'string') {
          return err.response.data
        } else if (typeof err.response.data === 'object') {
          const errData = err.response.data as Record<string, unknown>
          if (typeof errData.error === 'string') {
            return errData.error
          }
        }
      }
    }
  }
  if (hasMessage(err)) {
    return err.message
  }
  return 'Unknown error'
}

export default extractErrorMessage
