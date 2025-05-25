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
    FlatList,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SaldoScreen = () => {
    const [loading, setLoading] = useState(true);
    const [saldo, setSaldo] = useState(1500000);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setHistory([
                { id: '1', title: 'Top Up Bulan Mei', date: '20 Mei 2025', amount: 250000, type: 'in' },
                { id: '2', title: 'Iuran Arisan', date: '15 Mei 2025', amount: 150000, type: 'out' },
                { id: '3', title: 'Top Up Bulan April', date: '1 Mei 2025', amount: 300000, type: 'in' },
            ]);
            setLoading(false);
        }, 500);
    }, []);

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItem}>
            <View>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text style={[styles.historyAmount, item.type === 'in' ? styles.income : styles.expense]}>
                {item.type === 'in' ? '+' : '-'}Rp {item.amount.toLocaleString('id-ID')}
            </Text>
        </View>
    );

    const openWhatsApp = () => {
        const phoneNumber = '6281234567890'; // ganti sesuai CS
        const message = 'Halo, saya ingin mengirim bukti topup';
        Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
    };

    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <StatusBar backgroundColor="#214937" barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {loading ? (
                    <ActivityIndicator size="large" color="#214937" style={{ marginTop: 30 }} />
                ) : (
                    <>
                        {/* Saldo Section */}
                        <View style={styles.saldoContainer}>
                            <Icon name="money" size={24} color="#214937" style={{ marginRight: 10 }} />
                            <Text style={styles.saldoText}>Rp {saldo.toLocaleString('id-ID')}</Text>
                        </View>

                        {/* Info Transfer Section */}
                        <View style={styles.infoContainer}>
                            <InfoRow label="Bank" value="BCA" />
                            <InfoRow label="Nama Rekening" value="PT. Patungan Sejahtera" />
                            <InfoRow label="Nomor Rekening" value="1234567890" />
                            <Text style={styles.noteText}>
                                *Harap transfer ke nomor rekening diatas.
                            </Text>
                            <Text style={styles.noteText}>
                                *Setiap melakukan top up, harap kirim bukti pembayaran ke WhatsApp dengan mengklik tombol CS.
                            </Text>
                        </View>

                        {/* History Section */}
                        <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
                        <FlatList
                            data={history}
                            renderItem={renderHistoryItem}
                            keyExtractor={(item) => item.id}
                            style={styles.historyList}
                        />
                    </>
                )}
            </ScrollView>

            {/* Floating Button CS */}
            <TouchableOpacity style={styles.floatingButton} onPress={openWhatsApp}>
                <Icon name="whatsapp" size={26} color="#fff" />
                <Text style={styles.floatingText}>CS</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    saldoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0f2f1',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    saldoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#214937',
    },
    infoContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    infoLabel: {
        fontSize: 16,
        color: '#555',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    noteText: {
        fontSize: 12,
        color: '#777',
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#214937',
    },
    historyList: {
        marginBottom: 50,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    historyTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    historyDate: {
        fontSize: 13,
        color: '#777',
    },
    historyAmount: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    income: {
        color: 'green',
    },
    expense: {
        color: 'red',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#25D366',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 50,
        elevation: 5,
    },
    floatingText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default SaldoScreen;
