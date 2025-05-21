import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { colors } from '@/constants';

export default function OpcoesScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Se estiver usando AsyncStorage, descomente a linha abaixo para remover o token
      // await AsyncStorage.removeItem('userToken');

      // Navega para a tela de login
      router.replace('/login');
    } catch (err) {
      console.error('Erro ao sair:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back-outline" size={24} color={colors.secondary} />
        </Pressable>
        <Text style={styles.headerTitle}>Opções</Text>
      </View>

      <View style={styles.container1}>
        {/* Centros especializados */}
        <View style={styles.cardOpcao}>
          <Pressable
            style={styles.infoBox}
            onPress={() => router.push('/centros')}
          >
            <Text style={styles.cardOpcaoText}>Centros especializados</Text>
            <Icon name="chevron-forward-outline" size={24} color={colors.secondary} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Conheça a equipe */}
        <View style={styles.cardOpcao}>
          <Pressable
            style={styles.infoBox}
            onPress={() => router.push('/equipe')}
          >
            <Text style={styles.cardOpcaoText}>Conheça a equipe do projeto</Text>
            <Icon name="chevron-forward-outline" size={24} color={colors.secondary} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Sobre o projeto */}
        <View style={styles.cardOpcao}>
          <Pressable
            style={styles.infoBox}
            onPress={() => router.push('/sobre_o_projeto')}
          >
            <Text style={styles.cardOpcaoText}>Sobre o Projeto Craniofacial - UFS</Text>
            <Icon name="chevron-forward-outline" size={24} color={colors.secondary} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Contato */}
        <View style={styles.cardOpcao}>
          <Pressable
            style={styles.infoBox}
            onPress={() => router.push('/contato')}
          >
            <Text style={styles.cardOpcaoText}>Contatos e informações</Text>
            <Icon name="chevron-forward-outline" size={24} color={colors.secondary} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Atualizar cadastro */}
        <View style={styles.cardOpcao}>
          <Pressable
            style={styles.infoBox}
            onPress={() => router.push('/atualizarcadastro')}
          >
            <Text style={styles.cardOpcaoText}>Atualizar cadastro</Text>
            <Icon name="chevron-forward-outline" size={24} color={colors.secondary} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Alterar senha */}
        <View style={styles.cardOpcao}>
          <Pressable
            style={styles.infoBox}
            onPress={() => router.push('/atualizarsenha')}
          >
            <Text style={styles.cardOpcaoText}>Alterar senha</Text>
            <Icon name="chevron-forward-outline" size={24} color={colors.secondary} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Sair */}
        <View style={styles.cardOpcao}>
          <Pressable style={styles.infoBox} onPress={handleLogout}>
            <Icon name="close-outline" size={24} color={colors.secondary} />
            <Text style={styles.cardOpcaoText}>Sair</Text>
            <Icon name="chevron-forward-outline" size={24} color={colors.secondary} style={styles.rightIcon} />
          </Pressable>
        </View>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  cardOpcao: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginVertical: 8,
    padding: 8,
    justifyContent: 'center',
  },
  cardOpcaoText: {
    color: colors.secondary,
    fontWeight: '600',
    flex: 1,
    fontSize: 14,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
