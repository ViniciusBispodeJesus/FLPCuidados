import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function CentrosEspecializadosScreen() {
  const navigation = useNavigation();

    // Desativa o cabeçalho padrão ao carregar a tela
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false, // Remove o cabeçalho padrão do React Navigation
      });
    }, [navigation]);

  const handleOpenLink = (url: string | null) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Erro ao abrir link:', err));
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar e título centralizado */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contatos e Informações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Seção de Endereço */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Endereço</Text>
          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => handleOpenLink('https://maps.app.goo.gl/eg78ZVYhXPvnLhj48')}
          >
            <Icon name="location-outline" size={24} color="#7E8EF1" style={styles.leftIcon} />
            
            <Text style={styles.infoText}> Av. Marcelo DÉda, 13, São José, Lagarto SE - Brasil. 
            <br></br>CEP: 49400-000</Text>
            
            <Icon name="chevron-forward-outline" size={24} color="#7E8EF1" style={styles.rightIcon} />
          </TouchableOpacity>
        </View>

        {/* Seção de E-mail */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => handleOpenLink('mailto:craniofacial.ufs@gmail.com')}
          >
            <Icon name="mail-outline" size={24} color="#7E8EF1" style={styles.leftIcon} />
            
            <Text style={styles.infoText}>craniofacial.ufs@gmail.com</Text>
            
            <Icon name="chevron-forward-outline" size={24} color="#7E8EF1" style={styles.rightIcon} />
          </TouchableOpacity>
        </View>

        {/* Seção de Telefone */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Telefone</Text>
          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => handleOpenLink('tel:+557936322128')}
          >
            <Icon name="call-outline" size={24} color="#7E8EF1" style={styles.leftIcon} />

            <Text style={styles.infoText}>(79) 3632-2128</Text>

            <Icon name="chevron-forward-outline" size={24} color="#7E8EF1" style={styles.rightIcon} />
          </TouchableOpacity>
        </View>

        {/* Seção de Redes Sociais */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleOpenLink('https://www.youtube.com/')}
          >
            <Icon name="logo-youtube" size={40} color="#FF0000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleOpenLink('https://www.instagram.com/')}
          >
            <Icon name="logo-instagram" size={40} color="#C13584" />
          </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
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
    borderColor: '#7E8EF1',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    color: '#666666',
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
    fontWeight: '300',
    color: '#7E8EF1',
    textAlign: 'center',
  },
});
