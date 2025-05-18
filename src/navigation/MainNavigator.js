import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AktifitasScreen from '../screens/AktifitasScreen';
import AkunScreen from '../screens/AkunScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // import icon

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={MainNavigator} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: styles.tabBarStyle,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#214937',
      tabBarInactiveTintColor: '#777',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Beranda') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Aktifitas') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Akun Saya') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Beranda" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Aktifitas" component={AktifitasScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Akun Saya" component={AkunScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    paddingBottom: 5,
  },
});

export default HomeStack;
