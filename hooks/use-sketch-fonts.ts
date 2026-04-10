import { useFonts } from 'expo-font';
import { Kalam_700Bold } from '@expo-google-fonts/kalam';
import { PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';

/**
 * Load all hand-drawn theme fonts.
 * Call this once in your root _layout.tsx and block rendering
 * until `fontsLoaded` is true.
 *
 * Usage:
 *   const { fontsLoaded, fontError } = useSketchFonts();
 */
export function useSketchFonts() {
  const [fontsLoaded, fontError] = useFonts({
    Kalam_700Bold,
    PatrickHand_400Regular,
  });

  return { fontsLoaded, fontError };
}
