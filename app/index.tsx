import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { 
  colors,
} from '@/constants';

export default function Splash() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login"); // redireciona para a tela de login
    }, 2000);
    return () => clearTimeout(timeout); // limpa o timeout se o componente desmontar antes
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo3.png')}
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
    backgroundColor: colors.fundo,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
