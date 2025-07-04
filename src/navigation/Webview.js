import React, { useRef, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebScreen = () => {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Handle Android back button
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      } else {
        Alert.alert(
          'Keluar Aplikasi',
          'Apakah kamu yakin ingin keluar?',
          [
            {
              text: 'Batal',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Keluar',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
        return true; // prevent exit langsung
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#214937" barStyle="dark-content" />
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://beres.co.id' }}
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
  },
});

export default MyWebScreen;
