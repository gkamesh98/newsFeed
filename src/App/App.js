import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from 'react-query'
import Navigator from './Navigator'
import { queryClient } from './Query'
import QueryDataReHydrater from './Query/QueryDataReHydrater'

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <QueryDataReHydrater>
            <Navigator />
          </QueryDataReHydrater>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
