import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { colors } from '@/constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary, // Roxo claro para o ícone/texto ativo
        tabBarInactiveTintColor: '#999999', // Cinza para o ícone/texto inativo
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#FFFFFF', // Fundo branco
            borderTopWidth: 1, // Adiciona uma borda superior sutil
            borderTopColor: '#E8E8E8', // Cor da borda (opcional, para harmonia)
            height: 60, // Altura do tab bar
          },
          android: {
            backgroundColor: '#FFFFFF', // Fundo branco
            elevation: 0, // Remove sombra padrão no Android
            borderTopWidth: 1,
            borderTopColor: '#E8E8E8', // Cor da borda (opcional)
            height: 60, // Altura do tab bar
          },
          default: {
            backgroundColor: '#FFFFFF', // Fundo branco como padrão
            borderTopWidth: 1,
            borderTopColor: '#E8E8E8', // Cor da borda (opcional)
            height: 60, // Altura do tab bar
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12, // Tamanho do texto (ajuste conforme necessário)
          textTransform: 'none', // Mantém os títulos sem transformar em maiúsculas
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#000000', // Linha preta sob a aba ativa
          height: 2, // Altura da linha
        },
        tabBarIcon: ({ color, size }) => {
          // Tipagem para aceitar apenas os ícones disponíveis
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            home: 'home-outline',
            conteudos: 'search-outline',
            opcoes: 'grid-outline',
          };

          const iconName = icons[route.name] ?? 'ellipse-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="conteudos"
        options={{
          title: 'Conteúdos',
        }}
      />
      <Tabs.Screen
        name="opcoes"
        options={{
          title: 'Opções',
        }}
      />
    </Tabs>
  );
}
