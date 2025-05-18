import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Animated,
  Linking,
  StyleProp, 
  ViewStyle,
  Platform,
  Image
} from 'react-native';
import { ExternalLink, X, Phone, Globe, Navigation, Clock, Info } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { EcoPoint } from '@/types/ecoPoint';
import WasteTypeChip from './WasteTypeChip';

interface LocationDetailProps {
  point: EcoPoint | null;
  onClose: () => void;
  userLocation: { latitude: number; longitude: number } | null;
  style?: StyleProp<ViewStyle>;
}

export default function LocationDetail({ 
  point, 
  onClose, 
  userLocation,
  style
}: LocationDetailProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    if (point) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [point, fadeAnim]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const openMapsApp = () => {
    if (!userLocation || !point) return;

    const scheme = Platform.select({ ios: 'maps:', android: 'geo:' });
    const latLng = `${point.latitude},${point.longitude}`;
    const label = point.name;
    const url = Platform.select({
      ios: `${scheme}?q=${label}&ll=${latLng}`,
      android: `${scheme}0,0?q=${latLng}(${label})`
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const callPhone = () => {
    if (point?.phone) {
      Linking.openURL(`tel:${point.phone}`);
    }
  };

  const openWebsite = () => {
    if (point?.website) {
      Linking.openURL(`https://${point.website}`);
    }
  };

  if (!point) return null;
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0]
        })}] },
        style
      ]}
    >
      <Image 
        source={{ uri: point.imageUrl }} 
        style={styles.image}
      />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{point.name}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#999" />
          </TouchableOpacity>
        </View>
        <Text style={styles.address}>{point.address}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Resíduos aceitos</Text>
          </View>
          <View style={styles.wasteTypesContainer}>
            {point.wasteTypes.map(wasteType => (
              <WasteTypeChip
                key={wasteType.id}
                wasteType={wasteType}
                isSelected={true}
                onPress={() => {}}
                style={styles.wasteTypeChip}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Horário de funcionamento</Text>
          </View>
          <Text style={styles.sectionText}>{point.openingHours}</Text>
        </View>

        {expanded && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Info size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Sobre o local</Text>
            </View>
            <Text style={styles.sectionText}>{point.description}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={callPhone}
        >
          <Phone size={20} color={Colors.primary} />
          <Text style={styles.actionText}>Ligar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={openWebsite}
          disabled={!point.website}
        >
          <Globe size={20} color={point.website ? Colors.primary : '#999'} />
          <Text 
            style={[
              styles.actionText, 
              { color: point.website ? Colors.primary : '#999' }
            ]}
          >
            Website
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.navigateButton]}
          onPress={openMapsApp}
        >
          <Navigation size={20} color="white" />
          <Text style={styles.navigateButtonText}>Navegar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.expandButton}
        onPress={toggleExpand}
      >
        <Text style={styles.expandButtonText}>
          {expanded ? 'Ver menos' : 'Ver mais'}
        </Text>
        <ExternalLink size={16} color={Colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: 500,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    padding: 16,
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.primary,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  address: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary,
  },
  content: {
    maxHeight: 180,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  sectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  wasteTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wasteTypeChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  navigateButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    marginLeft: 8,
  },
  navigateButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    marginBottom: 8,
  },
  expandButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginRight: 4,
  },
});