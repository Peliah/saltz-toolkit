import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { useCountdownTimer } from '@/hooks/use-countdown-timer';
import { COUNTDOWN_PRESET_MINUTES } from '@/lib/timer/constants';
import { pad2, splitMinutesSeconds } from '@/lib/timer/format';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { TimerActionButton } from './timer-action-button';

export function CountdownPanel() {
  const {
    minutesInput,
    setMinutesInput,
    running,
    displaySeconds,
    primaryLabel,
    primaryAction,
    reset,
    applyPreset,
  } = useCountdownTimer();

  const { mm, ss } = splitMinutesSeconds(displaySeconds);

  return (
    <View style={styles.panel}>
      <SketchText variant="heading" size="5xl" style={styles.bigTime}>
        {pad2(mm)}:{pad2(ss)}
      </SketchText>
      <SketchText variant="body" size="sm" muted style={styles.hint}>
        Set minutes, then start. Stays accurate while the app is open.
      </SketchText>
      <View style={styles.presetRow}>
        {COUNTDOWN_PRESET_MINUTES.map((m) => (
          <Pressable
            key={m}
            onPress={() => applyPreset(m)}
            style={({ pressed }) => [styles.preset, pressed && styles.presetPressed]}
          >
            <SketchText variant="body" size="sm">
              {m}m
            </SketchText>
          </Pressable>
        ))}
      </View>
      <SketchText variant="body" size="sm" style={styles.inputLabel}>
        Minutes
      </SketchText>
      <TextInput
        value={minutesInput}
        onChangeText={setMinutesInput}
        keyboardType="number-pad"
        editable={!running}
        style={styles.input}
      />
      <View style={styles.btnRow}>
        <TimerActionButton label={primaryLabel} onPress={primaryAction} primary />
        <TimerActionButton label="Reset" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: Spacing[3],
  },
  bigTime: {
    textAlign: 'center',
    marginVertical: Spacing[2],
  },
  hint: {
    textAlign: 'center',
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    justifyContent: 'center',
  },
  preset: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  presetPressed: {
    opacity: 0.88,
  },
  inputLabel: {
    marginTop: Spacing[2],
  },
  input: {
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    padding: Spacing[3],
    fontSize: 18,
    fontFamily: FontFamily.body,
    color: Colors.foreground,
    ...Radius.wobbly,
  },
  btnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    marginTop: Spacing[2],
  },
});
