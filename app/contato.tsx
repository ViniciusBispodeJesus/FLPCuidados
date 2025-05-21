import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import { useRouter } from 'expo-router';

export default function CentrosEspecializadosScreen() {
  const router = useRouter();

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
        <Text style={styles.headerTitle}>Contatos e Informações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Seção de Endereço */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Endereço</Text>
          <Pressable
            style={styles.infoBox}
            onPress={() => handleOpenLink('https://maps.app.goo.gl/eg78ZVYhXPvnLhj48')}
          >
            <Icon name="location-outline" size={24} color={colors.cor_pag_especifica} style={styles.leftIcon} />
            
            <Text style={styles.infoText}>Av. Marcelo DÉda, nº 13, São José, Lagarto SE - Brasil.{"\n"}CEP: 49400-000</Text>
            
            <Icon name="chevron-forward-outline" size={24} color={colors.cor_pag_especifica} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Seção de E-mail */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-mail</Text>
          <Pressable
            style={styles.infoBox}
            onPress={() => handleOpenLink('mailto:craniofacial.ufs@gmail.com')}
          >
            <Icon name="mail-outline" size={24} color={colors.cor_pag_especifica} style={styles.leftIcon} />
            
            <Text style={styles.infoText}>craniofacial.ufs@gmail.com</Text>
            
            <Icon name="chevron-forward-outline" size={24} color={colors.cor_pag_especifica} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Seção de Telefone */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Telefone</Text>
          <Pressable
            style={styles.infoBox}
            onPress={() => handleOpenLink('tel:+557936322128')}
          >
            <Icon name="call-outline" size={24} color={colors.cor_pag_especifica} style={styles.leftIcon} />

            <Text style={styles.infoText}>(79) 3632-2128</Text>

            <Icon name="chevron-forward-outline" size={24} color={colors.cor_pag_especifica} style={styles.rightIcon} />
          </Pressable>
        </View>

        {/* Seção de Redes Sociais */}
        <View style={styles.socialContainer}>
          <Pressable
            style={styles.socialButton}
            onPress={() => handleOpenLink('https://www.youtube.com/')}
          >
            <Icon name="logo-youtube" size={40} color="#FF0000" />
          </Pressable>

          <Pressable
            style={styles.socialButton}
            onPress={() => handleOpenLink('https://www.instagram.com/')}
          >
            <Icon name="logo-instagram" size={40} color="#C13584" />
          </Pressable>
        </View>

        <Text style={styles.socialText}>Clique e acompanhe nossas redes sociais</Text>
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
    marginBottom: 16,
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
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#BD9D56',
    marginBottom: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.cor_pag_especifica,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.cor_pag_especifica,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  socialButton: {
    marginHorizontal: 12,
  },
  socialText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
});
