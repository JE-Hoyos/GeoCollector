import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, TextInput, Modal, ScrollView } from 'react-native';
import PButtom from '../../components/buttom';
import styles from '../../styles/styles';
import { Entypo } from '@expo/vector-icons';
import HeaderScreen from '../../components/header/header';
import { SchemaContext } from '../../state/context';
import { List } from 'react-native-paper';
import schemaSoildTester from '../../mocks/soil-tester';

const FormParameter = ({ navigation }) => {
    const { schemaContext, setSchemaContext } = useContext(SchemaContext);
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [metersGrid, setMetersGrid] = useState(null);
    const [nameScheme, setNameScheme] = useState(null);
    const [varConfigs, setVarConfig] = useState([]); //colleccion de variables

    const [name, setName] = useState(null);
    const [units, setUnits] = useState(null);
    const [typeVar, setTypeVar] = useState(null);

    const [oneCategoric, setOneCategoric] = useState(null);
    const [categorics, setCategorics] = useState([]);//coleccion categorias

    useFocusEffect(
        useCallback(() => {
            console.log(schemaContext, 'Esquema sampling');

        })
    );

    useEffect(() => {
        if (schemaContext && schemaContext.metersGrid) {
            setMetersGrid(schemaContext.metersGrid)
        }
    }, []);

    useEffect(() => {
        if (schemaContext && schemaContext.nameScheme) {
            setNameScheme(schemaContext.nameScheme)
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (schemaContext && schemaContext.variables) {
                setVarConfig(schemaContext.variables);
            }

        })
    );

    const handleNewVar = () => {
        if (name && units && typeVar) {
            const newVar = [...varConfigs];
            newVar.push({ name, units, typeVar, categorics })
            setVarConfig(newVar); setCategorics([]);
            setOneCategoric(null);
            setName(null);
            setUnits(null);
            setTypeVar(null);
            setVisible(false);
        }
    };
    const handleTypeVarChange = (value) => {
        setTypeVar(value);
    };
    const handleExpanded = () => {
        setExpanded(!expanded)
    };
    const handleCategoric = () => {
        if (oneCategoric != "") {
            const newCategorics = [...categorics];
            newCategorics.push(oneCategoric);
            setCategorics(newCategorics);
        }
    };
    const handleDeleteCategoric = (valueToDelete) => {
        const indexToDelete = categorics.findIndex((e) => e === valueToDelete);

        if (indexToDelete !== -1) {
            const newCategorics = [...categorics];
            newCategorics.splice(indexToDelete, 1); // Elimina la categoría en el índice encontrado
            setCategorics(newCategorics);
        } else {
            // Manejar el caso en el que el valor no se encuentra en el array
            console.error('Categoría no encontrada:', valueToDelete);
        }
    };
    const ListVar = () => {
        if (varConfigs && varConfigs.length > 0) {
            return varConfigs.map(e => (
                <View key={e.name}
                    style={{
                        flexDirection: 'row',
                        borderStyle: 'solid',
                        borderColor: '#075755',
                        borderWidth: 1,
                        justifyContent: 'center',
                        borderRadius: 20,
                        padding: '4%', paddingTop: '1%', paddingBottom: '1%',
                    }}>
                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{}}>{e.name}</Text>
                    </View>

                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{}}>{e.units}</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableHighlight onPress={() => { }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: styles.color3, paddingRight: '12%' }}>{'x'}</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            ))

        }

    }
    const RenderCategoricList = () => {
        if (categorics) {
            return categorics.map(e => (
                <View key={e} style={[{
                    flexDirection: 'row',
                    borderStyle: 'solid',
                    borderColor: '#075755',
                    borderWidth: 1,
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: '4%', paddingTop: '1%', paddingBottom: '1%',
                }]}>
                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{}}>{e}</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableHighlight onPress={() => handleDeleteCategoric(e)}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: styles.color3, paddingRight: '12%' }}>{'x'}</Text>
                        </TouchableHighlight>

                    </View>

                </View>
            ));
        } else {
            return null;
        }
    }
    const FormModal = () => {
        return (
            <Modal
                transparent={false}
                animationType="slide"
                visible={visible}
            >
                <View style={{ marginTop: '6%' }}>
                    <ScrollView>
                        <Text style={styles.texttitle}> Agregar nueva variable</Text>
                        {/* form */}
                        <View style={{ margin: '4%' }}>
                            <Text style={styles.text1}>Nombre de la variable</Text>
                            <TextInput
                                onChangeText={(value) => { setName(value) }}
                                style={[styles.textInput, { textAlign: 'center', fontWeight: 'bold' }]}
                            />

                            <Text style={styles.text1}>Unidad de medida de la variable</Text>
                            <TextInput
                                onChangeText={(value) => { setUnits(value) }}
                                style={[styles.textInput, { textAlign: 'center', fontWeight: 'bold' }]}
                            />

                            <Text style={styles.text1}>Tipo de variable</Text>

                            <List.Section>
                                <List.Accordion
                                    title={typeVar ? typeVar : 'Seleccione una opción'}
                                    left={
                                        (props) => (<List.Icon {...props} icon="equal" />)

                                    }
                                    expanded={expanded}
                                    onPress={handleExpanded}
                                    theme={{
                                        colors: {
                                            primary: styles.color1,
                                            background: styles.color2,
                                        },
                                    }}


                                >
                                    <List.Item
                                        title="Numeric"
                                        onPress={() => {
                                            handleTypeVarChange('Numeric');
                                            handleExpanded(!expanded);
                                        }}
                                    />
                                    <List.Item
                                        title="Text"
                                        onPress={() => {
                                            handleTypeVarChange('Text');
                                            handleExpanded(!expanded);
                                        }}
                                    />
                                    <List.Item
                                        title="Categoric"
                                        onPress={() => {
                                            handleTypeVarChange('Categoric');
                                            handleExpanded(!expanded);
                                        }}
                                    />
                                </List.Accordion>
                            </List.Section>
                        </View>

                        {typeVar && typeVar === 'Categoric' && (
                            <View style={[styles.cardButtom, { margin: '4%', marginTop: 0 }]}>
                                <Text style={styles.carTitle}> Defina sus categorias</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3 }}>
                                        <TextInput
                                            style={[styles.textInput, { textAlign: 'center', fontWeight: 'bold' }]}
                                            onChangeText={(value) => setOneCategoric(value)}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <PButtom label={'Add'} accion={handleCategoric} />
                                    </View>
                                </View>

                                {/* Lista de categorias  */}
                                <RenderCategoricList />
                            </View>
                        )}


                        <View style={{ marginTop: '12%' }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleNewVar}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: '12%' }}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: 'green' }]}
                                onPress={() => {
                                    setVisible(!visible)
                                    setCategorics([]);
                                    setOneCategoric(null);
                                    setName(null);
                                    setUnits(null);
                                    setTypeVar(null)
                                }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>X</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>

            </Modal>
        )
    }


    return (
        <ScrollView S>
            <View style={styles.container}>
                <HeaderScreen textTittle={'Parámetros'} />
                {/* Predefinidos */}
                <View>
                    <Text style={styles.texttitle}>Predefinidos</Text>
                    <View>
                        <TouchableHighlight style={styles.button} 
                        onPress={()=>{
                            setSchemaContext(schemaSoildTester)
                        }}>
                            <Text>Soil tester</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                
                <View style={[styles.cardButtom, { margin: '4%' }]}>
                    <Text style={styles.texttitle}>Esquema de muestreo</Text>

                    <Text style={styles.text1}>Nombre del esquema</Text>
                    <TextInput
                        value={nameScheme ? nameScheme : undefined}
                        onChangeText={(value) => setNameScheme(value)}
                        style={[styles.textInput, { textAlign: 'center', fontWeight: 'bold' }]}
                    />

                    <Text style={styles.text1}>Distancia en metros</Text>
                    <TextInput
                        value={metersGrid ? metersGrid : undefined}
                        onChangeText={(value) => setMetersGrid(value)}
                        style={[styles.textInput, { textAlign: 'center', fontWeight: 'bold' }]}
                        keyboardType='numeric'
                    />
                    <Text>Configura tu cuadricula de muestreo, seleccionando la distancia entre puntos, esto te guiará sobre la ubicación de cada punto de muestreo </Text>
                </View>

                <View style={[styles.cardButtom, { margin: '4%' }]}>
                    <Text style={styles.texttitle}>Variables de muestreo</Text>

                    <View style={{ alignItems: 'center', marginBottom: '6%' }}>
                        <TouchableOpacity
                            onPress={() => setVisible(!visible)}>
                            <Entypo name="add-to-list" size={35} color="#075755"></Entypo>
                        </TouchableOpacity>
                    </View>


                    <Text style={{ textAlign: 'center' }}>Define las variables que deseas muestrear</Text>
                    {FormModal()}
                    <View>
                        {ListVar()}
                    </View>

                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setSchemaContext({ nameScheme, metersGrid, variables: varConfigs });
                        navigation.navigate('Main');
                    }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default FormParameter;