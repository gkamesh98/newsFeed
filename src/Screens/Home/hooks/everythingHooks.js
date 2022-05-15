import { pageSize } from '../../../Shared/Constants'
import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getEveryThing } from '../queries'
import { EveryThing } from '../constants'

export const useGetEveryTHing = (params = { q: 'bit' }) => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const existingValue = queryClient.getQueryData(EveryThing)

  const forceGetData = useCallback(({ queryKey }) => {
    const [, pageParams] = queryKey

    return getEveryThing({
      ...pageParams,
    })
  }, [])

  const { isFetching, data, refetch } = useQuery({
    queryKey: [
      EveryThing,
      {
        ...params,
        page: page,
      },
    ],
    queryFn: forceGetData,
  })

  useEffect(() => {
    if (data && page * pageSize <= data.totalResults) {
      queryClient.prefetchQuery({
        queryKey: [
          EveryThing,
          {
            ...params,
            page: page + 1,
          },
        ],
        queryFn: forceGetData,
      })
    }
  }, [])

  const goToNextPage = useCallback(() => {
    setPage(currentPage => currentPage + 1)
  }, [])

  return {
    isFetching,
    articles: existingValue ?? data?.articles ?? [],
    goToNextPage,
  }
}
