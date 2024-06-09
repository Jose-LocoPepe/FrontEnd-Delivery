import { StyleSheet } from "react-native";

const AddressFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imageContainer: {
        flex: 3,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.4,
    },
    buttonContainer: {
        top: '15%',
        left: '3%',
        zIndex: 1,
    },
    form: {
        flex: 7,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        width: '100%',
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    errorText: {
        backgroundColor: '#ff7f7f',
        borderLeftWidth: 3,
        borderColor: '#993235',
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
    }
});

export default AddressFormStyles;