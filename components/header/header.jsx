import { Dimensions, PixelRatio } from 'react-native';
//Captura de dimensiones
const { width, height } = Dimensions.get('window');

import {
    Text,
    View,
    StyleSheet,
    Image,
  } from 'react-native';

const HeaderScreen=({textTittle})=>{
    return(
        <View style ={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={[styles.label]}>{textTittle}</Text>
            </View>

            <View style={[styles.logoContainer]}>
                <Image style = {styles.logo}
                    source = { require('../../assets/logo.png') }
                /> 
            </View>          
        </View>
    )
}

const styles = StyleSheet.create({ 
    container:{
        flexDirection:'row',
        justifyContent:'center',
    },
    labelContainer:{
        flex:4, 
        alignItems:'center', 
        justifyContent:'center',
    },
    logoContainer:{
        flex:3, 
        alignItems:'center',
        justifyContent:'center',
    },
  
    logo:{ 
        width: width/3, 
        height: height/8,
        resizeMode: 'contain',
    },

    label:{
        textAlign:'center',
        fontSize: 24,
        fontWeight:'bold',
        color:'#324a52',
    }
})

export default HeaderScreen;