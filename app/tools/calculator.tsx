import { CalculatorDisplay } from '@/components/calculator/calculator-display';
import { CalculatorKeypad } from '@/components/calculator/calculator-keypad';
import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { Spacing } from '@/constants/theme';
import { useCalculator } from '@/hooks/use-calculator';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function CalculatorScreen() {
  const router = useRouter();
  const { display, onKey } = useCalculator();

  return (
    <SketchScreen>
      <View style={styles.screen}>
        <ScreenHeader title="Calculator" onBack={() => router.back()} />
        <CalculatorDisplay value={display} />
        <View style={styles.spacer} />
        <View style={styles.keypadDock}>
          <CalculatorKeypad onKeyPress={onKey} />
        </View>
      </View>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[4],
  },
  spacer: {
    flex: 1,
    minHeight: Spacing[4],
  },
  keypadDock: {
    alignSelf: 'stretch',
    paddingBottom: Spacing[10],
  },
});
