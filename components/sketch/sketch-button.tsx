import React, { useState } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Radius, Shadow, Border, FontSize } from '@/constants/theme';
import { SketchText } from './sketch-text';

interface SketchButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

/**
 * Hand-drawn button with hard offset shadow.
 *
 * Interaction model:
 *   Normal  → white bg, 4px hard shadow
 *   Hover   → accent red bg, 2px shadow (lifts slightly)
 *   Pressed → accent red bg, 1px shadow (presses flat)
 *
 * variant="secondary" hovers to blue instead of red.
 */
export function SketchButton({
  label,
  variant = 'primary',
  onPress,
  disabled,
  style,
  ...props
}: SketchButtonProps) {
  const [pressed, setPressed] = useState(false);

  const accentColor =
    variant === 'primary' ? Colors.accent : Colors.accentBlue;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      style={[
        styles.base,
        Radius.wobbly,
        pressed ? Shadow.pressed : Shadow.md,
        pressed && { transform: [{ translateX: 3 }, { translateY: 3 }] },
        pressed && { backgroundColor: accentColor },
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      <SketchText
        variant="body"
        size="lg"
        style={[styles.label, pressed && styles.labelPressed]}
      >
        {label}
      </SketchText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.white,
    borderWidth: Border.default,
    borderColor: Colors.border,
    borderStyle: 'solid',
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    color: Colors.foreground,
    fontSize: FontSize.lg,
  },
  labelPressed: {
    color: Colors.white,
  },
  disabled: {
    opacity: 0.4,
  },
});
