import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2;

const sampleArisan = {
  group: 'Group A',
  targetEmas: '10 gram',
  biayaBulanan: 'Rp 1.950.000',
  sisaSlot: 3,
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
};

const formatHargaToK = (hargaString) => {
  const number = parseInt(hargaString.replace(/[^\d]/g, ''), 10);
  if (isNaN(number)) return hargaString;
  return number >= 1000 ? `${(number / 1000).toLocaleString('id-ID')} K` : number.toLocaleString('id-ID');
};

const ArisanCard = ({ data = sampleArisan }) => {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View>
        <Image source={{ uri: data.image }} style={styles.image} />

        {/* Badge Logo Emas */}
        <View style={styles.goldBadge}>
          <MaterialCommunityIcons name="gold" size={20} color="#000" />
        </View>

        {/* Badge Sisa Slot */}
        <View style={styles.slotBadge}>
          <Text style={styles.slotText}>Sisa {data.sisaSlot} Slot</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.group}>{data.group}</Text>

        <View style={styles.row}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Emas</Text>
            <Text style={styles.value}>{formatHargaToK(data.targetEmas)} Gr</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Iuran / Bulan</Text>
            <Text style={styles.value}>Rp {formatHargaToK(data.biayaBulanan)}</Text>
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
    overflow: 'hidden',
    borderColor:'#000',
    borderWidth:0.2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: cardWidth * 0.6,
  },
  goldBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 4,
    borderRadius: 12,
  },
  slotBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F3C623',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  slotText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    padding: 10,
  },
  group: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#777',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ArisanCard;
