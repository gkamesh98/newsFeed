import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@queries')
    if (value !== null) {
      return value
    }
    return null
  } catch (e) {
    // error reading value
  }
}

export const extractData = async queryClient => {
  return new Promise((resolve, reject) => {
    getData()
      .then(value => {
        if (value) {
          const queriesWithData = JSON.parse(value) ?? []

          queriesWithData.forEach(query => {
            queryClient.setQueryData(query.queryKey, query.data)
          })
        }
        resolve(value)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const QueryDataReHydrater = ({ children, ...props }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    extractData(queryClient).finally(() => {
      setLoading(false)
    })
  }, [])
  if (loading) {
    return <></>
  }
  return children
}

export default QueryDataReHydrater
