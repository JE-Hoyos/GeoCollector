import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    color1: '#618e9d',
    color2: '#acc4cc',
    color3:'#324a52',
    color4:'#648c9c',
    container: {
        backgroundColor:'white',
        flex: 1,
    },
    texttitle: {
        color: '#324a52',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: '4%'
    },
    textSubtitle:{
        color: '#324a52',
        fontSize: 20,
        textAlign: 'center',
    },
    text1:{
        fontSize: 18,
    },
    button: {
        color:'white',
        backgroundColor: "#648c9c",
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '2%',
    },
    label: {
        color: 'gray',
        fontSize: 18,
        textAlign: 'left',
    },
    labelBold: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'left',
    },
    textItem:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#324a52'
    },
    textValue:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
       
    },
    textInput: {
        height:30,
        borderRadius:10,
        backgroundColor: '#acc4cc',
        marginTop: '4%',
        marginBottom: '4%',
        fontSize: 18,
        textAlign:'center'
       
    },

    textArea: {
        padding: '2%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    cardButtom: {
        borderStyle: 'solid',
        borderColor: '#075755',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: '4%'
    },
    carItem: {
        color: 'gray',
        fontSize: 14
    },
    carItemBold: {
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold',
    },
    carSubTitle: {
        color: '#324a52',
        fontWeight: 'bold',
        fontSize: 14
    },
    carTitle: {
        color: '#324a52',
        fontWeight: 'bold',
        fontSize: 16
    },
    redioButtom:{
        borderWidth: 1, // Agrega un borde de ancho 1
        borderColor:'#075755', // Color del borde
        borderRadius: 8
    }
});

export default styles;