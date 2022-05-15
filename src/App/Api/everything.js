import { axiosRequest } from './api'
import { pageSize } from '../../Shared/Constants'

export const getEveryThing = (params = {}) => {
  return axiosRequest({
    endpoint: '/everything',
    params: {
      ...params,
      pageSize,
    },
  })
}

export const getSources = (params = {}) => {
  return axiosRequest({
    endpoint: '/sources',
    params: {
      ...params,
    },
  })
}
