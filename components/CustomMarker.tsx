import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { EcoPoint } from '@/types/ecoPoint';

interface CustomMarkerProps {
  point: EcoPoint;
}

export default function CustomMarker({ point }: CustomMarkerProps) {
  // Choose color based on the first waste type
  const color = point.wasteTypes[0]?.color || Colors.primary;
  
  // Determine if it's a municipal point to show different styling
  const isMunicipal = point.isMunicipal;
  
  return (
    <View style={styles.container}>
      <MapPin 
        size={32} 
        color={color} 
        fill={isMunicipal ? color : 'transparent'} 
        strokeWidth={isMunicipal ? 1.5 : 2.5}
      />
      <View 
        style={[
          styles.dot, 
          { backgroundColor: color }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    bottom: 12,
  },
});