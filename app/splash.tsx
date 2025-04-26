import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); // Oculta a Splash Screen após 2s
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{ width: 200, height: 200, marginBottom: 16, alignSelf: 'center' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF", // Fundo branco igual à imagem
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A68247", // Cor dourada do texto
  },
});
