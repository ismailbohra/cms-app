import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 1000),
    )
    const dataToken = await AsyncStorage.getItem('AccessToken')
    setDefaultTheme({ theme: 'default', darkMode: null })
    if (dataToken) {
      navigateAndSimpleReset('Home')
    } else {
      navigateAndSimpleReset('Main')
    }
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter, { backgroundColor: 'white' }]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text style={Fonts.textCenter}>Welcome to IPS Academy</Text>
    </View>
  )
}

export default StartupContainer
