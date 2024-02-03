import * as React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';


const PButtom = ({ label, accion, background, textColor, bold }) => {
    return (
        <View>
            <TouchableHighlight style={[styles.button,
            {
                backgroundColor: background ? background : '#324a52'
            }]}
                onPress={accion}
            >
                <Text style={
                    {
                        color: textColor?textColor:'white', 
                        fontWeight: bold?'bold':'normal', 
                        textAlign: 'center'
                    }}>
                    {label}
                </Text>
            </TouchableHighlight>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        // paddingLeft: 40,
        // paddingRight: 40,
        // paddingTop: 15,
        // paddingBottom: 15,
        padding:'6%',
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

export default PButtom;

