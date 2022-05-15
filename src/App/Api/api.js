import axios from 'axios'
// import { NEWS_API_URL, NEWS_API_KEY } from '@env'

const newsApiUrl = 'https://newsapi.org/v2'

export const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject({
      ...error.response,
    })
  },
)

export const axiosRequest = ({
  method = 'get',
  endpoint,
  data = {},
  params = {},
  responseType = 'json',
}) => {
  return axiosInstance({
    method,
    url: newsApiUrl + endpoint,
    data,
    params: {
      ...params,
      apiKey: '1b89f38a9ed84d93add250b7aa2c88f0',
    },
    responseType,
  })
}
