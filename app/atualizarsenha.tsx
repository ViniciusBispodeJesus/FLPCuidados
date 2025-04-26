import React, { useState , useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function AtualizarSenhaScreen() {
  const navigation = useNavigation();

  // Desativa o cabeçalho padrão ao carregar a tela
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Remove o cabeçalho padrão do React Navigation
    });
  }, [navigation]);

  // -------------------------------------------------------------
  // ESTADOS GERAIS
  // -------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // -------------------------------------------------------------
  // ESTADOS PARA SENHAS
  // -------------------------------------------------------------
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Ocultar/exibir senhas
  const [senhaAtualOculta, setSenhaAtualOculta] = useState(true);
  const [novaSenhaOculta, setNovaSenhaOculta] = useState(true);
  const [confirmarSenhaOculta, setConfirmarSenhaOculta] = useState(true);

  // Mensagens de erro
  const [senhaAtualError, setSenhaAtualError] = useState('');
  const [novaSenhaError, setNovaSenhaError] = useState('');
  const [confirmarSenhaError, setConfirmarSenhaError] = useState('');

  // -------------------------------------------------------------
  // FUNÇÃO DE VALIDAÇÃO E ATUALIZAÇÃO
  // -------------------------------------------------------------
  const handleUpdate = async () => {
    // Limpa mensagens de erro
    setSenhaAtualError('');
    setNovaSenhaError('');
    setConfirmarSenhaError('');

    let formValido = true;

    // Valida Senha Atual
    if (!senhaAtual) {
      setSenhaAtualError('O campo Senha atual é obrigatório');
      formValido = false;
    } else if (senhaAtual.length < 6) {
      setSenhaAtualError('A senha atual deve ter no mínimo 6 caracteres');
      formValido = false;
    }

    // Valida Nova Senha
    if (!novaSenha) {
      setNovaSenhaError('O campo Nova Senha é obrigatório');
      formValido = false;
    } else if (novaSenha.length < 6) {
      setNovaSenhaError('A nova senha deve ter no mínimo 6 caracteres');
      formValido = false;
    }

    // Valida Confirmar Senha
    if (!confirmarSenha) {
      setConfirmarSenhaError('Confirme a nova senha');
      formValido = false;
    } else if (confirmarSenha !== novaSenha) {
      setConfirmarSenhaError('As senhas não coincidem');
      formValido = false;
    }

    if (!formValido) return;

    // Se todas as validações passaram, faz a simulação de envio
    setIsLoading(true);

    try {
      // Exemplo de objeto de envio
      const dadosCadastro = {
        senhaAtual,
        novaSenha,
      };
      console.log('Dados para atualizar a senha:', dadosCadastro);

      // Simulação de requisição
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Senha atualizada com sucesso!');

      // Se quiser, navegue para outra tela
      // navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // RENDERIZAÇÃO PRINCIPAL
  // -------------------------------------------------------------
  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atualizar Senha</Text>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        {/* Senha Atual */}
        <Text style={styles.label}>Senha Atual</Text>
        <View
          style={[
            styles.inputContainer,
            senhaAtualError ? { borderColor: 'red' } : null,
          ]}
        >
          <Icon
            name="lock-closed-outline"
            size={20}
            color="#AEACFB"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Digite a sua senha atual"
            secureTextEntry={senhaAtualOculta}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            placeholderTextColor="#ABABAB"
          />
          <TouchableOpacity onPress={() => setSenhaAtualOculta(!senhaAtualOculta)}>
            <Icon
              name={senhaAtualOculta ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#AEACFB"
            />
          </TouchableOpacity>
        </View>
        {senhaAtualError ? <Text style={styles.errorText}>{senhaAtualError}</Text> : null}

        {/* Nova Senha */}
        <Text style={styles.label}>Nova Senha</Text>
        <View
          style={[
            styles.inputContainer,
            novaSenhaError ? { borderColor: 'red' } : null,
          ]}
        >
          <Icon
            name="lock-closed-outline"
            size={20}
            color="#AEACFB"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Digite a nova senha"
            secureTextEntry={novaSenhaOculta}
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholderTextColor="#ABABAB"
          />
          <TouchableOpacity onPress={() => setNovaSenhaOculta(!novaSenhaOculta)}>
            <Icon
              name={novaSenhaOculta ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#AEACFB"
            />
          </TouchableOpacity>
        </View>
        {novaSenhaError ? <Text style={styles.errorText}>{novaSenhaError}</Text> : null}

        {/* Confirmar Senha */}
        <Text style={styles.label}>Confirmar Nova Senha</Text>
        <View
          style={[
            styles.inputContainer,
            confirmarSenhaError ? { borderColor: 'red' } : null,
          ]}
        >
          <Icon
            name="lock-closed-outline"
            size={20}
            color="#AEACFB"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Digite a nova senha novamente"
            secureTextEntry={confirmarSenhaOculta}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholderTextColor="#ABABAB"
          />
          <TouchableOpacity onPress={() => setConfirmarSenhaOculta(!confirmarSenhaOculta)}>
            <Icon
              name={confirmarSenhaOculta ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#AEACFB"
            />
          </TouchableOpacity>
        </View>
        {confirmarSenhaError ? <Text style={styles.errorText}>{confirmarSenhaError}</Text> : null}

        {/* Botão para atualizar */}
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Erro (para erros de servidor, etc.) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Algo deu errado</Text>
            <Text style={styles.modalMessage}>Falha ao atualizar a senha.</Text>
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
    </View>
  );
}

// -------------------------------------------------------------
// ESTILOS
// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Cabeçalho
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
  // Conteúdo principal
  content: {
    paddingHorizontal: 16,
  },
  label: {
    color: '#BD9D56',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AEACFB',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 8,
  },
  // Botão de atualizar
  button: {
    width: '100%',
    height: 40,
    borderRadius: 25,
    backgroundColor: '#AEACFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal de erro
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#AEACFB',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#fff',
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
    zIndex: 999,
  },
});
