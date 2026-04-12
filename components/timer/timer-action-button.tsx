import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type TimerActionButtonProps = {
  label: string;
  onPress: () => void;
  primary?: boolean;
  disabled?: boolean;
};

export function TimerActionButton({
  label,
  onPress,
  primary,
  disabled,
}: TimerActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        primary && styles.btnPrimary,
        pressed && styles.btnPressed,
        disabled && styles.btnDisabled,
      ]}
    >
      <SketchText variant="body" size="base" style={primary ? styles.labelPrimary : undefined}>
        {label}
      </SketchText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  btnPrimary: {
    backgroundColor: Colors.accentMuted,
    borderColor: Colors.accentBlue,
  },
  btnPressed: {
    opacity: 0.9,
  },
  btnDisabled: {
    opacity: 0.45,
  },
  labelPrimary: {
    fontFamily: FontFamily.heading,
    color: Colors.accentBlue,
  },
});
