import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import { router } from 'expo-router';

export default function CentrosEspecializadosScreen() {

  // const handleOpenLink = (url: string | null) => {
  //   if (url) {
  //     Linking.openURL(url).catch((err) => console.error('Erro ao abrir link:', err));
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar e título centralizado */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back-outline" size={24} color={colors.secondary} />
        </Pressable>
        <Text style={styles.headerTitle}>Sobre o Projeto</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

       <Image
        source={require('@/assets/images/logo_projeto.png')}
        style={{ width: '100%', marginVertical: 16, alignSelf: 'center' }}
       /> 

      <Text style={styles.texto}>
            O Projeto Craniofacial é uma iniciativa que envolve ações de ensino, pesquisa e extensão, cujo objetivo principal 
            é promover conhecimento e atendimento à população com fissuras labiopalatinas e anomalias relacionadas no Estado de 
            Sergipe, especialmente nos municípios do interior.
       </Text>
​      <Text style={styles.texto}>
            Foi idealizado e criado pela Profa. Dra. Maria Natália Leite de Medeiros-Santana do Departamento de Fonoaudiologia 
            da Universidade Federal de Sergipe - Campus Prof. Antônio Garcia Filho (DFOL/UFS).
       </Text>
​      <Text style={styles.texto}>
            Atualmente, o Projeto Craniofacial conta com a colaboração das Professoras Dra. Josilene Duarte e Dra. Gerlane 
            Nascimento (DFOL/UFS), da Dra. Renata Yamashita (Hospital de Reabilitação de Anomalias Craniofaciais da Universidade
            de São Paulo - HRAC/USP) e da Profa. Dra. Flávia Ferlin (Universidade Federal de São Paulo - UNIFESP), da 
            Profa. Dra. Jamie Perry (East Carolina University) e da Fonoaudióloga Me. Aline Padovani (CONALCO Lab).
        </Text><br />
       <Text style={styles.texto}>
            As ações do Projeto incluem 20 alunos dos cursos de graduação em Fonoaudiologia e Odontologia, áreas da saúde consideradas
            parte do tripé do processo de reabilitação das fissuras labiopalatinas.
        </Text><br />
       <Text style={styles.texto}>
            Para conhecer a nossa equipe, os nossos serviços, pesquisas e ações realizadas, acesse o menu da nossa página.
       </Text><br />
       <Text style={styles.texto}>
            Sejam todos muito bem-vindos!
      </Text><br />
      </ScrollView>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  header: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  texto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'justify',
    paddingHorizontal: 8,
    lineHeight: 18,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});