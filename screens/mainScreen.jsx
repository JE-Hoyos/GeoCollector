import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles/styles';
import { PolygonContext, SchemaContext, GridContext } from '../state/context';
import HeaderScreen from '../components/header/header';
import {Feather} from 'react-native-vector-icons';

import calculateGridCoordinates from './sample/createGrid';
import { useFocusEffect } from '@react-navigation/native';

export default function MainScreen({ navigation }) {
  const { polygonContext, setPolygonContext } = useContext(PolygonContext);
  const { schemaContext, setSchemaContext } = useContext(SchemaContext);
  const { gridContext, setGridContext } = useContext(GridContext);
  const [grid, setGrid] = useState(null);
  const [location, setLocation] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync();

  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log(polygonContext, 'Poligono main');
      console.log(schemaContext, 'Esquema main');
    })
  );





  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permiso de ubicación denegado');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const handlePress = (event) => {
    if (drawingMode) {
      const newCoordinates = event.nativeEvent.coordinate;
      setCoordinates([...coordinates, newCoordinates]);
    }
  };

  const toggleDrawingMode = () => {
    setPolygonContext(coordinates);
    console.log(coordinates)
    setDrawingMode(!drawingMode);
    setCoordinates([]);
  };

  const updateCoordinates = (index, newCoordinate) => {
    const updatedCoords = [...coordinates];
    updatedCoords[index] = newCoordinate;
    setCoordinates(updatedCoords);
  };



  return (
    <View style={styles.container}>
      <HeaderScreen textTittle={'GeoCollector'} />
              {/* Botón con icono en la esquina superior derecha */}
              <TouchableOpacity
          style={{
            position: 'absolute',
            top: '14%',
            right: 20,
            backgroundColor: 'white', // Ajusta el color de fondo según tus necesidades
            padding: 10,
            borderRadius: 8,
            zIndex:1
          }}
          onPress={getLocationAsync}
        >
          <Feather name="crosshair" size={25} color={styles.color4} />
        </TouchableOpacity>
      <View style={{ flex: 10 }}>
        {location ? (
          <MapView
            ref={mapRef}
            style={{ flex: 1, margin: '2%' }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            mapType="satellite"
            onPress={handlePress}
          >
            {coordinates.map((coord, index) => (
              <Marker
                key={index}
                coordinate={coord}
                pinColor="blue"
                draggable
                onDrag={(event) => updateCoordinates(index, event.nativeEvent.coordinate)}
              />
            ))}

            {coordinates.length > 1 && (
              <Polygon
                coordinates={coordinates}
                strokeColor="green"
                fillColor="green"
              />
            )}

            {polygonContext.length > 1 && (
              <Polygon
                coordinates={polygonContext}
                strokeColor="green"
                fillColor="green"
              />
            )}

            {/* Marcadores para las coordenadas de la grilla */}
            {grid && grid.length > 0 && grid.map((gridCoord, index) => (
              <Marker
                key={index}
                coordinate={gridCoord}
                title={` ${gridCoord.latitude}, ${gridCoord.longitude} `}
                pinColor={styles.color1}
              />
            ))}

            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={`Mi ubicación: ${location.latitude}, ${location.longitude} `}
            />


          </MapView>
        ) :
          (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../assets/geolocation.gif')} style={{ height: 100, width: 100 }} />
              <Text style={styles.texttitle}>Obteniendo ubicación...</Text>
              <TouchableOpacity
          style={{
            top: '14%',
            right: 20,
            backgroundColor: 'white', // Ajusta el color de fondo según tus necesidades
            padding: 10,
            borderRadius: 8,
        
          }}
          onPress={getLocationAsync}
        >
          <Feather name="crosshair" size={25} color={styles.color4} />
        </TouchableOpacity>
            </View>

          )}

      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 1, margin: '1%' }}>
            <TouchableOpacity style={styles.button} onPress={toggleDrawingMode}>
              <Text style={[styles.text1, { color: 'white' }]}>
                {drawingMode ? 'Terminar Dibujo' : '1.Iniciar Dibujo'}
              </Text>
            </TouchableOpacity>
          </View>

          {polygonContext.length > 1 && (
            <View style={{ flex: 1, margin: '1%' }}>
              <TouchableOpacity style={styles.button}
                onPress={() => { navigation.navigate('Params') }}>
                <Text style={[styles.text1, { color: 'white' }]}>
                  {'2.Parametrizar'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {polygonContext && polygonContext.length > 2 && schemaContext && schemaContext.metersGrid && (
            <View style={{ flex: 1, margin: '1%' }}>
              <TouchableOpacity style={styles.button}
                onPress={async () => {
                  newGrid = calculateGridCoordinates(polygonContext, parseFloat(schemaContext.metersGrid))
                  setGrid(newGrid);
                  setGridContext(newGrid);
                }}>
                <Text style={[styles.text1, { color: 'white' }]}>
                  {'3.Definir puntos'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {polygonContext
            && polygonContext.length > 2
            && schemaContext
            && schemaContext.metersGrid
            && schemaContext.variables
            && gridContext.length > 0
            && (
              <View style={{ flex: 1, margin: '1%' }}>
                <TouchableOpacity style={styles.button}
                  onPress={() => { navigation.navigate('Collect') }}>
                  <Text style={[styles.text1, { color: 'white' }]}>
                    {'4.Colectar datos'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </View>
    </View>
  );
}


