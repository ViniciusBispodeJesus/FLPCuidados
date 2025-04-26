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

  // Dados dos centros especializados por região
  const centros = {
    Norte: [
      {
        estado: 'Acre',
        nome: 'Fundação Hospital Estadual do Acre',
        endereco: 'Rua Via Verde, 2224 - Distrito Industrial, Rio Branco - AC',
        telefone: '(68) 3226-4336',
        email: 'contato@fundhacre.ac.gov.br',
        website: 'www.fundhacre.ac.gov.br',
      },
      {
        estado: 'Amazonas',
        nome: 'Instituto Yaguri',
        responsavel: 'Dra. Larissa Lopes',
        endereco: 'Rua João Paulo II, s/n, bairro Nossa Senhora das Graças, Manaus - AM',
        telefone: '(94) 99161-6862',
        email: 'contato@institutoyaguri.com',
        website: 'www.institutoyaguri.com',
        redes: {
          facebook: 'https://facebook.com/InstitutoYaguri',
          instagram: 'https://instagram.com/InstitutoYaguri',
        },
      },
      {
        estado: 'Pará',
        nome: 'Hospital Regional do Sudeste do Pará',
        endereco: 'Rua Folhas, 33 - quadra 30 lote 6 - Nova Marabá, Marabá - PA',
        telefone: '(94) 99161-6862',
        email: 'contato@hospitalregionalsudeste.pa.gov.br',
        website: 'www.hospitalregionalsudeste.pa.gov.br',
      },
    ],
    // Você pode adicionar as outras regiões aqui (Nordeste, Centro-Oeste, Sudeste, Sul)
  };

  // Função para abrir link externo (e-mail, website, redes sociais)
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
        <Text style={styles.headerTitle}>Centros Especializados</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Texto introdutório */}
        <Text style={styles.texto}>
          Neste espaço, você encontrará alguns dos serviços especializados no atendimento às fissuras labiopalatinas e anomalias relacionadas existentes no país. 
          Os serviços foram separados pelas regiões do país e você terá acesso aos contatos telefônicos, de e-mail e/ou das redes sociais das Instituições. 
          Compartilhe a informação com quem você acredita que necessita!
        </Text>

        {/* Seção de botões de regiões */}
        <View style={styles.regionButtons}>
          <TouchableOpacity style={styles.regionButton}>
            <Text style={styles.regionButtonText}>Norte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.regionButton}>
            <Text style={styles.regionButtonText}>Nordeste</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.regionButton}>
            <Text style={styles.regionButtonText}>Centro-Oeste</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.regionButton}>
            <Text style={styles.regionButtonText}>Sudeste</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.regionButton}>
            <Text style={styles.regionButtonText}>Sul</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de centros da região Norte (exemplo) */}
        <Text style={styles.regionTitle}>Região Norte</Text>

        {centros.Norte.map((centro, index) => (
          <View key={index} style={styles.centroContainer}>
            {/* Estado */}
            <Text style={styles.estado}>{centro.estado}</Text>

            {/* Nome do centro */}
            <Text style={styles.nome}>{centro.nome}</Text>

            {/* Responsável (caso exista) */}
            {centro.responsavel && (
              <Text style={styles.responsavel}>Responsável: {centro.responsavel}</Text>
            )}

            {/* Endereço */}
            <Text style={styles.endereco}>{centro.endereco}</Text>

            {/* Telefone */}
            <Text style={styles.telefone}>Telefone: {centro.telefone}</Text>

            {/* E-mail (link para enviar e-mail) */}
            {centro.email && (
              <TouchableOpacity onPress={() => handleOpenLink(`mailto:${centro.email}`)}>
                <Text style={styles.email}>E-mail: {centro.email}</Text>
              </TouchableOpacity>
            )}

            {/* Website (link para abrir no navegador) */}
            {centro.website && (
              <TouchableOpacity onPress={() => handleOpenLink(centro.website)}>
                <Text style={styles.website}>Website: {centro.website}</Text>
              </TouchableOpacity>
            )}

            {/* Redes sociais (caso existam) */}
            {centro.redes && (
              <View style={styles.redesContainer}>
                {centro.redes.facebook && (
                  <TouchableOpacity
                    style={styles.iconeSocial}
                    onPress={() => handleOpenLink(centro.redes.facebook)}
                  >
                    <Icon name="logo-facebook" size={24} color="#3b5998" />
                  </TouchableOpacity>
                )}
                {centro.redes.instagram && (
                  <TouchableOpacity
                    style={styles.iconeSocial}
                    onPress={() => handleOpenLink(centro.redes.instagram)}
                  >
                    <Icon name="logo-instagram" size={24} color="#C13584" />
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View style={styles.separator} />
          </View>
        ))}
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
    // Sombra (iOS) / Elevação (Android)
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
    color: '#BD9D56',
  },
  texto: {
    fontSize: 12,
    fontWeight: '300',
    color: '#7E8EF1',
    textAlign: 'justify',
    paddingHorizontal: 8,
    marginVertical: 16,
    lineHeight: 18,
  },
  regionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  regionButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7E8EF1',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
    marginHorizontal: 5,
    width: 110,
    alignItems: 'center',
  },
  regionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7E8EF1',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  regionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#BD9D56',
    marginBottom: 16,
  },
  centroContainer: {
    marginBottom: 16,
  },
  estado: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BD9D56',
    marginBottom: 4,
  },
  nome: {
    fontSize: 12,
    fontWeight: '700',
    color: '#AEACFB',
    marginBottom: 4,
  },
  responsavel: {
    fontSize: 14,
    color: '#BD9D56',
    marginBottom: 4,
  },
  endereco: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  telefone: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    color: '#0077b5',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  website: {
    fontSize: 12,
    color: '#0077b5',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  redesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  iconeSocial: {
    marginRight: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 12,
  },
});