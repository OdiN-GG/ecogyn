import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { WasteType } from '@/types/ecoPoint';
import Colors from '@/constants/Colors';

interface WasteTypeChipProps {
  wasteType: WasteType;
  isSelected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function WasteTypeChip({ 
  wasteType, 
  isSelected, 
  onPress,
  style 
}: WasteTypeChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isSelected ? wasteType.color : 'white' },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          { color: isSelected ? 'white' : wasteType.color }
        ]}
      >
        {wasteType.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});