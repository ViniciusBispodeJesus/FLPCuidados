import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { WebView } from 'react-native-webview'; // Usado apenas em mobile
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { 
  colors,
  buttons,
  buttonText 
} from '@/constants';

type RootStackParamList = {
  SingleConteudo: {
    type: 'video' | 'audio' | 'podcast';
    title: string;
    content: string;
    mediaUrl: string;
  };
};

type SingleConteudoRouteProp = RouteProp<RootStackParamList, 'SingleConteudo'>;

interface SingleConteudoProps {
  readonly route?: SingleConteudoRouteProp;
}

export default function SingleConteudo({ route }: SingleConteudoProps) {
  const { type, title, content, mediaUrl } = route?.params || {
    type: 'video',
    title: 'Título Padrão',
    content: 'Conteúdo Padrão',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  };
  const navigation = useNavigation();

  // Desativa o cabeçalho padrão ao carregar a tela
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Remove o cabeçalho padrão do React Navigation
    });
  }, [navigation]);

  const renderMidia = () => {
    switch (type) {
      case 'video':
        return (
          <View style={styles.videoContainer}>
            {Platform.OS === 'web' ? (
              <iframe
                src={mediaUrl}
                style={styles.iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Player"
              />
            ) : (
              <WebView source={{ uri: mediaUrl }} style={styles.webview} />
            )}
          </View>
        );
      case 'audio':
        return (
          <View style={styles.audioContainer}>
            <Text style={styles.audioText}>[Player de áudio aqui]</Text>
            <Text style={styles.audioText}>URL do áudio: {mediaUrl}</Text>
          </View>
        );
      case 'podcast':
        return (
          <View style={styles.podcastContainer}>
            <Text style={styles.podcastText}>[Player de podcast aqui]</Text>
            <Text style={styles.podcastText}>URL do podcast: {mediaUrl}</Text>
          </View>
        );
      default:
        return (
          <Text style={styles.warningText}>Tipo de conteúdo não suportado.</Text>
        );
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Conteúdo - {type.toUpperCase()}</Text>
        </View>
        <View style={styles.container1}>
            {/* Título e conteúdo */}
            <Text style={styles.title}>{title}</Text>
            {renderMidia()}
            <Text style={styles.contentText}>{content}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  container1: {
    paddingHorizontal: 16,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BD9D56',
    textAlign: 'center',
  },
  // Título do conteúdo
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 16,
  },

  // Texto do conteúdo
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    color: colors.primary,
    textAlign: 'justify',
    fontWeight: '600',
  },

  // Container do vídeo
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
  iframe: {
    width: '100%',
    height: '100%',
  },

  // Container de áudio
  audioContainer: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
  },
  audioText: {
    fontSize: 14,
    color: '#555',
  },

  // Container de podcast
  podcastContainer: {
    backgroundColor: '#eef1f6',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
  },
  podcastText: {
    fontSize: 14,
    color: '#555',
  },

  // Aviso para tipo de conteúdo não suportado
  warningText: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
});