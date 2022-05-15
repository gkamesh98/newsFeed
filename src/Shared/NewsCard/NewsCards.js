import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
import React from 'react'

const NewsCards = ({
  item: { urlToImage, url, title, ...item },
  navigation,
  ...props
}) => {
  // const navigation = useNavigation()
  return (
    <View style={[styles.external]}>
      <Pressable
        style={[styles.pressableView]}
        onPress={() => {
          navigation.navigate('browser', { title, link: url })
        }}>
        <Image
          style={{
            height: 200,
            width: '100%',
            resizeMode: 'cover',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
          source={{
            uri: urlToImage,
          }}
        />
        <View style={[styles.textContainerView]}>
          <Text>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  external: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  pressableView: {
    color: '#333',
    backgroundColor: 'white',
    borderRadius: 7,
    width: '90%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'hsla(0,0%,58%,.14)',
    shadowColor: 'rgba(43, 48, 97, 0.1)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 17,
  },
  textContainerView: {
    padding: 8,
  },
})

export default NewsCards
