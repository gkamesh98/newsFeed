import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native'
import { useQueryClient } from 'react-query'
import NewsCard from '../../Shared/NewsCard'
import { useGetTrend } from './hooks'

const Trends = ({ navigation, ...props }) => {
  const { isFetching, articles, goToNextPage } = useGetTrend()
  const [displayArticles, setDisplayArticles] = useState([])
  // useEffect(() => {
  //   goToNextPage()
  // }, [])
  const queryClient = useQueryClient()

  useEffect(() => {
    if (
      articles.length &&
      displayArticles[displayArticles.length - 1] !==
        articles[articles.length - 1]
    ) {
      setDisplayArticles(display => [...display, ...articles])
    }
  }, [articles])

  return (
    <SafeAreaView>
      <FlatList
        data={displayArticles}
        renderItem={props => <NewsCard navigation={navigation} {...props} />}
        keyExtractor={data => data.publishedAt}
        initialNumToRender={5}
        scrollEnabled={true}
        onEndReached={goToNextPage}
        onEndReachedThreshold={0.5}
        // onRefresh
      />
    </SafeAreaView>
  )
}

export default Trends
