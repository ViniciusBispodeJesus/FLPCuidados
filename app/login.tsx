import React, { useState, useLayoutEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  // Remove o cabeçalho padrão
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
    if (!email || !email.includes('@')) {
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
      // navigation.navigate('Home');
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

      {/* Overlay de Carregamento */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#AEACFB" />
        </View>
      )}

      <Image
        source={require('@/assets/images/logo.png')}
        style={{ width: 200, height: 200, marginBottom: 16, alignSelf: 'center' }}
      />

      {/* Campo de e-mail com ícone */}
      <Text style={styles.label}>E-mail</Text>
      <View style={[styles.inputContainer, emailError && { borderColor: 'red' }]}>
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
      {emailError && (
        <Text style={styles.errorText}>Por favor, insira um e-mail válido.</Text>
      )}

      {/* Campo de senha com ícone e botão para mostrar/ocultar */}
      <Text style={styles.label}>Senha</Text>
      <View style={[styles.inputContainer, passwordError && { borderColor: 'red' }]}>
        <Icon name="lock-closed-outline" size={20} color="#AEACFB" style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Digite a sua senha"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ABABAB"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon 
            name={secureText ? 'eye-off-outline' : 'eye-outline'} 
            size={20} 
            color="#AEACFB" 
          />
        </TouchableOpacity>
      </View>
      {passwordError && (
        <Text style={styles.errorText}>A senha é obrigatória.</Text>
      )}

      {/* Navegação para a tela de recuperação de senha */}
      <Pressable onPress={() => navigation.navigate('recuperarsenha')}>
        <Text style={styles.texto}>Esqueci minha senha</Text>
      </Pressable>

      <TouchableOpacity style={styles.button1} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText1}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText2}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  label: {
    color: "#BD9D56",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  texto: {
    color: "#BD9D56",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AEACFB',
    borderRadius: 25,
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
  button1: {
    width: "100%",
    height: 40,
    borderRadius: 25,
    backgroundColor: "#AEACFB",
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    width: "100%",
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#AEACFB',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText1: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
  },
  buttonText2: {
    color: "#AEACFB",
    fontSize: 14,
    fontWeight: '600',
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
