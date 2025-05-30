import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert,
  StyleSheet, Image, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { postData, putData } from '../../api/service';

const RegisterScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [noNIK, setNoNIK] = useState('');
  const [address, setAddress] = useState('');

  const [loading, setLoading] = useState(false);


  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('08')) return '+62' + cleaned.slice(1);
    if (cleaned.startsWith('62')) return '+62' + cleaned.slice(2);
    if (cleaned.startsWith('8')) return '+62' + cleaned;
    if (cleaned.startsWith('628')) return '+' + cleaned;
    if (cleaned.startsWith('+628')) return cleaned;
    return '+62' + cleaned;
  };

  const checkPhoneExists = async (formattedPhone) => {
    const snapshot = await firestore()
      .collection('users')
      .where('phone', '==', formattedPhone)
      .limit(1)
      .get();
    return !snapshot.empty;
  };

  const handleRegister = async () => {
    if (!fullname || !address || !email || !noNIK) {
      Alert.alert('Error', 'Semua field wajib diisi.');
      return;
    }
    setLoading(true);

    try {
      const userData = {
        fullname,
        email,
        noNIK,
        address,
      };
      await postData('auth/updateProfile', userData);
      setLoading(false);
    } catch (err) {
      Alert.alert('Error', 'Terjadi kesalahan saat mendaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar backgroundColor="#214937" barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.bottomContainer}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama lengkap"
              value={fullname}
              onChangeText={setFullname}
              editable={!loading}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <Text style={styles.label}>No NIK</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan No NIK"
              keyboardType="phone-pad"
              value={noNIK}
              onChangeText={setNoNIK}
              editable={!loading}
            />

            <Text style={styles.label}>Alamat</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan No NIK"
              keyboardType="default"
              value={address}
              onChangeText={setAddress}
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonLoading]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Mendaftarkan...' : 'Daftar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: 120,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 1
  },
  button: {
    backgroundColor: '#F3C623',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1
  },
  buttonLoading: {
    backgroundColor: '#777',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
