import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking // Para abrir links externos
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import { useRouter } from 'expo-router';

export default function EquipeScreen() {
  const router = useRouter();

  const equipe = [
    {
      id: '1',
      nome: 'Profa. Dra. Natália Leite de Medeiros',
      funcao: 'Coordenadora do Projeto',
      descricao: 'Doutora em Ciência com ênfase em conversão de alveolo. Professora titular da Universidade XYZ.',
      imagem: require('@/assets/images/imagemusuario.jpg'),
      redes: {
        instagram: 'https://instagram.com/',
        facebook: 'https://facebook.com/',
        linkedin: 'https://linkedin.com/in/',
      }
    },
    {
      id: '2',
      nome: 'Profa. Dra. Josilene Duarte',
      funcao: 'Coordenadora do Projeto',
      descricao: 'Possui Doutorado em Biologia Oral pela Universidade ABC.',
      imagem: require('@/assets/images/imagemusuario.jpg'),
      redes: {
        instagram: 'https://instagram.com/',
        facebook: 'https://facebook.com/',
        linkedin: 'https://linkedin.com/in/',
      }
    },
    {
      id: '3',
      nome: 'Ana Júlia Pereira de Andrade',
      funcao: 'Estudante de Fonoaudiologia',
      descricao: 'Faculdade de Fonoaudiologia - Campus Prof. Antônio Garcia Filho.',
      imagem: require('@/assets/images/imagemusuario.jpg'),
      redes: {
        instagram: 'https://instagram.com/',
        facebook: 'https://facebook.com/',
        linkedin: 'https://linkedin.com/in/',
      }
    },
    {
      id: '4',
      nome: 'Ana Luísa Pereira de Andrade',
      funcao: 'Estudante de Fonoaudiologia',
      descricao: 'Faculdade de Fonoaudiologia - Campus Prof. Antônio Garcia Filho.',
      imagem: require('@/assets/images/imagemusuario.jpg'),
      redes: {
        instagram: 'https://instagram.com/',
        facebook: 'https://facebook.com/',
        linkedin: 'https://linkedin.com/in/',
      }
    },
  ];

  // Função para abrir link externo (caso exista)
  const handleOpenLink = (url: string | null) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Erro ao abrir link:', err));
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar e título centralizado */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
        </Pressable>
        <Text style={styles.headerTitle}>Equipe do Projeto</Text>
      </View>

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {equipe.map((membro) => (
          <View key={membro.id} style={styles.memberContainer}>
            <Image
              source={membro.imagem}
              style={styles.avatar}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{membro.nome}</Text>
              <Text style={styles.funcao}>{membro.funcao}</Text>
              <Text style={styles.descricao}>{membro.descricao}</Text>
              <View style={styles.redesContainer}>
                {!!membro.redes.instagram && (
                  <Pressable
                    style={styles.iconeSocial}
                    onPress={() => handleOpenLink(membro.redes.instagram)}
                  >
                    <Icon name="logo-instagram" size={24} color="#C13584" />
                  </Pressable>
                )}
                {!!membro.redes.facebook && (
                  <Pressable
                    style={styles.iconeSocial}
                    onPress={() => handleOpenLink(membro.redes.facebook)}
                  >
                    <Icon name="logo-facebook" size={24} color="#3b5998" />
                  </Pressable>
                )}
                {!!membro.redes.linkedin && (
                  <Pressable
                    style={styles.iconeSocial}
                    onPress={() => handleOpenLink(membro.redes.linkedin)}
                  >
                    <Icon name="logo-linkedin" size={24} color="#0077b5" />
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  // Cabeçalho com centralização do título
  header: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  memberContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 2,
  },
  funcao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#BD9D56',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 12,
    color: '#666',
  },
  redesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  iconeSocial: {
    marginRight: 12,
  },
});
