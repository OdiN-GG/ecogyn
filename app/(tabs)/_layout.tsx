import { Tabs } from 'expo-router';
import { MapPin, List, Info } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <MapPin size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Pontos',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <List size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Info size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  tabIconContainer: {
    marginBottom: 2,
  },
});