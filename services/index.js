import axios from 'axios'

axios.defaults.timeout = 10000
if (process.server) {
  axios.defaults.baseURL = `${process.env.HOST_URL}/api`
} else {
  axios.defaults.baseURL = '/api'  
}


axios.interceptors.request.use(config => config,
  err => Promise.reject(err)
)
axios.interceptors.response.use(({data}) => {
  if (data.status === 200) {
    return data.data
  }
  return Promise.reject(data.message)
}, err => Promise.reject(err))

export default axios
