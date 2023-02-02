import Axios from 'axios'

const refreshPageOnExpiredLfsSession = () => {
  let reloading = false
  return (err: unknown) => {
    if (Axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        if (!reloading) {
          if (confirm('Your Labatt session is expired. Press OK to reload the page.')) {
            reloading = true
            window.location.href = '/login' + window.location.hash
          }
        }
      }
    }
    return Promise.reject(err)
  }
}

const axios = Axios.create()
axios.interceptors.response.use(undefined, refreshPageOnExpiredLfsSession())

export default {
  async getExample() {
    const resp = await axios.get('/api/example')
    return resp.data
  },
}

