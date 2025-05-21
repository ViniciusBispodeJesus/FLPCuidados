import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '@/constants';

const criancasImg = require('@/assets/images/Crianças.jpg');

interface FeedItem {
  id: number;
  title: string;
  subtitle?: string;
  date?: string;
  category: 'video' | 'textos' | 'podcasts';
  author?: string;
}

const ContentSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fissureType, setFissureType] = useState('');
  const [category, setCategory] = useState('');
  const [contentList, setContentList] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Exemplo de conteúdo estático para visualização
    setContentList([
      {
        id: 1,
        title: 'Podcast: Sinais de alerta no desenvolvimento',
        subtitle: 'Por: Dra. Paula Santos',
        date: '28/05/2025',
        category: 'podcasts',
      },
      {
        id: 2,
        title: 'Vídeo: Jogos que estimulam a fala',
        subtitle: 'Por: Dr. Ricardo Almeida',
        date: '25/05/2025',
        category: 'video',
      },
    ]);
  }, [searchQuery, fissureType, category]);

  const renderContentItem = ({ item }: { item: FeedItem }) => (
    <View style={styles.card}>
      {item.category === 'podcasts' && (
        <Image source={criancasImg} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardIcon}>
          {item.category === 'video' && (
            <Icon name="video-camera" size={18} color={colors.primary} />
          )}
          {item.category === 'textos' && (
            <Icon name="file-text" size={18} color={colors.primary} />
          )}
          {item.category === 'podcasts' && (
            <Icon name="headphones" size={18} color={colors.primary} />
          )}
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          )}
          {item.date && <Text style={styles.cardDate}>{item.date}</Text>}
        </View>
      </View>
    </View>
  );

  const getCategoryIcon = (cat: string): string => {
    if (cat === 'textos') return 'file-text';
    if (cat === 'video') return 'play-circle';
    return 'headphones';
  };

  const getCategoryLabel = (cat: string): string => {
    if (cat === 'textos') return 'Texto';
    if (cat === 'video') return 'Vídeo';
    return 'Áudio';
  };

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Palavra‑chave"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filtro */}
      <Text style={styles.sectionLabel}>Tipo de Fissura</Text>
      <View style={styles.pickerPillContainer}>
        <Picker
          selectedValue={fissureType}
          onValueChange={setFissureType}
          dropdownIconColor={colors.primary}
          style={styles.pickerPill}
        >
          <Picker.Item label="Selecione tipo de fissura..." value="" color={colors.primary} />
          <Picker.Item label="Fissura Labial" value="fissura_labial" color={colors.primary} />
          <Picker.Item label="Fissura Palatina" value="fissura_palatina" color={colors.primary} />
          <Picker.Item label="Fissura Labiopalatina" value="fissura_labiopalatina" color={colors.primary} />
        </Picker>
      </View>

      {/* Categoria */}
      <Text style={[styles.sectionLabel, { marginTop: 16 }]}>Acesse por tipo de conteúdo</Text>
      <View style={styles.categoryButtons}>
        {['textos', 'video', 'podcasts'].map((cat) => {
          const iconName = getCategoryIcon(cat);
          const label = getCategoryLabel(cat);
          const isSelected = category === cat;

          return (
            <Pressable
              key={cat}
              style={[
                styles.categoryButton,
                isSelected && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Icon
                name={iconName}
                size={24}
                color={isSelected ? '#fff' : colors.primary}
              />
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextSelected,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Lista */}
      <FlatList
        data={contentList}
        renderItem={renderContentItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum conteúdo encontrado.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  pickerPillContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 24,
  },
  pickerPill: {
    height: 40,
    color: colors.primary,
    paddingHorizontal: 12,
    fontWeight: '600',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 14,
    color: colors.primary,
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  cardIcon: {
    marginRight: 12,
    justifyContent: 'flex-start',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ContentSearchScreen;
