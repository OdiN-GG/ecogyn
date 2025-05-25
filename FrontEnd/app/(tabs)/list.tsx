import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput,
  ActivityIndicator 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import Colors from '@/constants/Colors';
import WasteTypeChip from '@/components/WasteTypeChip';
import { EcoPoint, WasteType } from '@/types/ecoPoint';
import { getEcoPoints, getWasteTypes } from '@/services/api';

export default function ListScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoints, setFilteredPoints] = useState<EcoPoint[]>([]);
  const [allPoints, setAllPoints] = useState<EcoPoint[]>([]);
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [points, types] = await Promise.all([
          getEcoPoints(),
          getWasteTypes()
        ]);
        setAllPoints(points);
        setFilteredPoints(points);
        setWasteTypes(types);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os dados');
        console.error('Erro ao buscar dados:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allPoints;
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(point => 
        point.name.toLowerCase().includes(query) || 
        point.address.toLowerCase().includes(query)
      );
    }
    
    // Apply waste type filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(point => 
        point.wasteTypes.some(waste => selectedFilters.includes(waste.name))
      );
    }
    
    setFilteredPoints(filtered);
  }, [searchQuery, selectedFilters, allPoints]);

  const toggleFilter = (filterId: string) => { 
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handlePointPress = (point: EcoPoint) => {
    router.push({
      pathname: '/(tabs)',
      params: { 
        lat: point.latitude.toString(),
        lng: point.longitude.toString(),
        id: point.id
      }
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Pontos de Coleta</Text>
        <Text style={styles.subtitle}>
          Encontre pontos de coleta em Goiânia
        </Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome ou endereço"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color={Colors.secondary} />
            </TouchableOpacity>
          )}
        </View>
        
        <FlatList
          data={wasteTypes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          style={styles.filtersContainer}
          renderItem={({ item }) => (
            <WasteTypeChip
              wasteType={item}
              isSelected={selectedFilters.includes(item.name)}
              onPress={() => toggleFilter(item.name)}
              style={styles.filterChip}
            />
          )}
        />
      </View>
      
      <FlatList
        data={filteredPoints}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => handlePointPress(item)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardAddress}>{item.address}</Text>
              
              <View style={styles.wasteTypesContainer}>
                {item.wasteTypes.slice(0, 3).map(wasteType => (
                  <View key={wasteType.name} style={styles.wasteTypeTag}>
                    <Text style={styles.wasteTypeText}>{wasteType.name}</Text>
                  </View>
                ))}
                {item.wasteTypes.length > 3 && (
                  <Text style={styles.moreText}>+{item.wasteTypes.length - 3}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum ponto de coleta encontrado.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    padding: 16,
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.primary,
    marginTop: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  cardAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  wasteTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wasteTypeTag: {
    backgroundColor: Colors.lightBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  wasteTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
  },
  moreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});