import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, SafeAreaView, View, ActivityIndicator } from 'react-native'
import { useQueryClient } from 'react-query'
import DatePicker from '../../Shared/DatePicker'
import NewsCard from '../../Shared/NewsCard'
import { useGetEveryTHing } from './hooks'

const Trends = ({ navigation, ...props }) => {
  const { isFetching, articles, goToNextPage } = useGetEveryTHing()
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
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
      }}>
      <FlatList
        data={displayArticles}
        renderItem={props => <NewsCard navigation={navigation} {...props} />}
        keyExtractor={(data, index) => data.url + index}
        initialNumToRender={5}
        // scrollEnabled={true}
        onEndReached={goToNextPage}
        onEndReachedThreshold={1}
      />
      {isFetching ? <ActivityIndicator size="large" /> : null}
    </SafeAreaView>
  )
}

export default Trends
