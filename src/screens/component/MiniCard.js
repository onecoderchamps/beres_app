import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2;

const sampleData = {
  image: 'https://api.patunganproperti.com/api/v1/upload?folder=asset_joint_property&filename=asset_image4_1728706413490.jpeg.enc',
  nama: 'Rumah Rimbo Datar',
  alamat: 'Jl. Rimbo Datar No.36 ... Sumatera Barat',
  hargaLot: 'Rp 10.000.000',
  hargaJual: 'Rp 500.000.000',
  type: 'rumah', // jenis aset
};

const iconMap = {
  rumah: {
    name: 'home-outline',
    color: '#4CAF50',
  },
  retail: {
    name: 'storefront-outline',
    color: '#2196F3',
  },
  ruko: {
    name: 'office-building-marker',
    color: '#FF9800',
  },
  aset: {
    name: 'warehouse',
    color: '#9C27B0',
  },
};

const MiniCard = ({ data = sampleData }) => {
  const iconInfo = iconMap[data.type] || iconMap['aset'];

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View>
        <Image source={{ uri: data.image }} style={styles.image} />
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons
            name={iconInfo.name}
            size={20}
            color={iconInfo.color}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.nama} numberOfLines={1}>{data.nama}</Text>
        <Text style={styles.alamat} numberOfLines={2}>{data.alamat}</Text>

        <View style={styles.row}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Harga/Lot</Text>
            <Text style={styles.value} numberOfLines={1}>{data.hargaLot}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Harga Jual</Text>
            <Text style={styles.value} numberOfLines={1}>{data.hargaJual}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: cardWidth * 0.6,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 8,
  },
  nama: {
    fontSize: cardWidth * 0.08,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  alamat: {
    fontSize: cardWidth * 0.06,
    color: '#666',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: cardWidth * 0.05,
    color: '#777',
  },
  value: {
    fontSize: cardWidth * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
});

export default MiniCard;
