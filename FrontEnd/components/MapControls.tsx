import React from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Layers, Navigation, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface MapControlsProps {
  onCenterLocation: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function MapControls({ onCenterLocation, style }: MapControlsProps) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={onCenterLocation}>
        <MapPin size={24} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Layers size={24} color={Colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Navigation size={24} color={Colors.accent} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});