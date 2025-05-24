import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const banners = [
    { id: '1', color: '#ff7675', text: 'Banner 1' },
    { id: '2', color: '#74b9ff', text: 'Banner 2' },
    { id: '3', color: '#55efc4', text: 'Banner 3' },
];

const tabs = ['Deskripsi', 'Member', 'Syarat'];

const contentData = {
    Deskripsi: 'Ini adalah isi Deskripsi tentang produk atau layanan.',
    Member: 'Informasi member dan keuntungan bergabung.',
    Syarat: 'Syarat dan ketentuan berlaku pada program ini.',
};

export default function PatunganDetail() {
    const [activeTab, setActiveTab] = useState('Deskripsi');
    const [modalVisible, setModalVisible] = useState(false);
    const [jumlahLot, setJumlahLot] = useState(1);
    const [nominal, setNominal] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalSaldo = 500000;
    const iuranWajibPerLot = 100000;

    useEffect(() => {
        if (jumlahLot < 1) setJumlahLot(1);
        setNominal(jumlahLot * iuranWajibPerLot);
    }, [jumlahLot]);

    const onBayarSekarang = () => {
        if (!jumlahLot || jumlahLot < 1) {
            Alert.alert('Error', 'Jumlah lot harus minimal 1');
            return;
        }
        if (nominal > totalSaldo) {
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
                        onPress: () => {
                            Alert.alert('Topup', 'Navigasi ke halaman topup saldo.');
                        },
                    },
                ],
                { cancelable: true }
            );
            return;
        }
        Alert.alert(
            'Berhasil',
            `Anda membayar ${jumlahLot} lot = Rp${nominal.toLocaleString()}`
        );
        setJumlahLot(1);
        setModalVisible(false);
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setCurrentIndex(index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#214937" barStyle="dark-content" />

            {/* Banner Slider */}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.bannerContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {banners.map((banner) => (
                    <View
                        key={banner.id}
                        style={[styles.banner, { backgroundColor: banner.color }]}
                    >
                        <Text style={styles.bannerText}>{banner.text}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Dots Indicator */}
            <View style={styles.dotsContainer}>
                {banners.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>

            {/* Tab Bar */}
            <View style={styles.tabBarContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[
                            styles.tabItem,
                            activeTab === tab && styles.activeTabItem,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tab Content */}
            <View style={styles.contentContainer}>
                <ScrollView>
                    <Text style={styles.contentText}>{contentData[activeTab]}</Text>
                </ScrollView>
            </View>

            {/* Floating Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.floatingButtonText}>Gabung Member</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Gabung Member</Text>

                        <Text style={styles.label}>Total Saldo:</Text>
                        <Text style={styles.value}>Rp {totalSaldo.toLocaleString()}</Text>

                        <Text style={styles.label}>Harga Wajib per Lot:</Text>
                        <Text style={styles.value}>Rp {iuranWajibPerLot.toLocaleString()}</Text>

                        <Text style={styles.label}>Jumlah Lot:</Text>
                        <View style={styles.lotInputContainer}>
                            <TouchableOpacity
                                onPress={() => setJumlahLot(prev => (prev > 1 ? prev - 1 : 1))}
                                style={styles.iconButton}
                            >
                                <Ionicons name="remove-circle-outline" size={32} color="#214937" />
                            </TouchableOpacity>

                            <TextInput
                                style={styles.lotInput}
                                keyboardType="numeric"
                                value={jumlahLot.toString()}
                                onChangeText={(text) => {
                                    const num = parseInt(text);
                                    if (!isNaN(num) && num > 0) setJumlahLot(num);
                                    else setJumlahLot(1);
                                }}
                                maxLength={3}
                            />

                            <TouchableOpacity
                                onPress={() => setJumlahLot(prev => prev + 1)}
                                style={styles.iconButton}
                            >
                                <Ionicons name="add-circle-outline" size={32} color="#214937" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Total Nominal:</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: '#eee' }]}
                            value={`Rp ${nominal.toLocaleString()}`}
                            editable={false}
                        />

                        <TouchableOpacity style={styles.payButton} onPress={onBayarSekarang}>
                            <Text style={styles.payButtonText}>Bayar Sekarang</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Batal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    bannerContainer: { height: 150 },
    banner: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        position: 'absolute',
        top: height/4.2,
        left: 10,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    dot: {
        width: 15,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#dfe6e9',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#214937',
        width: 15,
        height: 10,
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#214937',
        paddingVertical: 10,
    },
    tabItem: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    activeTabItem: {
        backgroundColor: '#55efc4',
    },
    tabText: {
        color: '#dfe6e9',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#214937',
    },
    contentContainer: {
        flex: 5,
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        color: '#2d3436',
        lineHeight: 24,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#214937',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    floatingButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontWeight: '600',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginTop: 4,
        color: '#214937',
    },
    lotInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    iconButton: {
        paddingHorizontal: 10,
    },
    lotInput: {
        flex: 1,
        height: 40,
        borderColor: '#214937',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 8,
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#214937',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
    },
    payButton: {
        marginTop: 20,
        backgroundColor: '#214937',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#214937',
        fontWeight: '600',
    },
});
