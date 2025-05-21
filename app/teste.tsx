import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';

// Tipagem do slide
type Slide = {
  title: string;
  imgUrl: string;
};

// Dados de exemplo
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
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

export default function Teste() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const goPrev = () => {
    const prev = activeIndex === 0 ? data.length - 1 : activeIndex - 1;
    carouselRef.current?.scrollTo({ index: prev, animated: true });
  };

  const goNext = () => {
    const next = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
    carouselRef.current?.scrollTo({ index: next, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Carousel
          ref={carouselRef}
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
          data={data}
          scrollAnimationDuration={400}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={{ uri: item.imgUrl }} style={styles.image} />

              {/* Overlay com 1 ícone à esquerda */}
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

        {/* Setas */}
        <Pressable style={[styles.arrow, styles.leftArrow]} onPress={goPrev}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </Pressable>
        <Pressable style={[styles.arrow, styles.rightArrow]} onPress={goNext}>
          <Ionicons name="chevron-forward" size={28} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  carouselWrapper: {
    position: 'relative',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  slide: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
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
  titleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
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
  leftArrow: {
    left: 16,
  },
  rightArrow: {
    right: 16,
  },
});

