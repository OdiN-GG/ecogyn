import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
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

// Map components and state
let MapView: any = () => null;
let Marker: any = () => null;
let mapRef: React.RefObject<any> | null = null;
let Maps: any = null;

const initialRegion = {
  latitude: -16.6799,
  longitude: -49.255,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Only initialize map components for native platforms
if (Platform.OS !== 'web') {
  Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  mapRef = React.createRef();
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [selectedPoint, setSelectedPoint] = useState<EcoPoint | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentRegion, setCurrentRegion] = useState(initialRegion);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredPoints, setFilteredPoints] = useState(ecoPoints);

  // Request location permissions and get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        setUserLocation({
          latitude,
          longitude,
        });
        
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 5.0010,
          longitudeDelta: 5.0010,
        });
      }
    })();
  }, []);

  // Abre o Modal com o Eco Ponto com os parametros selecionado
  useEffect(() => {
    if (params.id && Platform.OS !== 'web') {
      const point = ecoPoints.find(p => p.id === params.id);
      if (point && mapRef?.current) {
        setSelectedPoint(point);
        mapRef.current.animateToRegion({
          latitude: point.latitude,
          longitude: point.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });

        router.replace('/(tabs)'); // Limpa os parametros recebidos da rota List
      }
    }
  }, [params]);

  // Filter eco-points based on selected waste types
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
    if (Platform.OS !== 'web' && userLocation && mapRef?.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.,
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

 
  // Native platform render with map
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        initialRegion={currentRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale
        onRegionChangeComplete={setCurrentRegion}
      >
        {filteredPoints.map((point) => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
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
        style={{ top: insets.top + 72 }}
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
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webPlaceholderText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});