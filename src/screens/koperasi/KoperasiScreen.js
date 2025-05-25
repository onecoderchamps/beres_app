import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const KoperasiScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [saldo, setSaldo] = useState(300000); // saldo contoh
    const [totalIuran, setTotalIuran] = useState(900000);
    const [modalVisible, setModalVisible] = useState(false);
    const [nominal, setNominal] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setHistory([
                { id: '1', amount: 150000, desc: 'Iuran Bulan Mei 2025', date: '05 Mei 2025' },
                { id: '2', amount: 150000, desc: 'Iuran Bulan April 2025', date: '05 Apr 2025' },
                { id: '3', amount: 150000, desc: 'Iuran Bulan Maret 2025', date: '05 Mar 2025' },
            ]);
            setLoading(false);
        }, 500);
    }, []);

    const handleTransfer = () => {
        const amount = parseInt(nominal);
        if (!amount || amount <= 0 || !keterangan) {
            Alert.alert('Error', 'Nominal dan keterangan harus diisi');
            return;
        }
        if (amount > saldo) {
            Alert.alert(
                'Saldo Tidak Cukup',
                'Saldo Anda tidak cukup, silahkan isi ulang.',
                [
                    {
                        text: 'Nanti Saja',
                        style: 'cancel',
                    },
                    {
                        text: 'Topup Sekarang',
                        onPress: () => navigation.navigate('Saldo'),
                    },
                ],
                { cancelable: true }
            );
            return;
        }

        setSaldo(prev => prev - amount);
        setTotalIuran(prev => prev + amount);
        setHistory(prev => [
            {
                id: Date.now().toString(),
                amount,
                desc: keterangan,
                date: new Date().toLocaleDateString('id-ID')
            },
            ...prev,
        ]);
        setModalVisible(false);
        setNominal('');
        setKeterangan('');
    };

    const handleNominalChange = (text) => {
        const raw = text.replace(/\D/g, '');
        setNominal(raw);
    };

    const formatCurrency = (numberString) => {
        if (!numberString) return '';
        return parseInt(numberString).toLocaleString('id-ID');
    };

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItem}>
            <View>
                <Text style={styles.historyDesc}>{item.desc}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text style={styles.historyAmount}>
                - Rp {item.amount.toLocaleString('id-ID')}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <StatusBar backgroundColor="#3f2e3e" barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {loading ? (
                    <ActivityIndicator size="large" color="#3f2e3e" />
                ) : (
                    <>
                        <View style={styles.centerContent}>
                            <Icon name="money-check-alt" size={32} color="#3f2e3e" />
                            <Text style={styles.totalText}>Total Iuran Dibayarkan</Text>
                            <Text style={styles.totalAmount}>Rp {totalIuran.toLocaleString('id-ID')}</Text>
                        </View>

                        <TouchableOpacity style={styles.iuranButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.buttonText}>Bayar Iuran Bulan Ini</Text>
                        </TouchableOpacity>

                        <Text style={styles.sectionTitle}>Riwayat Iuran</Text>
                        <FlatList
                            data={history}
                            renderItem={renderHistoryItem}
                            keyExtractor={item => item.id}
                            style={styles.historyList}
                        />
                    </>
                )}
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Bayar Iuran</Text>
                        <Text style={styles.saldoText}>Saldo Anda: Rp {saldo.toLocaleString('id-ID')}</Text>

                        <TextInput
                            placeholder="Nominal"
                            keyboardType="numeric"
                            value={formatCurrency(nominal)}
                            onChangeText={handleNominalChange}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Keterangan (contoh: Iuran Bulan Mei 2025)"
                            value={keterangan}
                            onChangeText={setKeterangan}
                            style={styles.input}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
                                <Text style={styles.buttonText}>Transfer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    saldoText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3f2e3e',
        marginBottom: 12,
    },
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#fdfdfd',
    },
    scrollViewContent: {
        padding: 16,
    },
    centerContent: {
        alignItems: 'center',
        marginBottom: 24,
    },
    totalText: {
        fontSize: 16,
        marginTop: 10,
        color: '#555',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3f2e3e',
        marginTop: 4,
    },
    iuranButton: {
        backgroundColor: '#3f2e3e',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3f2e3e',
        marginBottom: 10,
    },
    historyList: {
        paddingBottom: 30,
    },
    historyItem: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: '#795548',
    },
    historyDesc: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    historyDate: {
        fontSize: 13,
        color: '#777',
    },
    historyAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f44336',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#3f2e3e',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    transferButton: {
        backgroundColor: '#3f2e3e',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    cancelButton: {
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default KoperasiScreen;
