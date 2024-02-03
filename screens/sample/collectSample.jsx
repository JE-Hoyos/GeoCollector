import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { View, Text, TextInput, Modal, ScrollView } from 'react-native';
import PButtom from '../../components/buttom';
import { RadioButton } from 'react-native-paper';
import styles from '../../styles/styles';
import { Entypo } from '@expo/vector-icons';
import HeaderScreen from '../../components/header/header';
import { SchemaContext, PolygonContext, GridContext, DataContext } from '../../state/context';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import createGeoFile from '../../utils/createGeoJson';

const CollectView = ({ navigation }) => {
    const { polygonContext, setPolygonContext } = useContext(PolygonContext);
    const { schemaContext, setSchemaContext } = useContext(SchemaContext);
    const { gridContext, setGridContext } = useContext(GridContext);
    const { dataContext, setDataContext } = useContext(DataContext);
    const [viewForm, setViewForm] = useState(false);
    const [selectedOption, setSelectedOption] = useState(undefined);
    const [value, setValue] = useState(null);
    const [location, setLocation] = useState(null);
    const [locationValue, setLocationValue] = useState(null); //Coordenadas finales de muestreo
    const [features, setFeatures] = useState([]);
    const [GeoFormat, setGeoFormat] = useState({});
    const [newPoint, setNewPoint] = useState([]);

    useEffect(() => {
        console.log(schemaContext.variables, 'variables definidas');
        console.log(locationValue, 'coor de punto')
        console.log(dataContext, 'Puntos en contexto')
    }, []);

    //Escucha de posición
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }
            Location.watchPositionAsync(
                { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000 },
                (newLocation) => {
                    setLocation(newLocation.coords);
                }
            );
        })();
    }, []);

    const crateNewPoint = () => {
        const longuitude = locationValue.latitude;
        const latitude = locationValue.longitude;

        const arrayToObject = () => {
            let result = {}
            features.map(e => {
                result[e.name] = e.value
            });

            return result
        }

        const point = {
            "type": "Feature",
            "properties": arrayToObject(),
            "geometry": {
                "coordinates": [
                    latitude,
                    longuitude
                ],
                "type": "Point"
            }
        };

        let newPoints = [...dataContext, point];
        setDataContext(newPoints);
        setViewForm(false);
        //TODO: mensaje de agregado

    };

    const addFeature = (data) => {
        // Verificar si el nombre ya existe en el arreglo principal
        const existingIndex = features.findIndex((item) => item.name === data.name);

        if (existingIndex !== -1) {
            // Si el nombre ya existe, actualizar el valor correspondiente
            const updatedArray = [...features];
            updatedArray[existingIndex] = data;
            setFeatures(updatedArray);
            console.log(updatedArray, 'cRcteriaticS');

        } else {
            // Si el nombre no existe, insertar el nuevo objeto en el arreglo
            setFeatures([...features, data]);
        }
    }

    //maneja el tipo de input
    const InputView = (type, options, name) => {
        if (type == 'Categoric') {
            return (
                <RadioButton.Group onValueChange={(value) => { addFeature({ name, value }); setSelectedOption(value); }} value={selectedOption}>
                    {options.map(e => (
                        <View key={e}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={e} />
                            <Text style={styles.carItemBold}>{e}</Text>
                        </View>
                    )
                    )}
                </RadioButton.Group>
            )

        } if (type == 'Numeric') {
            return (
                <TextInput
                    keyboardType={'numeric'}
                    onChangeText={(value) => {
                        addFeature({ name, value });
                    }}
                    style={styles.textInput} />

            );
        } if (type == 'Text') {
            return (
                <TextInput
                    style={styles.textInput}

                    onChangeText={(valor) => {
                        addFeature({ name: name, value: valor });
                    }}
                />
            )


        }

    }

    const FormData = () => {
        if (viewForm && schemaContext.variables.length > 0) {
            const variables = schemaContext.variables
            return (
                <Modal
                    transparent={false}
                    animationType="slide"
                    visible={viewForm}
                >
                    <ScrollView style={{ margin: '4%' }}>
                        <Text style={styles.texttitle}>{'Formulario de registro'}</Text>
                        <Text style={styles.textSubtitle}>{'Ubicación'}</Text>
                        <View style={[styles.cardButtom]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textValue]}>Latitud:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <TextInput style={styles.textInput}
                                        value={locationValue ? locationValue.latitude.toString() : undefined}
                                    />


                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ flex: 1, }}>
                                    <Text style={[styles.textValue]}>Longitud:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <TextInput
                                        style={styles.textInput}
                                        value={locationValue && locationValue.longitude ? locationValue.longitude.toString() : undefined}

                                    ></TextInput>
                                </View>
                            </View>

                        </View>

                        <Text style={styles.textSubtitle}>{'Características'}</Text>
                        {variables.map(e => (
                            <View key={e.name} style={[styles.cardButtom, { marginTop: '4%', marginBottom: '4%' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={styles.texttitle}>{e.name}</Text>
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        {InputView(e.typeVar, e.categorics, e.name)}
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textSubtitle}>{e.units}</Text>
                                    </View>
                                </View>
                            </View>

                        ))
                        }
                        <View style={{ flexDirection: 'row', marginTop: '12%', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <PButtom label={'Agregar'} accion={() => { crateNewPoint() }} />
                            </View>

                            <View style={{ flex: 1 }}>
                                <PButtom
                                    label={'Cancelar'}
                                    accion={() => { setViewForm(false); }}
                                    background={styles.color1}
                                />
                            </View>

                        </View>

                    </ScrollView>

                </Modal>
            )
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <HeaderScreen textTittle={'Colectar'} />

                <MapView
                    style={{ flex: 9, margin: '2%', marginTop: 0 }}
                    initialRegion={{
                        latitude: polygonContext[0].latitude,
                        longitude: polygonContext[0].longitude,
                        latitudeDelta: 0.0010,
                        longitudeDelta: 0.0010,
                    }}
                    mapType="satellite"
                >
                    {polygonContext.length > 1 && (
                        <Polygon
                            coordinates={polygonContext}
                            strokeColor="red"
                        // fillColor="green"
                        />
                    )}

                    {gridContext && gridContext.length > 0 && gridContext.map((gridCoord, index) => (
                        <Marker
                            key={index}
                            coordinate={gridCoord}
                            title={` ${gridCoord.latitude}, ${gridCoord.longitude} `}
                            pinColor={styles.color1}
                        />
                    ))}

                    {location && (
                        <Marker
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            title='Tú posición actual'>
                        </Marker>
                    )}
                </MapView>

                {FormData()}


                <View style={{ flexDirection: 'row', marginTop: '5%', marginBottom: '5%' }}>
                    {dataContext && dataContext.length > 0 && (
                        <View style={{ flex: 1 }}>
                            <PButtom label={'Terminar muestreo'} accion={() => {
                                createGeoFile({ puntos: dataContext, name: 'DataCollect' })
                            }} />
                        </View>
                    )}


                    <View style={{ flex: 1 }}>
                        <PButtom label={'Agregar +'}
                            accion={() => { setViewForm(true); setLocationValue(location); }} />
                    </View>


                    {dataContext && dataContext.length > 0 && (
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center' }}>Nro. muestras</Text>
                            <PButtom label={dataContext.length + ' / ' + gridContext.length} accion={() => {navigation.navigate('ListData') }} />
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
};

export default CollectView;