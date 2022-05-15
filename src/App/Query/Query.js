import { QueryClient, queryCache } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async value => {
  try {
    await AsyncStorage.setItem('@queries', value)
  } catch (e) {
    // saving error
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      stateTime: Infinity,
      cacheTime: 6000,
      keepPreviousData: true,
      onSuccess: setData,
    },
  },
})

export const setData = () => {
  const queriesWithData = Object.values(queryClient.queryCache.queries).map(
    query => ({
      queryKey: query.queryKey,
      data: query.state.data,
    }),
  )
  storeData(JSON.stringify(queriesWithData))
}
