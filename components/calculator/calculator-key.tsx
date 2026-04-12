import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const ACCENT_KEYS = new Set(['/', '*', '-', '+', '=']);

type CalculatorKeyProps = {
  label: string;
  wide?: boolean;
  onPress: () => void;
};

export function CalculatorKey({ label, wide, onPress }: CalculatorKeyProps) {
  const accent = ACCENT_KEYS.has(label);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.key,
        wide && styles.keyWide,
        accent && styles.keyAccent,
        pressed && styles.keyPressed,
      ]}
    >
      <SketchText variant="heading" size="xl" style={accent ? styles.keyAccentText : undefined}>
        {label}
      </SketchText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  key: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  keyWide: {
    flex: 2.15,
  },
  keyAccent: {
    backgroundColor: Colors.accentMuted,
    borderColor: Colors.accentBlue,
  },
  keyAccentText: {
    color: Colors.accentBlue,
  },
  keyPressed: {
    opacity: 0.88,
  },
});
