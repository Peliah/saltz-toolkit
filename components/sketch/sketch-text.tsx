import { Colors, FontFamily, FontSize } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface SketchTextProps extends TextProps {
  variant?: 'heading' | 'body';
  size?: keyof typeof FontSize;
  color?: string;
  muted?: boolean;
}

/**
 * Base text primitive for the hand-drawn design system.
 *
 * variant="heading"  → Kalam Bold (thick marker feel)
 * variant="body"     → Patrick Hand (legible handwriting)
 */
export function SketchText({
  variant = 'body',
  size = 'base',
  color,
  muted = false,
  style,
  children,
  ...props
}: SketchTextProps) {
  return (
    <Text
      style={[
        styles.base,
        variant === 'heading' ? styles.heading : styles.body,
        { fontSize: FontSize[size] },
        muted && styles.muted,
        color ? { color } : null,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: Colors.foreground,
  },
  heading: {
    fontFamily: FontFamily.heading,
  },
  body: {
    fontFamily: FontFamily.body,
  },
  muted: {
    color: Colors.muted,
  },
});
