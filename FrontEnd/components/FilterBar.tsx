import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { WasteType } from "../types/ecoPoint";
import WasteTypeChip from './WasteTypeChip';

interface FilterBarProps {
  filters: WasteType[];
  selectedFilters: string[];
  onToggleFilter: (filterId: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function FilterBar({ 
  filters, 
  selectedFilters, 
  onToggleFilter,
  style 
}: FilterBarProps) {
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <WasteTypeChip
            wasteType={item}
            isSelected={selectedFilters.includes(item._id)}
            onPress={() => onToggleFilter(item._id)}
            style={styles.chip}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    zIndex: 5,
  },
  chip: {
    marginRight: 8,
  },
});