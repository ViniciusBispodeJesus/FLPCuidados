import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de que está instalado

const ContentSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fissureType, setFissureType] = useState('');
  const [category, setCategory] = useState('');
  const [contentList, setContentList] = useState([]);

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `https://sua-api.com/conteudos?search=${searchQuery}&fissureType=${fissureType}&category=${category}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setContentList(data);
    } catch (error) {
      console.error('Erro ao buscar conteúdos:', error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [searchQuery, fissureType, category]);

  // Função auxiliar para mapear o tipo de fissura ao texto exibido
  const getFissureTypeText = (type) => {
    if (type === 'fissura_labial') {
      return 'Fissura Labial';
    } else if (type === 'fissura_palatina') {
      return 'Fissura Palatina';
    } else if (type === 'fissura_labiopalatina') {
      return 'Fissura Labiopalatina';
    }
    return ''; // Retorna vazio se não houver tipo selecionado
  };

  const renderContentItem = ({ item }) => (
    <View style={styles.contentItem}>
      <View style={styles.iconContainer}>
        {item.category === 'video' && <Icon name="play" size={20} color="#7E8EF1" />}
        {item.category === 'textos' && <Icon name="file-text" size={20} color="#7E8EF1" />}
        {item.category === 'podcasts' && <Icon name="microphone" size={20} color="#7E8EF1" />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.contentTitle}>{item.title}</Text>
        <Text style={styles.contentSubtitle}>{item.subtitle}</Text>
        <Text style={styles.contentDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Palavra-chave"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filtersContainer}>
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Tipo de Fissura</Text>
          {fissureType ? (
            <Text style={styles.selectedFissureType}>
              {getFissureTypeText(fissureType)}
            </Text>
          ) : null}
          <Picker
            selectedValue={fissureType}
            style={styles.picker}
            onValueChange={(itemValue) => setFissureType(itemValue)}
          >
            <Picker.Item label="Selecione o tipo de fissura" value="" />
            <Picker.Item label="Fissura Labial" value="fissura_labial" />
            <Picker.Item label="Fissura Palatina" value="fissura_palatina" />
            <Picker.Item label="Fissura Labiopalatina" value="fissura_labiopalatina" />
          </Picker>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Categoria</Text>
          <View style={styles.categoryButtons}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'video' && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategory('video')}
            >
              <Text
                style={
                  category === 'video'
                    ? styles.categoryTextSelected
                    : styles.categoryText
                }
              >
                Vídeo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'textos' && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategory('textos')}
            >
              <Text
                style={
                  category === 'textos'
                    ? styles.categoryTextSelected
                    : styles.categoryText
                }
              >
                Textos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'podcasts' && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategory('podcasts')}
            >
              <Text
                style={
                  category === 'podcasts'
                    ? styles.categoryTextSelected
                    : styles.categoryText
                }
              >
                Podcasts
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={contentList}
        renderItem={renderContentItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum conteúdo encontrado.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedFissureType: {
    fontSize: 16,
    color: '#7E8EF1',
    marginVertical: 8,
  },
  picker: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#BD9D56',
    borderWidth: 1,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#7E8EF1',
    borderColor: '#7E8EF1',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextSelected: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  contentDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ContentSearchScreen;