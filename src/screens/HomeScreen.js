import React from 'react';
import {
    View, Text, Image, StyleSheet, ScrollView,
    TouchableOpacity
} from 'react-native';
import PatunganCard from './component/PatunganCard';
import ImageSlider from './component/ImageSlider';
import MiniCard from './component/MiniCard';
import PatunganSummary from './component/PatunganSummary';
import CategorySelector from './component/Category';

const data = [
    'https://api.patunganproperti.com/api/v1/upload?folder=asset_joint_property&filename=asset_image4_1728706413490.jpeg.enc',
    'https://api.patunganproperti.com/api/v1/upload?folder=asset_joint_property&filename=asset_image3_1728706413451.jpeg.enc',
    'https://api.patunganproperti.com/api/v1/upload?folder=asset_joint_property&filename=asset_image2_1728706413397.jpeg.enc'
];

const artikelData = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        title: 'Tips Investasi Properti',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        title: 'Cara Mengelola Keuangan',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
        title: 'Strategi Patungan Efektif',
    },
];

const HomeScreen = () => {
    const handleArtikelPress = (artikel) => {
        console.log('Artikel dipilih:', artikel.title);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
            {/* 1. Banner */}
            <ImageSlider images={data} style={styles.banner} />

            <Text style={styles.sectionTitle}>Telusuri Pendanaan</Text>
            <CategorySelector onSelect={(cat) => console.log('Selected category:', cat)} />

            {/* 3. Promo */}
            <Text style={styles.sectionTitle}>Promo</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} contentContainerStyle={{ paddingHorizontal: 10 }}>
                {[1, 2, 3].map((item) => (
                    <MiniCard key={item} />
                ))}
            </ScrollView>

            {/* 4. Arisan Terkini */}
            <Text style={styles.sectionTitle}>Arisan Terkini</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} contentContainerStyle={{ paddingHorizontal: 10 }}>
                {[1, 2, 3].map((item) => (
                    <MiniCard key={item} />
                ))}
            </ScrollView>

            {/* 5. Artikel (dipindah ke atas PT) */}
            <Text style={styles.sectionTitle}>Artikel</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            >
                {artikelData.map((artikel) => (
                    <TouchableOpacity
                        key={artikel.id}
                        onPress={() => handleArtikelPress(artikel)}
                        style={styles.artikelCard}
                    >
                        <Image source={{ uri: artikel.image }} style={styles.artikelImage} />
                        <View style={styles.artikelTitleContainer}>
                            <Text style={styles.artikelTitle} numberOfLines={1}>{artikel.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* 6. Nama PT */}
            <View style={styles.footer}>
                <Text style={styles.ptText}>© 2025 PT Patungan Bersama</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FA',
    },
    banner: {
        width: '100%',
        height: 180,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 20,
    },
    horizontalScroll: {
        marginBottom: 20,
    },
    artikelCard: {
        marginRight: 12,
        borderRadius: 12,
        overflow: 'hidden',
        width: 200,
        height: 120,
    },
    artikelImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 15,
        color: '#214937',
        letterSpacing: 0.5,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    ptText: {
        color: '#888',
        fontSize: 14,
    },
    artikelTitleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
      
      artikelTitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
      },
});

export default HomeScreen;
