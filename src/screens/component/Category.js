import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  { key: 'emas', label: 'Emas', icon: 'currency-usd' },
  { key: 'rumah', label: 'Rumah', icon: 'home' },
  { key: 'retail', label: 'Retail', icon: 'store' },
  { key: 'ruko', label: 'Ruko', icon: 'market' },
  { key: 'bengkel', label: 'Bengkel', icon: 'car-wrench' },
  { key: 'rumah_ibadah', label: 'Rumah Ibadah', icon: 'mosque' },
];

const CategorySelector = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handlePress = (category) => {
    setSelected(category.key);
    if (onSelect) onSelect(category.key);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.button, selected === cat.key && styles.selectedButton]}
            onPress={() => handlePress(cat)}
          >
            <MaterialCommunityIcons
              name={cat.icon}
              size={28}
              color={selected === cat.key ? '#fff' : '#555'}
              style={styles.icon}
            />
            <Text style={[styles.text, selected === cat.key && styles.selectedText]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 5,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 80,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#214937',
  },
  icon: {
    marginBottom: 4,
  },
  text: {
    color: '#555',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
});

export default CategorySelector;
