import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import MapHeader from '@/components/MapHeader';
import LocationDetail from '@/components/LocationDetail';
import MapControls from '@/components/MapControls';
import { ecoPoints } from '@/data/ecoPointsData';
import { EcoPoint } from '@/types/ecoPoint';
import FilterBar from '@/components/FilterBar';
import { wasteTypes } from '@/data/wasteTypesData';
import CustomMarker from '@/components/CustomMarker';

const initialRegion: Region = {
  latitude: -16.6799,
  longitude: -49.255,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);

  const [selectedPoint, setSelectedPoint] = useState<EcoPoint | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [currentRegion, setCurrentRegion] = useState<Region>(initialRegion);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredPoints, setFilteredPoints] = useState<EcoPoint[]>(ecoPoints);

  // Localização do usuário
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setUserLocation({ latitude, longitude });
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 5.001,
          longitudeDelta: 5.001,
        });
      }
    })();
  }, []);

  // Abrir eco ponto da rota
  useEffect(() => {
    if (params.id) {
      const point = ecoPoints.find(p => p.id === params.id);
      if (point && mapRef.current) {
        setSelectedPoint(point);
        mapRef.current.animateToRegion({
          latitude: point.latitude,
          longitude: point.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        router.replace('/(tabs)');
      }
    }
  }, [params]);

  // Filtro por tipo de resíduo
  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredPoints(ecoPoints);
    } else {
      const filtered = ecoPoints.filter((point) =>
        point.wasteTypes.some(waste => selectedFilters.includes(waste.id))
      );
      setFilteredPoints(filtered);
    }
  }, [selectedFilters]);

  const handleMarkerPress = (point: EcoPoint) => {
    setSelectedPoint(point);
  };

  const handleCloseDetail = () => {
    setSelectedPoint(null);
  };

  const centerOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        initialRegion={currentRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale
        onRegionChangeComplete={setCurrentRegion}
      >
        {filteredPoints.map(point => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            onPress={() => handleMarkerPress(point)}
          >
            <CustomMarker point={point} />
          </Marker>
        ))}
      </MapView>

      <MapHeader style={{ top: insets.top + 8 }} />

      <FilterBar
        filters={wasteTypes}
        selectedFilters={selectedFilters}
        onToggleFilter={toggleFilter}
        style={{ top: insets.top + 100 }}
      />

      <MapControls
        onCenterLocation={centerOnUserLocation}
        style={{ bottom: insets.bottom + (selectedPoint ? 270 : 16) }}
      />

      <LocationDetail
        point={selectedPoint}
        onClose={handleCloseDetail}
        userLocation={userLocation}
        style={{ bottom: insets.bottom }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
