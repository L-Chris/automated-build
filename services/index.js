import axios from 'axios'
axios.defaults.timeout = 10000
if (process.browser) {
  axios.defaults.baseURL = '/api'
  axios.interceptors.response.use(({data}) => {
    if (data.status === 200) {
      return data.data
    }
    return Promise.reject(data.message)
  }, err => Promise.reject(err))
} else {
  axios.defaults.baseURL = `${process.env.HOST_URL}/api`
}

export default axios
