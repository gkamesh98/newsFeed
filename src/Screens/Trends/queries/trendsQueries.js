import * as api from '../../../App/Api/trending'

export const getTrendingNews = params => {
  return new Promise((resolve, reject) => {
    api
      .getTrendingNews(params)
      .then(successResponse => {
        resolve(successResponse.data)
      })
      .catch(errorResponse => {
        reject(errorResponse)
      })
  })
}
