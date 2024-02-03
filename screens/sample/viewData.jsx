import { View, FlatList, Text } from "react-native"
import styles from "../../styles/styles"
import HeaderScreen from "../../components/header/header"
import PButtom from "../../components/buttom"
import { useContext, useEffect, useState } from "react"
import { DataContext, SchemaContext } from "../../state/context"

const ViewData = ({ navigation }) => {
    const { dataContext, setDataContext } = useContext(DataContext);

    const renderItem = ({ item }) => (
        <View style={styles.cardButtom}>
            <Text>Data: {item.properties.toString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderScreen textTittle={'Colectados'} />

            <Text style={styles.textSubtitle}>
            {`Cantidad de muestras: ${DataContext.length}`}
            </Text>

            <View style={{ flex: 8 }}>
                <FlatList
                    data={ dataContext }
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />

            </View>
            <View style={{ flex: 1 }}>
                <PButtom label={'Volver'} accion={() => { navigation.navigate('Collect') }} />
            </View>
        </View>
    )
}

export default ViewData;