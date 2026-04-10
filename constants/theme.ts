// ─────────────────────────────────────────────
//  Saltz Toolkit — Hand-Drawn Design Tokens
// ─────────────────────────────────────────────

export const Colors = {
  background: '#fdfbf7',   // Warm paper
  foreground: '#2d2d2d',   // Soft pencil black
  muted: '#e5e0d8',        // Old paper / erased pencil
  accent: '#ff4d4d',       // Red correction marker
  accentBlue: '#2d5da1',   // Blue ballpoint pen
  border: '#2d2d2d',       // Pencil lead
  white: '#ffffff',
  postIt: '#fff9c4',       // Post-it yellow
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

// Asymmetric per-corner radii to fake wobbly hand-drawn borders.
// React Native takes [topLeft, topRight, bottomRight, bottomLeft].
export const Radius = {
  // Wobbly small — for buttons, badges, inputs
  wobbly: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 8,
  },
  // Wobbly medium — for cards, containers
  wobblyMd: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 12,
  },
  // Wobbly large — for modals, full-width panels
  wobblyLg: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 20,
  },
} as const;

// Hard offset shadows — no blur, solid offset (cut-paper aesthetic).
// iOS uses shadow* props; Android uses elevation.
export const Shadow = {
  sm: {
    // iOS
    shadowColor: Colors.foreground,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    // Android
    elevation: 3,
  },
  md: {
    shadowColor: Colors.foreground,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  lg: {
    shadowColor: Colors.foreground,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  // Pressed state — shadow nearly disappears
  pressed: {
    shadowColor: Colors.foreground,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
  },
} as const;

export const Border = {
  thin: 2,
  default: 3,
  thick: 4,
} as const;
