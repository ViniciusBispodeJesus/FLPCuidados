import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export const buttons = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: 40,
    marginBottom: 16,
    marginTop: 16,
  },
  secondary: {
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: "100%",
    height: 40,
    marginBottom: 16,
  },
  base: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export const buttonText = StyleSheet.create({
  primary: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  secondary: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
