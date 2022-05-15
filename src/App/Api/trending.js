import { axiosRequest } from './api'
import { pageSize } from '../../Shared/Constants'

export const getTrendingNews = (params = {}) => {
  return axiosRequest({
    endpoint: '/top-headlines',
    params: {
      ...params,
      pageSize,
    },
  })
}

export const getSources = (params = {}) => {
  return axiosRequest({
    endpoint: '/top-headlines/sources',
    params: {
      ...params,
    },
  })
}
