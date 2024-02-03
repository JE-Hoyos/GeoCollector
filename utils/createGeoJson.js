import * as FileSystem from 'expo-file-system';
import path from 'path';
import * as Sharing from 'expo-sharing';

const createGeoFile = async ({ puntos, name }) => {
    const structure = {
        "type": "FeatureCollection",
        "features": puntos
    };

    try {
        const jsonString = JSON.stringify(structure);
        // Obtén la ruta del directorio 'geo-files' en el sistema de archivos del dispositivo/emulador
        const directoryUri = path.join(FileSystem.documentDirectory, 'geo-files');
        await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
        const fileUri = path.join(directoryUri, `${name}.geojson`);
        // Escribe el archivo GeoJSON
        await FileSystem.writeAsStringAsync(fileUri, jsonString, {
            encoding: FileSystem.EncodingType.UTF8,
        });
        // Verifica si Expo Sharing está disponible
        if (!(await Sharing.isAvailableAsync())) {
            console.log('La compartición no está disponible en este dispositivo');
            return;
        }

        await Sharing.shareAsync(fileUri, {
            mimeType: 'application/json',
            dialogTitle: 'Compartir GeoJSON',
            UTI: 'public.json',
        });

        console.log('GeoJSON creado exitosamente en:', fileUri);
    } catch (error) {
        console.error('Error al crear GeoJSON:', error);
    }
};

export default createGeoFile;
