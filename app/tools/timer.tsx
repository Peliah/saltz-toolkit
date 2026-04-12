import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { CountdownPanel } from '@/components/timer/countdown-panel';
import { StopwatchPanel } from '@/components/timer/stopwatch-panel';
import { TimerModeTabs } from '@/components/timer/timer-mode-tabs';
import { Spacing } from '@/constants/theme';
import type { TimerMode } from '@/types/timer';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function TimerScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<TimerMode>('countdown');

  return (
    <SketchScreen>
      <View style={styles.screen}>
        <ScreenHeader title="Timer" onBack={() => router.back()} />
        <TimerModeTabs mode={mode} onModeChange={setMode} />
        {mode === 'countdown' ? <CountdownPanel /> : <StopwatchPanel />}
      </View>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[10],
  },
});
