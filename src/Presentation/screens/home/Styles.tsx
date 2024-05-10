import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imageBackground: {
        bottom: 30,
        width: '100%',
        height: '70%',
        opacity: 0.3,
    },
    form: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 50,

        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: -2
    },
    formTextSub: {
        fontWeight: 'normal',
        fontSize: 13,
        textAlign: 'center'
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginLeft: 15
    },
    formhome: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    formRegisterText: {
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
        color: 'orange',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginLeft: 10
    },
    formIcon: {
        width: 50,
        height: 50,
        marginTop: 10
    },
    logoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '15%'
    },
    logo: {
        bottom:30,
        width: 300,
        height: 300
    },
    logoText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
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
    }
});

export default LoginStyles;