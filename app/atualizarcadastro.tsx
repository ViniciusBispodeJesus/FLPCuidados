import React, { useState } from 'react';

import { 
  View,
  Text, 
  TextInput, 
  StyleSheet, 
  Pressable,
  ActivityIndicator,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { 
  colors,
  buttons,
  buttonText 
} from '@/constants';

// 1) Importe o TextInputMask
import { TextInputMask } from 'react-native-masked-text';

export default function CadastroScreen() {
  const router = useRouter();

  // -------------------------------------------------------------
  // 1) ESTADOS GERAIS
  // -------------------------------------------------------------
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // -------------------------------------------------------------
  // 2) ESTADOS ETAPA 1 (Dados básicos)
  // -------------------------------------------------------------
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  // Mensagens de erro
  const [nomeError, setNomeError] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  // -------------------------------------------------------------
  // 3) ESTADOS ETAPA 2 (Seleções de fissura e opções)
  // -------------------------------------------------------------
  const [tipoFissura, setTipoFissura] = useState('');

  const fissuras = [
    { id: 'labio', label: 'Fissura de lábio' },
    { id: 'palato', label: 'Fissura de palato' },
    { id: 'ambos', label: 'Fissura de lábio e palato' },
  ];

  // Multi-select
  const [opcoesSelecionadas, setOpcoesSelecionadas] = useState<string[]>([]);

  const opcoes = [
    'Alimentação',
    'Diagnósticos',
    'Centros',
    'Causa',
    'Conceito',
    'Audição',
    'Tratamento',
    'Apoio',
    'Falas',
  ];

  // -------------------------------------------------------------
  // 4) FUNÇÕES DE VALIDAÇÃO E NAVEGAÇÃO ENTRE ETAPAS
  // -------------------------------------------------------------
  const handleNextStep = () => {
    // Reseta mensagens de erro
    setNomeError('');
    setTelefoneError('');
    setEmailError('');

    let formValido = true;

    // Validações
    if (!nome.trim()) {
      setNomeError('O campo Nome é obrigatório');
      formValido = false;
    } else if (nome.trim().length < 3) {
      setNomeError('O nome deve ter no mínimo 3 caracteres');
      formValido = false;
    }

    if (!telefone.trim()) {
      setTelefoneError('O campo Telefone é obrigatório');
      formValido = false;
    } 
    // Verifica se tem o tamanho mínimo do formato (79) 9 9999-9999 => 16 caracteres
    else if (telefone.trim().length < 16) {
      setTelefoneError('Telefone inválido');
      formValido = false;
    }

    if (!email.trim()) {
      setEmailError('O campo E-mail é obrigatório');
      formValido = false;
    } else if (!email.includes('@')) {
      setEmailError('Formato de e-mail inválido');
      formValido = false;
    }

    if (!formValido) return;

    // Se tudo ok, avança para a segunda etapa
    setCurrentStep(2);
  };

  const handleFinish = async () => {
    if (!tipoFissura) {
      alert('Selecione um tipo de fissura para continuar');
      return;
    }

    if (opcoesSelecionadas.length === 0) {
      alert('Selecione pelo menos uma opção em "O que você procura?"');
      return;
    }

    setIsLoading(true);

    try {
      const dadosCadastro = {
        nome,
        telefone,
        email,
        tipoFissura,
        opcoesSelecionadas,
      };

      console.log('Dados de cadastro prontos para envio:', dadosCadastro);

      // Simulação de requisição
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Cadastro atualizado com sucesso!');

      // Exemplo: navegar ou limpar formulário
      // router.navigate('Home');
    } catch (error) {
      console.log(error);
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 5) RENDERIZAÇÃO DE CADA ETAPA
  // -------------------------------------------------------------
  const renderStep1 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
            </Pressable>
            <Text style={styles.headerTitle}>Atualizar Cadastro</Text>
            </View>
            <View style={styles.container1}>
                {/* Nome */}
                <Text style={styles.label}>Nome</Text>
                <View style={[styles.inputContainer, nomeError ? { borderColor: 'red' } : null]}>
                <Icon name="person-outline" size={20} color={colors.primary2} style={styles.icon} />
                <TextInput
                    style={styles.inputField}
                    placeholder="Digite o seu nome"
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor="#ABABAB"
                />
                </View>
                {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

                {/* Telefone com MÁSCARA */}
                <Text style={styles.label}>Telefone</Text>
                <View style={[styles.inputContainer, telefoneError ? { borderColor: 'red' } : null]}>
                <Icon name="call-outline" size={20} color={colors.primary2} style={styles.icon} />
                
                {/* 2) Usamos TextInputMask no lugar de TextInput */}
                <TextInputMask
                    type={'custom'}
                    options={{
                    mask: '(99) 9 9999-9999', // Máscara fixa para (79) 9 9999-9999
                    }}
                    style={styles.inputField}
                    placeholder="(99) 9 9999-9999"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#ABABAB"
                />
                </View>
                {telefoneError ? <Text style={styles.errorText}>{telefoneError}</Text> : null}

                {/* E-mail */}
                <Text style={styles.label}>E-mail</Text>
                <View style={[styles.inputContainer, emailError ? { borderColor: 'red' } : null]}>
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

                {/* Botão para ir para a próxima etapa */}
                <Pressable style={buttons.primary} onPress={handleNextStep}>
                <Text style={buttonText.primary}>Continuar</Text>
                </Pressable>
            </View>    
        </View>
    );
  };

  // ========== ETAPA 2 (Tipo de fissura e opções) ==========
  const renderStep2 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Icon name="arrow-back-outline" size={24} color="#BD9D56" />
            </Pressable>
            <Text style={styles.headerTitle}>Cadastrar</Text>
            </View>
            <View style={styles.container1}>
                <Text style={styles.subTitle}>Qual o tipo de fissura você deseja descomplicar?</Text>
                <View style={styles.fissuraContainer}>
                {fissuras.map((item) => {
                    const isSelected = tipoFissura === item.id;
                    return (
                    <Pressable
                        key={item.id}
                        style={[
                        styles.fissuraButton,
                        isSelected ? { backgroundColor: colors.primary } : null
                        ]}
                        onPress={() => setTipoFissura(item.id)}
                    >
                        <Text style={[
                        styles.fissuraButtonText,
                        isSelected ? { color: '#fff' } : null
                        ]}>
                        {item.label}
                        </Text>
                    </Pressable>
                    );
                })}
                </View>

                <Text style={styles.subTitle}>O que você procura?</Text>
                <View style={styles.opcoesContainer}>
                {opcoes.map((opcao) => {
                    const isSelected = opcoesSelecionadas.includes(opcao);
                    return (
                    <Pressable
                        key={opcao}
                        style={[
                        styles.opcaoButton,
                        isSelected ? { backgroundColor: colors.primary } : null
                        ]}
                        onPress={() => toggleOpcao(opcao)}
                    >
                        <Text style={[
                        styles.opcaoButtonText,
                        isSelected ? { color: '#fff' } : null
                        ]}>
                        {opcao}
                        </Text>
                    </Pressable>
                    );
                })}
                </View>

                <Pressable style={buttons.primary} onPress={handleFinish}>
                <Text style={buttonText.primary}>Finalizar cadastro</Text>
                </Pressable>
            </View>
        </View>
    );
  };

  // -------------------------------------------------------------
  // 6) FUNÇÃO DE TOGGLE MULTI-SELEÇÃO
  // -------------------------------------------------------------
  const toggleOpcao = (opcao: string) => {
    setOpcoesSelecionadas((prev) => {
      if (prev.includes(opcao)) {
        return prev.filter((item) => item !== opcao);
      } else {
        return [...prev, opcao];
      }
    });
  };

  // -------------------------------------------------------------
  // 7) RENDERIZAÇÃO PRINCIPAL
  // -------------------------------------------------------------
  return (
    <View style={styles.container}>

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
            <Text style={styles.modalMessage}>Falha ao realizar cadastro.</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Overlay de Carregamento */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {/* Renderiza a etapa conforme currentStep */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
    </View>
  );
}

// -------------------------------------------------------------
// ESTILOS
// -------------------------------------------------------------
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
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: 'center'
  },
  subTitle: {
    color: "#BD9D56",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: 'center'
  },
  label: {
    color: "#BD9D56",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 16,
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
    marginLeft: 8,
  },
  button1: {
    width: "100%",
    height: 40,
    borderRadius: 25,
    backgroundColor: "#AEACFB",
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
  },
  fissuraContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24
  },
  fissuraButton: {
    borderColor: colors.primary,

    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 2,
    marginVertical: 4
  },
  fissuraButtonText: {
    color: colors.primary,
    fontWeight: '600'
  },
  opcoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24
  },
  opcaoButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4
  },
  opcaoButtonText: {
    color: colors.primary,
    fontWeight: '600'
  },
});
