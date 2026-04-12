import { SketchText } from '@/components/sketch/sketch-text';
import { Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type CalculatorDisplayProps = {
  value: string;
};

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  return (
    <View style={styles.wrap}>
      <SketchText variant="heading" size="4xl" style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </SketchText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 72,
    justifyContent: 'flex-end',
    marginBottom: Spacing[4],
  },
  text: {
    textAlign: 'right',
  },
});
