import { Spacing } from '@/constants/theme';
import { CALCULATOR_KEY_ROWS } from '@/lib/calculator/key-layout';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CalculatorKey } from './calculator-key';

type CalculatorKeypadProps = {
  onKeyPress: (key: string) => void;
};

export function CalculatorKeypad({ onKeyPress }: CalculatorKeypadProps) {
  return (
    <View style={styles.column}>
      {CALCULATOR_KEY_ROWS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((key) => (
            <CalculatorKey
              key={key}
              label={key}
              wide={key === '0'}
              onPress={() => onKeyPress(key)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    gap: Spacing[2],
  },
  row: {
    flexDirection: 'row',
    gap: Spacing[2],
  },
});
