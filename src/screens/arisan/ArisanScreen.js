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
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import PatunganComponent from '../component/PatunganView';
import ArisanCard from '../component/ArisanView';

const { width } = Dimensions.get('window');

const ArisanScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulasi fetch data (ganti dengan Firestore jika perlu)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <StatusBar backgroundColor="#214937" barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {loading ? (
                    <ActivityIndicator size="large" color="#214937" style={{ marginTop: 30 }} />
                ) : (
                    <View style={styles.cardContainer}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <TouchableOpacity key={item} style={styles.card}>
                                <ArisanCard />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 30,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        borderRadius: 10,
        width: (width - 20) / 2,
        padding: 10,
    },
});

export default ArisanScreen;
