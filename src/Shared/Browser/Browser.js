import React from 'react'
import WebView from 'react-native-webview'

const Browser = ({ route: { params }, ...props }) => {
  return <WebView source={{ uri: params.link }} />
}

export default Browser
