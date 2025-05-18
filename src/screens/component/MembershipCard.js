import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MembershipCard = () => {
  return (
    <View style={styles.membershipContainer}>
      {/* Bagian Saldo */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.membershipBox}>
          <Text style={styles.membershipLabel}>Saldo</Text>
          <Text style={styles.membershipValue}>Rp. 1.786.292</Text>
        </View>
        <View style={styles.membershipBox}>
          <Text style={styles.membershipLabel}>Point</Text>
          <Text style={styles.membershipValue}>Pts 0</Text>
        </View>
      </View>

      {/* Garis Pemisah */}
      <View
        style={{
          borderBottomColor: '#BFD8B8',
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />

      {/* Tombol Aksi dengan Ikon */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="file-document-outline" size={24} color="#F3C623" />
          <Text style={styles.buttonLabel}>Koperasi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bank-transfer-out" size={24} color="#F3C623" />
          <Text style={styles.buttonLabel}>Tarik Tunai</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="swap-horizontal" size={24} color="#F3C623" />
          <Text style={styles.buttonLabel}>Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="plus-circle-outline" size={24} color="#F3C623" />
          <Text style={styles.buttonLabel}>Topup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  membershipContainer: {
    flexDirection: 'column',
    backgroundColor: '#214937',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    paddingHorizontal: 10,
  },
  membershipBox: {
    alignItems: 'center',
    flex: 1,
  },
  membershipLabel: {
    color: '#BFD8B8',
    fontSize: 16,
    fontWeight: '600',
  },
  membershipValue: {
    color: '#F3C623',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  buttonLabel: {
    color: '#BFD8B8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default MembershipCard;
