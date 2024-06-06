import { View, Text, Modal, StyleSheet, Button } from 'react-native'
import React from 'react'
import { RoundedButton } from './RoundedButton'
import { number } from 'yup'


interface Props {
    openGallery: (numberImage: number) => void,
    openCamera: (numberImage:number) => void,
    numberImage: number,
    modalUseState: boolean,
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
}
 
export const ModalPickMultipleImage = ({modalUseState,setModalUseState,openGallery,openCamera, numberImage}: Props) => {
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalUseState}
                onRequestClose={() => {
                    setModalUseState(!modalUseState);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textOptions}>Seleccione una opción</Text>
                        <View style={styles.buttonContainer}>
                            <RoundedButton
                                text='Galería'
                                onPress={() => {
                                    openGallery(numberImage);
                                    setModalUseState(false);
                                }}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <RoundedButton
                                text='Cámara'
                                onPress={() => {
                                    openCamera(numberImage);
                                    setModalUseState(false);
                                }}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button

                                title='Cancelar'
                                onPress={() => setModalUseState(!modalUseState)}/>
                            </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        height: 240,
        margin: 20,
        paddingTop: 35,
        paddingHorizontal: 25,
        width: 250,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 8,
    },
    textOptions: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5
    }
});