// ─────────────────────────────────────────────
//  Saltz Toolkit — design tokens (kit + sketch)
// ─────────────────────────────────────────────

export const Colors = {
  canvas: '#EDE8DF',
  surface: '#FFFBF5',
  surfaceMuted: '#F3EEE6',
  ink: '#25211E',
  inkMuted: '#6B645C',
  borderSubtle: '#D1C9BC',
  accent: '#B8432C',
  accentMuted: 'rgba(184, 67, 44, 0.14)',
  accentSecondary: '#355A73',
  danger: '#B42318',

  background: '#EDE8DF',
  foreground: '#25211E',
  muted: '#8A8279',
  accentBlue: '#355A73',
  border: '#25211E',
  white: '#FFFBF5',
  postIt: '#F2E6A6',
} as const;

export const FontFamily = {
  heading: 'Kalam_700Bold',
  body: 'PatrickHand_400Regular',
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const Spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const Radius = {
  sm: { borderRadius: 10 },
  md: { borderRadius: 14 },
  lg: { borderRadius: 20 },
  wobbly: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 8,
  },
  wobblyMd: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 12,
  },
  wobblyLg: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 20,
  },
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#25211E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 0,
    elevation: 2,
  },
  md: {
    shadowColor: '#25211E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 3,
  },
  lg: {
    shadowColor: '#25211E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 0,
    elevation: 5,
  },
  pressed: {
    shadowColor: '#25211E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 0,
    elevation: 1,
  },
} as const;

export const PaperShadow = {
  hubTile: {
    shadowColor: '#25211E',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
} as const;

export const Border = {
  thin: 2,
  default: 2,
  thick: 3,
} as const;
