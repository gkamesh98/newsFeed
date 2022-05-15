import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Trends from '../../Screens/Trends'
import Browser from '../../Shared/Browser'
import Home from '../../Screens/Home'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const AppNavigation = ({ ...props }) => {
  return (
    // <></>
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="trending"
        component={Trends}
        options={{
          title: 'Trending',
          tabBarLabel: 'Trending',
        }}
      />
    </Tab.Navigator>
  )
}

const Navigator = ({ ...props }) => {
  return (
    <Stack.Navigator
      initialRouteName="app"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="app" component={AppNavigation} />
      <Stack.Screen
        name="browser"
        component={Browser}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerShown: true,
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default Navigator
