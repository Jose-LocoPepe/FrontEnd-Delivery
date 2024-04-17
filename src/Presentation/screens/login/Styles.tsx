import { StyleSheet } from "react-native";

const Loginstyles = StyleSheet.create({
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
        bottom: -50,
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
    formLogin: {
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
    }
});

export default Loginstyles;