import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import useViewModel from './ViewModel';

import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamsList } from '../../../navigator/MainAppStack'
import { FlatList } from 'react-native-gesture-handler'
import { AddressListItem } from './ItemAddress';
import { RoundedButton } from '../../../components/RoundedButton';
import { ImageButton } from '../../../components/ImageButton';

interface Props extends StackScreenProps<RootStackParamsList, 'AddressListScreen'> { };
const AddressListScreen = ({ navigation, route }: Props) => {

    const { address, getAddress, checked, changeRadioValue } = useViewModel();
  return (
    <View style={styles.container}>
        <Image
                style={styles.imageBackground}
                source={require('../../../../../assets/comidas-rapidas.jpeg')} />
            <View style={{ top: '6%', left: '3%', position: 'absolute', marginTop: 30 }}>
                <ImageButton
                    text='back'
                    onPress={() => navigation.goBack()}
                />
            </View>
        <View style={styles.form}>
            <Text style={styles.formText}>Direcciones</Text>
            {   
            address.length === 0 ? 

            <Text style={styles.formInfo}>No hay direcciones</Text>
                :
            <FlatList 
                data={ address }
                keyExtractor={ (item) => item.id! }
                renderItem={ ({item}) => 
            <AddressListItem
                address={ item }
                checked={ checked }
                changeRadioValue={ changeRadioValue }
            
            /> 
            
          }
        />
        }
        <View >
            <RoundedButton
                text='Actualizar'
                onPress={ () => getAddress() }
            />
        </View>
        </View>
    </View>
  )
}

export default AddressListScreen