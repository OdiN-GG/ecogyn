import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Platform } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import MapHeader from '@/components/MapHeader';
import LocationDetail from '@/components/LocationDetail';
import MapControls from '@/components/MapControls';
import { EcoPoint, WasteType } from '@/types/ecoPoint';
import FilterBar from '@/components/FilterBar';
import CustomMarker from '@/components/CustomMarker';
import { ecoPointService } from '@/services/ecoPointService';
import { wasteTypeService } from '@/services/wasteTypeService';

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
  const [filteredPoints, setFilteredPoints] = useState<EcoPoint[]>([]);
  const [allPoints, setAllPoints] = useState<EcoPoint[]>([]);
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar eco pontos e tipos de resíduo da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔄 Iniciando busca de dados...');
        
        const [points, types] = await Promise.all([
          ecoPointService.getAll(),
          wasteTypeService.getAll()
        ]);
        
        console.log('✅ Dados carregados com sucesso');
        console.log('📊 Total de pontos:', points.length);
        console.log('🗑️ Tipos de resíduo:', types);
        
        setAllPoints(points as EcoPoint[]);
        setFilteredPoints(points as EcoPoint[]);
        setWasteTypes(types);
      } catch (err) {
        console.error('❌ Erro ao buscar dados:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar os dados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      const point = allPoints.find(p => p._id === params.id);
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
  }, [params, allPoints]);

  // Filtro por tipo de resíduo
  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredPoints(allPoints);
    } else {
      const filtered = allPoints.filter((point) =>
        point.wasteTypes.some(waste => selectedFilters.includes(waste.nameType))
      );
      setFilteredPoints(filtered);
    }
  }, [selectedFilters, allPoints]);

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
            key={point._id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            onPress={() => handleMarkerPress(point)}
          >
            <CustomMarker point={point} />
          </Marker>
        ))}
      </MapView>

      <MapHeader style={{ top: insets.top + 8 }} />

      <FilterBar
        filters={wasteTypes.map(type => ({
          _id: type._id,
          nameType: type.nameType,
          cor: type.cor
        }))}
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

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E8B57" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubText}>Toque para tentar novamente</Text>
        </View>
      )}
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#F44336',
  },
  errorText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2E8B57',
  },
  errorSubText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 4,
  },
});
