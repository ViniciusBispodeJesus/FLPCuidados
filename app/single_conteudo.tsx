import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';

export default function SingleConteudo() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    type?: string;
    title?: string;
    content?: string;
    mediaUrl?: string;
  }>();

  const type = (params.type as 'video' | 'audio' | 'podcast') ?? 'video';
  const title = params.title ?? 'Título Padrão';
  const content = params.content ?? 'Conteúdo Padrão';
  const mediaUrl = params.mediaUrl ?? 'https://www.youtube.com/embed/dQw4w9WgXcQ';

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
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
        </Pressable>
        <Text style={styles.headerTitle}>Conteúdo - {type.toUpperCase()}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container1}>
        <Text style={styles.title}>{title}</Text>
        {renderMidia()}
        <Text style={styles.contentText}>{content}</Text>
      </ScrollView>
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
    paddingBottom: 24,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    color: colors.primary,
    textAlign: 'justify',
    fontWeight: '600',
  },
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
  warningText: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
});