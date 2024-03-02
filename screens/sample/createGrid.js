
const calculateGridCoordinates = (polygon, distance) => {
  if (!polygon || polygon.length < 3) {
    console.error("El polígono debe tener al menos 3 puntos");
    return [];
  }

  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

  const haversineDistance = (point1, point2) => {
    const R = 6371000; // Radio de la Tierra en metros
    const dLat = degreesToRadians(point2.latitude - point1.latitude);
    const dLon = degreesToRadians(point2.longitude - point1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(point1.latitude)) * Math.cos(degreesToRadians(point2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const pointInPolygon = (point, polygon) => {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].latitude;
      const yi = polygon[i].longitude;
      const xj = polygon[j].latitude;
      const yj = polygon[j].longitude;

      const intersect =
        yi > point.longitude !== yj > point.longitude &&
        point.latitude < ((xj - xi) * (point.longitude - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  };

  const generateGrid = () => {
    const gridCoordinates = [];

    const minX = Math.min(...polygon.map(point => point.longitude));
    const maxX = Math.max(...polygon.map(point => point.longitude));
    const minY = Math.min(...polygon.map(point => point.latitude));
    const maxY = Math.max(...polygon.map(point => point.latitude));

    const stepLng = (distance / 111319.9) / Math.cos(degreesToRadians((minY + maxY) / 2));
    const stepLat = distance / 111319.9;

    for (let lat = minY; lat <= maxY; lat += stepLat) {
      for (let lng = minX; lng <= maxX; lng += stepLng) {
        const point = { latitude: lat, longitude: lng };

        if (pointInPolygon(point, polygon)) {
          gridCoordinates.push({ ...point, distance: distance });
        }
      }
    }

    return gridCoordinates;
  };

  return generateGrid();
};

















export default calculateGridCoordinates;



