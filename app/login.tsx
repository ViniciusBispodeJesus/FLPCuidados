import React, { useState, useLayoutEffect } from 'react';
import { router } from 'expo-router';
import { 
  View,
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Pressable, 
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  colors,
  buttons,
  buttonText 
} from '@/constants'; // Ajuste o caminho conforme necessário

export default function LoginScreen() {
  //const navigation = useNavigation();

  // Remove o cabeçalho padrão
  /*useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);*/

  // Estados para inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Controla a visibilidade da senha
  const [secureText, setSecureText] = useState(true);

  // Estado de carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Estados de erro
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Estado do modal de erro
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    // Reseta estados de erro
    setEmailError(false);
    setPasswordError(false);

    // Validação simples: verifica se o e-mail possui "@" e se a senha foi informada
    if (!email?.includes('@')) {
      setEmailError(true);
      return;
    }

    if (!password) {
      setPasswordError(true);
      return;
    }

    // Inicia carregamento
    setIsLoading(true);

    try {
      // Simulação de "tentando login" - substitua pela sua lógica
      console.log('Tentando login com: ', email, password);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Exemplo: se der erro no servidor ou credenciais inválidas
      const loginFalhou = true; 
      if (loginFalhou) {
        throw new Error('Login falhou');
      }

      console.log('Login bem-sucedido!');
      router.replace('/');
    } catch (error) {
      console.log(error);
      setModalVisible(true);
    } finally {
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
            <Text style={styles.modalMessage}>Falha ao realizar login.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Overlay de Carregamento*/}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <Image
        source={require('@/assets/images/logo2.png')}
        style={{ width: 200, height: 200, marginBottom: 16, alignSelf: 'center' }}
      />

      {/* Campo de e-mail com ícone */}
      <Text style={styles.label}>E-mail</Text>
      <View style={[styles.inputContainer, emailError && { borderColor: 'red' }]}>
        <Icon name="mail-outline" size={20} color={colors.primary} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Digite o seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor= {colors.inputtext}
        />
      </View>
      {emailError && (
        <Text style={styles.errorText}>Por favor, insira um e-mail válido.</Text>
      )}

      {/* Campo de senha com ícone e botão para mostrar/ocultar */}
      <Text style={styles.label}>Senha</Text>
      <View style={[styles.inputContainer, passwordError && { borderColor: 'red' }]}>
        <Icon name="lock-closed-outline" size={20} color={colors.primary} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Digite a sua senha"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor = {colors.inputtext}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon 
            name={secureText ? 'eye-off-outline' : 'eye-outline'} 
            size={20} 
            color={colors.primary} 
          />
        </TouchableOpacity>
      </View>
      {passwordError && (
        <Text style={styles.errorText}>A senha é obrigatória.</Text>
      )}

      <Pressable onPress={() => router.push('/recuperarsenha')}>
        <Text style={styles.texto}>Esqueci minha senha</Text>
      </Pressable>

      <TouchableOpacity style={buttons.primary} onPress={handleLogin} disabled={isLoading}>
        <Text style={buttonText.primary}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={buttons.secondary} onPress={() => router.push('/cadastro')}>
        <Text style={buttonText.secondary}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: colors.fundo,
  },
  label: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  texto: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 12,
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
    textAlign: 'center'
  },
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
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
});
