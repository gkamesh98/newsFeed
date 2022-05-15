import * as api from '../../../App/Api/everything'

export const getEveryThing = params => {
  return new Promise((resolve, reject) => {
    api
      .getEveryThing(params)
      .then(successResponse => {
        resolve(successResponse.data)
      })
      .catch(errorResponse => {
        reject(errorResponse)
      })
  })
}
