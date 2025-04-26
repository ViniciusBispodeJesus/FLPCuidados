import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Página não encontrada.</ThemedText>
        <Link href="/" style={styles.button1}>
          <ThemedText style={styles.buttonText1}>Voltar a página principal!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title:{
    textAlign: 'center',
    fontSize: 30,
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
