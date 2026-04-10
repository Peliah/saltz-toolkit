import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

interface SketchScreenProps extends ViewProps {
  children: React.ReactNode;
  /**
   * Set to false if you're handling safe area yourself (e.g. inside a
   * tab navigator that already insets content).
   */
  safe?: boolean;
}

/**
 * Root screen wrapper for the hand-drawn theme.
 *
 * Applies the warm paper background. The dot-grid texture is rendered
 * using a repeating View grid — React Native has no CSS background-image,
 * so we fake the notebook-paper dot pattern with an absolutely positioned
 * grid of tiny circles.
 */
export function SketchScreen({
  children,
  safe = true,
  style,
  ...props
}: SketchScreenProps) {
  const Wrapper = safe ? SafeAreaView : View;

  return (
    <Wrapper style={[styles.root, style]} {...props}>
      {/* Dot-grid paper texture */}
      <DotGrid />
      <View style={styles.content}>{children}</View>
    </Wrapper>
  );
}

// ─── Dot Grid ────────────────────────────────────────────────────────────────
// Renders a 20×40 grid of tiny muted dots to simulate notebook paper grain.
// Kept intentionally subtle — just enough texture to feel physical.

const DOT_SPACING = 24;
const DOT_SIZE = 2;
const COLS = 20;
const ROWS = 40;

function DotGrid() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: ROWS }).map((_, row) => (
        <View key={row} style={styles.dotRow}>
          {Array.from({ length: COLS }).map((_, col) => (
            <View
              key={col}
              style={[
                styles.dot,
                {
                  marginRight: DOT_SPACING - DOT_SIZE,
                  marginBottom: DOT_SPACING - DOT_SIZE,
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  dotRow: {
    flexDirection: 'row',
    paddingLeft: DOT_SPACING / 2,
    paddingTop: DOT_SPACING / 2,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.muted,
  },
});
