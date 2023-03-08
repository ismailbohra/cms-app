import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  ClassRoom,
  ExampleContainer,
  Notification,
  Profile,
} from '@/Containers'
import messaging from '@react-native-firebase/messaging'
import { fcmService } from '../Services/Notification/FCMService'
import { localNotificationService } from '../Services/Notification/LocalNotificationService'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
const Tab = createBottomTabNavigator()
import { Button, Menu, Divider, Provider } from 'react-native-paper'
import { navigateAndSimpleReset } from '@/Navigators/utils'

// @refresh reset
const MainNavigator = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)
    messaging().subscribeToTopic('STUDENT')
    // .then(() => console.log('Subscribed to topic!'))
    messaging().subscribeToTopic('ALL')
    // .then(() => console.log('Subscribed to topic!'))
  }, [])

  const onRegister = token => {
    // console.log('[App] Token', token)
  }

  const onNotification = notify => {
    // console.log('[App] onNotification', notify)
    const options = {
      soundName: 'default',
      playSound: true,
    }

    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options,
    )
  }

  const onOpenNotification = async notify => {
    console.log('open' + notify)
  }

  const navigation = useNavigation()

  const handleNotificationClick = () => {
    closeMenu()
    navigation.navigate('Notification')
  }
  const handleBackPress = () => {
    closeMenu()
    navigation.navigate('home')
  }

  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const handleLogout = () => {
    closeMenu()
    AsyncStorage.clear()
    navigateAndSimpleReset('Main')
  }

  return (
    <Provider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName

            if (route.name === 'home') {
              iconName = focused ? 'home' : 'home'
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user-circle' : 'user-circle'
            } else if (route.name === 'Notification') {
              iconName = focused ? 'bell' : 'bell'
            } else if (route.name === 'Class Room') {
              iconName = focused ? 'id-card' : 'id-card'
            }
            return <Icon name={iconName} size={20} color={color} />
          },
        })}
      >
        <Tab.Screen
          name="home"
          options={{
            title: 'IPS Academy',
            headerRight: () => (
              <View
                style={{
                  top: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  color: 'lightblack',
                }}
              >
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <Button onPress={openMenu}>
                      <Icon name="ellipsis-v" size={20} color="black" />
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={handleNotificationClick}
                    title="Notification"
                  />
                  <Divider />
                  <Menu.Item onPress={handleLogout} title="Log Out" />
                </Menu>
              </View>
            ),
          }}
          component={ExampleContainer}
        />
        <Tab.Screen
          name="Class Room"
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={handleBackPress}>
                <View style={{ marginLeft: 10 }}>
                  <Icon name="arrow-left" size={18} color="lightblack" />
                </View>
              </TouchableOpacity>
            ),
          }}
          component={ClassRoom}
        />
        <Tab.Screen
          name="Notification"
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={handleBackPress}>
                <View style={{ marginLeft: 10 }}>
                  <Icon name="arrow-left" size={18} color="lightblack" />
                </View>
              </TouchableOpacity>
            ),
          }}
          component={Notification}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={handleBackPress}>
                <View style={{ marginLeft: 10 }}>
                  <Icon name="arrow-left" size={18} color="lightblack" />
                </View>
              </TouchableOpacity>
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </Provider>
  )
}

export default MainNavigator
