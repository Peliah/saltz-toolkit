import { Border, Colors, FontFamily, FontSize, Radius } from '@/constants/theme';
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';
import { SketchText } from './sketch-text';

interface SketchInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
}

/**
 * Hand-drawn text input.
 *
 * - Wobbly border matching button/card aesthetic
 * - Patrick Hand font for handwritten feel
 * - Focus state shifts border to blue (accentBlue)
 */
export function SketchInput({
  label,
  containerStyle,
  style,
  ...props
}: SketchInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <SketchText variant="body" size="sm" style={styles.label}>
          {label}
        </SketchText>
      )}
      <TextInput
        style={[
          styles.input,
          Radius.wobbly,
          focused && styles.inputFocused,
          style,
        ]}
        placeholderTextColor={`${Colors.foreground}66`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    color: Colors.foreground,
    marginBottom: 2,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderStyle: 'solid',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.foreground,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: Colors.accentBlue,
    borderWidth: Border.default,
  },
});
