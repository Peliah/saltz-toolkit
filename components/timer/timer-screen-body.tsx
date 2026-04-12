import { ScreenHeader } from '@/components/layout/screen-header';
import { Spacing } from '@/constants/theme';
import type { TimerMode } from '@/types/timer';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CountdownPanel } from './countdown-panel';
import { StopwatchPanel } from './stopwatch-panel';
import { TimerModeTabs } from './timer-mode-tabs';

type TimerScreenBodyProps = {
  onBack: () => void;
};

export function TimerScreenBody({ onBack }: TimerScreenBodyProps) {
  const [mode, setMode] = useState<TimerMode>('countdown');

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Timer" onBack={onBack} />
      <TimerModeTabs mode={mode} onModeChange={setMode} />
      {mode === 'countdown' ? <CountdownPanel /> : <StopwatchPanel />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[10],
  },
});
