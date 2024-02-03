import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './navigation/stackNavigation';
import { PolygonContext, SchemaContext, GridContext, DataContext } from './state/context';
import { SafeAreaView } from 'react-native';

export default function App() {
  const [polygonContext, setPolygonContext] = useState([]);
  const [schemaContext, setSchemaContext] = useState([]);
  const [gridContext, setGridContext] = useState([]);
  const [dataContext, setDataContext] = useState([]);

  return (
    // <NotifierWrapper>
    <DataContext.Provider value={{ dataContext, setDataContext }}>
      <GridContext.Provider value={{ gridContext, setGridContext }}>
        <PolygonContext.Provider value={{ polygonContext, setPolygonContext }}>
          <SchemaContext.Provider value={{ schemaContext, setSchemaContext }}>
            <NavigationContainer>
              <SafeAreaView style={{flex:1}}>
              <MainStackNavigation />
              </SafeAreaView>
            </NavigationContainer>
          </SchemaContext.Provider>
        </PolygonContext.Provider>
      </GridContext.Provider>
    </DataContext.Provider>
    // </NotifierWrapper>
  );
}

