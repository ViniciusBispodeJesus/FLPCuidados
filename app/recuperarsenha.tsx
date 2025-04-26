import React, { useState, useLayoutEffect } from 'react';
import { 
  View,
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function RecuperarSenha() {
  const navigation = useNavigation();

  // Desativa o cabeçalho padrão ao carregar a tela
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Remove o cabeçalho padrão do React Navigation
    });
  }, [navigation]);

  // Estado para o e-mail
  const [email, setEmail] = useState('');

  // Estado de carregamento e de modal de erro
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Estado de erro de e-mail (caso o usuário digite algo inválido)
  const [emailError, setEmailError] = useState('');

  // Função que simula o envio do e-mail de recuperação
  const handleSendEmail = async () => {
    // Reseta o estado de erro
    setEmailError('');

    // Validação simples de e-mail
    if (!email.trim()) {
      setEmailError('O campo E-mail é obrigatório');
      return;
    } else if (!email.includes('@')) {
      setEmailError('Formato de e-mail inválido');
      return;
    }

    // Inicia o carregamento
    setIsLoading(true);

    try {
      // Simulação de "tentando enviar e-mail" - substitua pela sua lógica real
      console.log('Enviando e-mail de recuperação para:', email);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Exemplo: se deu algum erro no servidor
      const envioFalhou = false; // Ajuste para true para simular erro
      if (envioFalhou) {
        throw new Error('Falha ao enviar e-mail de recuperação');
      }

      // Se chegou aqui, deu certo
      console.log('E-mail de recuperação enviado com sucesso!');
      // Exemplo: navegue para alguma tela de confirmação, ou feche esta
      // navigation.goBack();
    } catch (error) {
      console.log(error);
      // Abre o modal de erro
      setModalVisible(true);
    } finally {
      // Finaliza carregamento
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Modal de Erro */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Algo deu errado</Text>
            <Text style={styles.modalMessage}>Falha ao enviar e-mail de recuperação.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Overlay de Carregamento */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#AEACFB" />
        </View>
      )}

      {/* Logo (caso deseje) */}
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />

      {/* Título da tela */}
      <Text style={styles.title}>Esqueci minha senha</Text>

      {/* Subtítulo / instrução */}
      <Text style={styles.label}>Informe seu e-mail de cadastro</Text>

      {/* Campo de e-mail com ícone */}
      <View style={[
        styles.inputContainer, 
        emailError ? { borderColor: 'red' } : null
      ]}>
        <Icon name="mail-outline" size={20} color="#AEACFB" style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Digite o seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ABABAB"
        />
      </View>

      {/* Exibe mensagem de erro se existir */}
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Botão de Enviar */}
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BD9D56',
    textAlign: 'center',
    marginBottom: 24
  },
  label: {
    color: "#BD9D56",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AEACFB',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 4,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 340 // Para não ficar muito largo em telas grandes
  },
  icon: {
    marginRight: 8
  },
  inputField: {
    flex: 1,
    height: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    alignSelf: 'center'
  },
  button: {
    width: "100%",
    maxWidth: 340,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#AEACFB",
    marginTop: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
  },
  // Overlay de carregamento
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  // Modal de erro
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: '#AEACFB',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
});
