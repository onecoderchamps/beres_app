/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const AktifitasScreen = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  
  useEffect(() => {
    // Simulasi fetch data (ganti dengan Firestore jika perlu)
    setTimeout(() => {
      setActivities([
        {
          id: '1',
          type: 'Emas',
          title: 'Arisan Emas Bulan Mei',
          amount: 'Rp 500.000',
          date: '10 Mei 2025',
          icon: '💰',
        },
        {
          id: '2',
          type: 'Properti',
          title: 'Patungan Tanah Bogor',
          amount: 'Rp 1.200.000',
          date: '2 Mei 2025',
          icon: '🏠',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar backgroundColor="#214937" barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 20,marginVertical: 20 }}>
        <Text style={styles.header}>Aktivitas Aset Patungan</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#214937" style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 10 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#214937',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 32,
    marginRight: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#214937',
  },
  date: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F3C623',
  },
});

export default AktifitasScreen;
