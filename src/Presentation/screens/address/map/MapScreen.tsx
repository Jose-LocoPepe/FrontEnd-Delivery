import { View, Text } from 'react-native'
import React from 'react'

import useViewModel from './ViewModel'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from '../../../navigator/MainAppStack'

interface Props extends StackScreenProps<RootStackParamsList, 'MapScreen'> {}


export const MapScreen = () => {

  const {} = useViewModel();

  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  )
}