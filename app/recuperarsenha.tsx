import React, { useState } from 'react';
import { 
  View,
  Text, 
  TextInput, 
  StyleSheet, 
  Pressable, 
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { 
  colors,
  buttons,
  buttonText 
} from '@/constants';

export default function RecuperarSenha() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSendEmail = async () => {
    setEmailError('');

    if (!email.trim()) {
      setEmailError('O campo E-mail é obrigatório');
      return;
    } else if (!email.includes('@')) {
      setEmailError('Formato de e-mail inválido');
      return;
    }

    try {
      console.log('Enviando e-mail de recuperação para:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const envioFalhou = false;
      if (envioFalhou) {
        throw new Error('Falha ao enviar e-mail de recuperação');
      }

      console.log('E-mail de recuperação enviado com sucesso!');
      setModalVisible(true);
    } catch (error) {
      console.log(error);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
        </Pressable>
        <Text style={styles.headerTitle}>Esqueci minha senha</Text>
      </View>

      <View style={styles.container1}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Verifique seu e-mail</Text>
              <Text style={styles.modalMessage}>
                Se este e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.
              </Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    router.replace('/login');
                  }, 2000);
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

        <Image
          source={require('@/assets/images/logo3.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Esqueci minha senha</Text>
        <Text style={styles.label}>Informe seu e-mail de cadastro</Text>

        <View style={[
          styles.inputContainer, 
          emailError ? { borderColor: 'red' } : null
        ]}>
          <Icon name="mail-outline" size={20} color={colors.primary2} style={styles.icon} />
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

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Pressable style={buttons.primary} onPress={handleSendEmail}>
          <Text style={buttonText.primary}>Enviar</Text>
        </Pressable>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 4,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.white,
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
    backgroundColor: colors.primary,
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
  header: {
    width: '100%',
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
