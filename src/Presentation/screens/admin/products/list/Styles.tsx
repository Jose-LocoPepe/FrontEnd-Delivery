import { StyleSheet } from "react-native";

const ListProductStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.4,
        bottom: '20%'
    },
    form: {
        width: '100%',
        height: '45%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        //borderTopLeftRadius: 40,
        //borderTopRightRadius: 40,
        padding: 30
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    formContent: {
        marginLeft: 15
    },
    formImage: {
        height: 30,
        width: 30
    },
    formTextDescription: {
        fontSize: 12,
        color: 'gray'
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '11%'
    },
    logoImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2
    },
    formIcon: {
        width: 30,
        height: 30,
        marginTop: 10
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    logout: {
        position: 'absolute',
        alignSelf: 'center',
        top: 30,
        right: 15,
    },
    logoutImage: {
        width: 40,
        height: 40,
    },
    change: {
        position: 'absolute',
        alignSelf: 'center',
        top: 75,
        right: 15,
    },
    errorText: {
        backgroundColor: '#ff8800',
        borderLeftWidth: 3,
        borderColor: '#a26c00',
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    errorsContainer: {
        backgroundColor: '#ff7f7f',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },

});

export default ListProductStyles;