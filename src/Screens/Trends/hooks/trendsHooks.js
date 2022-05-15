import { pageSize } from '../../../Shared/Constants'
import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getTrendingNews } from '../queries'
import { Trends } from '../constants'

export const useGetTrend = (
  params = {
    sources: 'bbc-news',
  },
) => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const existingValue = queryClient.getQueryData(Trends)

  const forceGetData = useCallback(({ queryKey }) => {
    const [, pageParams] = queryKey

    return getTrendingNews({
      ...pageParams,
    })
  }, [])

  const { isFetching, data, refetch } = useQuery({
    queryKey: [
      Trends,
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
          Trends,
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
