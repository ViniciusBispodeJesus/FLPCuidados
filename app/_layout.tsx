import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,    // padrão: sem cabeçalho
        }}
      >
        {/* Grupo principal de abas com header */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />

        {/* O restante herda headerShown: false */}
        <Stack.Screen name="home" />
        <Stack.Screen name="login" />
        <Stack.Screen name="recuperarsenha" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="atualizarcadastro" />
        <Stack.Screen name="atualizarsenha" />
        <Stack.Screen name="centros" />
        <Stack.Screen name="contato" />
        <Stack.Screen name="equipe" />
        <Stack.Screen name="single_conteudo" />
        <Stack.Screen name="sobre_o_projeto" />

        {/* Rota fallback */}
        <Stack.Screen 
          name="+not-found" 
          options={{ title: 'Página não encontrada' }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}