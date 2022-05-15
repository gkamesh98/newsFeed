import { QueryClient } from 'react-query'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      stateTime: Infinity,
      cacheTime: 6000,
    },
  },
})
