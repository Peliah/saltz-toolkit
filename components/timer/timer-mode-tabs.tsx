import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import type { TimerMode } from '@/types/timer';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type TimerModeTabsProps = {
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
};

export function TimerModeTabs({ mode, onModeChange }: TimerModeTabsProps) {
  return (
    <View style={styles.row}>
      <ModeTab
        label="Countdown"
        active={mode === 'countdown'}
        onPress={() => onModeChange('countdown')}
      />
      <ModeTab
        label="Stopwatch"
        active={mode === 'stopwatch'}
        onPress={() => onModeChange('stopwatch')}
      />
    </View>
  );
}

function ModeTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tab,
        active && styles.tabActive,
        pressed && styles.tabPressed,
      ]}
    >
      <SketchText variant="body" size="sm" style={active ? styles.labelActive : undefined}>
        {label}
      </SketchText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing[2],
    marginBottom: Spacing[4],
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing[3],
    alignItems: 'center',
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  tabActive: {
    borderColor: Colors.accentBlue,
    backgroundColor: Colors.accentMuted,
  },
  tabPressed: {
    opacity: 0.9,
  },
  labelActive: {
    fontFamily: FontFamily.heading,
    color: Colors.accentBlue,
  },
});
