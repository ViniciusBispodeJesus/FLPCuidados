import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { 
  colors,
  buttons,
  buttonText 
} from '@/constants';
import { Pressable } from 'react-native-gesture-handler';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Página não encontrada.</Text>
        <Pressable style={buttons.primary} onPress={() => router.push('/')}>
          <Text style={buttonText.primary}>Voltar a Página Principal</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor:colors.fundo,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title:{
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 20,
  },
  button1: {
    borderRadius: 25,
    backgroundColor: "#AEACFB",
    marginTop: 16,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText1: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
