import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Pressable,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';

const criancasImg = require('@/assets/images/Crianças.jpg');

type Slide = {
  title: string;
  imgUrl: string;
};
interface FeedItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  image?: any;
  categoryIcon?: string;
}

const feedData: FeedItem[] = [
  {
    id: '1',
    title: 'Entrevista: Alimentação e desenvolvimento',
    subtitle: 'Por: Carlos Martins',
    date: '01/06/2025',
    image: criancasImg,
    categoryIcon: 'chatbubble-outline',
  },
  {
    id: '2',
    title: 'Podcast: Sinais de alerta no desenvolvimento',
    subtitle: 'Por: Dra. Paula Santos',
    date: '28/05/2025',
    image: criancasImg,
    categoryIcon: 'headset-outline',
  },
  {
    id: '3',
    title: 'Vídeo: Jogos que estimulam a fala',
    subtitle: 'Por: Dr. Ricardo Almeida',
    date: '25/05/2025',
    categoryIcon: 'videocam-outline',
  },
  {
    id: '4',
    title: 'Texto: Estimulação cognitiva em bebês',
    subtitle: 'Por: Dr. Ricardo Almeida',
    date: '25/05/2025',
    image: criancasImg,
    categoryIcon: 'document-text-outline',
  },
];

const data: Slide[] = [
  {
    title: 'Brincadeiras educativas',
    imgUrl:
      'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg',
  },
  {
    title: 'Encontro de ideias',
    imgUrl:
      'https://images.pexels.com/photos/2525714/pexels-photo-2525714.jpeg',
  },
  {
    title: 'Conexão em grupo',
    imgUrl:
      'https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg',
  },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

export default function HomeScreen() {
  // estado / refs do carousel
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>(null);

  const goPrev = () => {
    const prev = activeSlide === 0 ? data.length - 1 : activeSlide - 1;
    carouselRef.current?.scrollTo({ index: prev, animated: true });
  };
  const goNext = () => {
    const next = activeSlide === data.length - 1 ? 0 : activeSlide + 1;
    carouselRef.current?.scrollTo({ index: next, animated: true });
  };

  const renderFeedItem = ({ item }: { item: FeedItem }) => (
    <View style={styles.feedCard}>
      {item.image && <Image source={item.image} style={styles.feedImage} />}
      <View style={styles.feedBody}>
        {item.categoryIcon && (
          <Icon
            name={item.categoryIcon}
            size={18}
            color={colors.primary}
            style={{ marginRight: 8 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.feedTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.feedSubtitle}>{item.subtitle}</Text>
          )}
          {item.date && <Text style={styles.feedDate}>{item.date}</Text>}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Olá, William!</Text>
        </View>
        <Text style={styles.sectionTitle}>Destaques</Text>
        {/* Carousel */}
        <View style={styles.carouselWrapper}>
          <Carousel
            ref={carouselRef}
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            data={data}
            scrollAnimationDuration={400}
            onSnapToItem={(idx) => setActiveSlide(idx)}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image
                  source={{ uri: item.imgUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.overlay}>
                  <Ionicons
                    name="game-controller-outline"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>
              </View>
            )}
          />
          <Pressable
            style={[styles.arrow, styles.leftArrow]}
            onPress={goPrev}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </Pressable>
          <Pressable
            style={[styles.arrow, styles.rightArrow]}
            onPress={goNext}
          >
            <Ionicons name="chevron-forward" size={28} color="#fff" />
          </Pressable>
        </View>

        {/* Mais Conteúdos */}
        <Text style={styles.sectionTitle}>Mais Conteúdos</Text>
        <FlatList
          data={feedData}
          keyExtractor={(i) => i.id}
          renderItem={renderFeedItem}
          contentContainerStyle={{ paddingBottom: 32 }}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.fundo },
  header: { padding: 16, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#BD9D56' },

  carouselWrapper: {
    marginTop: 16,
    alignSelf: 'center',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    position: 'relative',
  },
  slide: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  titleText: { color: '#fff', fontSize: 14, fontWeight: '500' },

  arrow: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2 - 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: { left: 12 },
  rightArrow: { right: 12 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },

  feedCard: {
    width: CARD_WIDTH,
    alignSelf: 'center',
    backgroundColor: '#F2F2FC',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
    overflow: 'hidden',
  },
  feedImage: { width: '100%', height: 100 },
  feedBody: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  feedTitle: { fontSize: 14, fontWeight: '600', color: '#000' },
  feedSubtitle: { fontSize: 12, color: '#555' },
  feedDate: { fontSize: 10, color: '#888' },
});

