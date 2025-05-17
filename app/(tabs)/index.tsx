import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  colors,
  buttons,
  buttonText 
} from '@/constants';

// 1) Definindo a interface para os itens de conteúdo
interface ConteudoItem {
  id: string;
  title: string;
}

// 2) Definindo a interface para as categorias
interface Categoria {
  id: string;
  label: string;
}

export default function HomeScreen() {
  // Exemplo de dados para “Novo conteúdo” e “Recomendado” (ConteudoItem)
  const novoConteudo: ConteudoItem[] = [
    { id: '1', title: 'Organização da Fissura Labial' },
    { id: '2', title: 'Nova cirurgia avançada' },
    { id: '3', title: 'Dicas de Alimentação' },
  ];

  const recomendado: ConteudoItem[] = [
    { id: '1', title: 'Saiba se a ortodontia ajuda' },
    { id: '2', title: 'Terapia da fala' },
    { id: '3', title: 'Histórias de sucesso' },
  ];

  // Exemplo de categorias (Categoria)
  const categorias: Categoria[] = [
    { id: 'labio', label: 'Fissura de lábio' },
    { id: 'palato', label: 'Fissura de palato' },
    { id: 'ambos', label: 'Fissura de lábio e palato' },
  ];

  // 3) Tipando a função de render de FlatList para ConteudoItem
  const renderCard: ListRenderItem<ConteudoItem> = ({ item }) => {
    return (
      <TouchableOpacity style={styles.cardItem}>
        <Icon name="play-circle-outline" size={24} color={colors.primary} />
        <Text style={styles.cardItemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Saudação */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Olá, William!</Text>
        </View>

        {/* Seção de Destaques */}
        <Text style={styles.sectionTitle}>Destaques</Text>
        <View style={styles.destaqueCard}>
          {/* Exemplo de imagem de destaque*/}
          <Image
            style={styles.destaqueImage}
            resizeMode="contain"
          />
          <View style={styles.destaqueTextContainer}>
            <Text style={styles.destaqueTitle}>
              Saiba qual fissura labio palatal é e o que significa
            </Text>
            <Text style={styles.destaqueSubtitle}>
              Descubra informações importantes para seu tratamento.
            </Text>
          </View>
        </View>

        {/* Novo conteúdo */}
        <Text style={styles.sectionTitle}>Novo conteúdo</Text>
        <FlatList<ConteudoItem>
          data={novoConteudo}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />

        {/* Recomendado para você */}
        <Text style={styles.sectionTitle}>Recomendado para você</Text>
        <FlatList<ConteudoItem>
          data={recomendado}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />

        {/* Conteúdo categorizado */}
        <Text style={styles.sectionTitle}>Conteúdo categorizado</Text>
        <View style={styles.categoriasContainer}>
          {categorias.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.fissuraButton}>
              <Text style={styles.categoriaText}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        

        {/* Acesse por tipo de conteúdo (exemplo) */}
        <Text style={styles.sectionTitle}>Acesse por tipo de conteúdo</Text>
        <View style={styles.conteudoTipoContainer}>
          <TouchableOpacity style={styles.conteudoTipoButton}>
            <Icon name="document-text-outline" size={24} color={colors.primary} />
            <Text style={styles.conteudoTipoText}>Texto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conteudoTipoButton}>
            <Icon name="videocam-outline" size={24} color={colors.primary} />
            <Text style={styles.conteudoTipoText}>Vídeo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conteudoTipoButton}>
            <Icon name="headset-outline" size={24} color={colors.primary} />
            <Text style={styles.conteudoTipoText}>Áudio</Text>
          </TouchableOpacity>
        </View>

        {/* Espaço extra para scroll */}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Exemplo de “Bottom Tab” fixo (opcional)
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="home-outline" size={24} color="#AEACFB" />
          <Text style={styles.tabButtonText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="book-outline" size={24} color="#AEACFB" />
          <Text style={styles.tabButtonText}>Conteúdo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="settings-outline" size={24} color="#AEACFB" />
          <Text style={styles.tabButtonText}>Opções</Text>
        </TouchableOpacity>
      </View>*/}
    </View>
  );
}

// -------------------------------------------------------------
// ESTILOS (sem alteração)
// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#BD9D56',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  destaqueCard: {
    backgroundColor: '#F8F8FF',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  destaqueImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  destaqueTextContainer: {
    flex: 1,
  },
  destaqueTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  destaqueSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  cardItem: {
    width: 180,
    height: 80,
    backgroundColor: '#F2F2FC',
    borderRadius: 8,
    boxShadow: '0px 2px 4px #07070791',
    marginRight: 12,
    padding: 8,
    justifyContent: 'center',
  },
  cardItemText: {
    marginTop: 4,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
  categoriaButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  categoriaText: {
    color: colors.primary,
    fontWeight: '600',
  },
  conteudoTipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  conteudoTipoButton: {
    alignItems: 'center',
    padding: 8,
  },
  conteudoTipoText: {
    marginTop: 4,
    color: colors.primary,
    fontWeight: '600',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  fissuraButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 2,
    marginVertical: 4
  },
});