import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';
import { getData, postData } from '../../../api/service';
import { COLORS, COMPONENT_STYLES } from '../../../lib/constants';

const ChatScreen = ({ data }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [imageUri, setImageUri] = useState(null);
    const scrollViewRef = useRef();

    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [datas, setdatas] = useState("");

    const getDatabase = async () => {
        try {
            const response = await getData('auth/verifySessions');
            console.log(data);
            setdatas(response.data);
        } catch (error) {
            Alert.alert("Error", error.response.data.message || "Terjadi kesalahan saat memverifikasi.");
        }
    };

    useEffect(() => {
        getDatabase()
    }, []);

    const sendMessage = async () => {
        if (message.trim() !== '' || imageUri) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: 'user',
                image: imageUri,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
            setImageUri(null);

            if (imageUri) {
                const formData = new FormData();
                formData.append('file', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: `photo_${Date.now()}.jpg`,
                });

                try {
                    const response = await postData('file/upload', formData);
                    const forms = {
                        idOrder: data.id,
                        message,
                        image: response.path,
                    };
                    await postData(`Chat/sendWA`, forms);
                    getProfileUser();
                } catch (error) {
                    console.log(error);
                }
            } else {
                const forms = {
                    idOrder: data.id,
                    message,
                    image: '',
                };
                await postData(`Chat/sendWA`, forms);
                getProfileUser();
            }
        }
    };

    const getProfileUser = useCallback(async () => {
        const form = { idOrder: data.id };
        try {
            const response = await postData(`Chat/getWA`, form);
            setMessages(response.message.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getProfileUser();

        // Interval setiap 10 detik
        const intervalId = setInterval(() => {
            getProfileUser();
        }, 5000); // 10000 ms = 10 detik

        // Push notification trigger
        const unsubscribe = messaging().onMessage(async () => {
            getProfileUser();
        });

        // Cleanup interval dan listener
        return () => {
            clearInterval(intervalId);
            unsubscribe();
        };
    }, [getProfileUser]);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');

        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} ${month} ${year} ${hours}:${minutes}`;
    };

    return (
        <View style={[COMPONENT_STYLES.container, { padding: 0 }]}>

            {/* Modal Gambar */}
            {selectedImage && (
                <View style={styles.modalContainer} pointerEvents={isModalVisible ? 'auto' : 'none'}>
                    {isModalVisible && (
                        <TouchableOpacity
                            style={styles.modalOverlay}
                            onPress={() => {
                                setIsModalVisible(false);
                                setSelectedImage(null);
                            }}
                        >
                            <Image
                                source={{ uri: selectedImage }}
                                style={styles.fullscreenImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            <ScrollView
                contentContainerStyle={[COMPONENT_STYLES.scrollView, styles.chatContainer]}
                ref={scrollViewRef}
                keyboardShouldPersistTaps="handled"
            >
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageContainer,
                            msg.idUser === datas.phone ? styles.userMessage : styles.otherMessage,
                        ]}
                    >
                        {msg.image && (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedImage(msg.image);
                                        setIsModalVisible(true);
                                    }}
                                >
                                    <Image
                                        source={{ uri: msg.image }}
                                        style={{ width: 200, height: 200, borderRadius: 10 }}
                                    />
                                </TouchableOpacity>
                                <View style={COMPONENT_STYLES.spacer} />
                            </>
                        )}
                        <Text style={styles.messageName}>{msg.name}</Text>
                        <Text style={styles.messageText}>{msg.message}</Text>
                        <Text style={styles.messageTime}>{formatDateTime(msg.createdAt)}</Text>

                    </View>
                ))}
            </ScrollView>

            {imageUri && (
                <View style={styles.previewContainer}>
                    <View style={COMPONENT_STYLES.spacer} />
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    <View style={COMPONENT_STYLES.spacer} />
                    <TouchableOpacity onPress={() => setImageUri(null)} style={styles.closeButton}>
                        <Ionicons name="close-circle" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
                    <Ionicons name="camera" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TextInput
                    style={styles.textInput}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Ketik pesan..."
                    placeholderTextColor="gray"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="send" size={24} color={COLORS.background} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    messageContainer: {
        marginVertical: 8,
        padding: 10,
        borderRadius: 15,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#00000080',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.primary,
    },
    messageName: {
        fontSize: 12,
        color: COLORS.success,
    },
    messageText: {
        fontSize: 16,
        color: COLORS.background,
    },
    messageTime: {
        marginTop: 10,
        fontSize: 10,
        color: COLORS.background,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    textInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        backgroundColor: COLORS.lightGray,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    sendButton: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
    },
    previewContainer: {
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        position: 'relative',
        marginHorizontal: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 999,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    fullscreenImage: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
    },
});

export default ChatScreen;
