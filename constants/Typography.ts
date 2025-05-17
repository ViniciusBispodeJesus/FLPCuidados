import { colors } from './Colors';
import { fonts } from './Fonts';

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.secondary,
  },
  body: {
    ...fonts.regular,
    color: colors.text,
  },
  link: {
    ...fonts.medium,
    color: colors.secondary,
  },
  buttonText: {
    ...fonts.bold,
    color: colors.white,
  },
};