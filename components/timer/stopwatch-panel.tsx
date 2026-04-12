import { SketchText } from '@/components/sketch/sketch-text';
import { Colors, Spacing } from '@/constants/theme';
import { useStopwatch } from '@/hooks/use-stopwatch';
import { formatLapDisplay, formatStopwatchMain, pad2 } from '@/lib/timer/format';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { TimerActionButton } from './timer-action-button';

export function StopwatchPanel() {
  const { running, elapsedMs, laps, start, pause, reset, lap } = useStopwatch();

  const { mm, ss, cs } = formatStopwatchMain(elapsedMs);
  const lapsReversed = [...laps].reverse();

  return (
    <View style={styles.panel}>
      <SketchText variant="heading" size="5xl" style={styles.bigTime}>
        {pad2(mm)}:{pad2(ss)}.{pad2(cs)}
      </SketchText>
      <View style={styles.btnRow}>
        <TimerActionButton
          label={running ? 'Pause' : 'Start'}
          onPress={running ? pause : start}
          primary
        />
        <TimerActionButton
          label="Lap"
          onPress={lap}
          disabled={!running && elapsedMs === 0}
        />
        <TimerActionButton label="Reset" onPress={reset} />
      </View>
      <FlatList
        data={lapsReversed}
        keyExtractor={(item) => String(item.index)}
        style={styles.lapList}
        ListHeaderComponent={
          laps.length > 0 ? (
            <SketchText variant="heading" size="sm" style={styles.lapHeader}>
              Laps
            </SketchText>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.lapRow}>
            <SketchText variant="body" size="sm" muted>
              Lap {item.index}
            </SketchText>
            <SketchText variant="body" size="base">
              {formatLapDisplay(item.elapsedMs)}
            </SketchText>
          </View>
        )}
      />
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
  btnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    marginTop: Spacing[2],
  },
  lapList: {
    maxHeight: 220,
    marginTop: Spacing[2],
  },
  lapHeader: {
    marginBottom: Spacing[2],
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
});
