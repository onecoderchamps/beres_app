import React, { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Syarat = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImage = (uri) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const closeImage = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Syarat dan Ketentuan</Text>
            </ScrollView>

            {/* Modal Gambar Fullscreen */}
            <Modal visible={modalVisible} transparent={true}>
                <TouchableOpacity style={styles.modalContainer} onPress={closeImage}>
                    <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        color: '#333',
        textAlign: 'right',
        flexShrink: 1,
        marginLeft: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
        marginBottom: 5,
    },
    desc: {
        color: '#444',
        lineHeight: 20,
    },
    banner: {
        width: width - 40,
        height: height / 3,
        marginTop: 10,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: width,
        height: height,
    },
});

export default Syarat;
