import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const WEEKDAY = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function startOfWeekSunday(d: Date): Date {
  const x = new Date(d);
  const day = x.getDay();
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}


export function WeekStrip() {
  const now = useMemo(() => new Date(), []);
  const days = useMemo(() => {
    const start = startOfWeekSunday(now);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [now]);

  return (
    <View style={styles.wrap}>
      <SketchText variant="body" size="xs" muted style={styles.caption}>
        This week
      </SketchText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {days.map((d, i) => {
          const isToday = sameLocalDay(d, now);
          return (
            <View key={i} style={[styles.cell, isToday && styles.cellToday]}>
              <SketchText variant="body" size="xs" muted style={styles.dow}>
                {WEEKDAY[d.getDay()]}
              </SketchText>
              <SketchText variant="heading" size="base" style={isToday ? styles.numToday : styles.num}>
                {d.getDate()}
              </SketchText>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: Spacing[4],
    gap: Spacing[2],
  },
  caption: {
    letterSpacing: 0.5,
  },
  row: {
    gap: Spacing[2],
    paddingVertical: Spacing[1],
  },
  cell: {
    width: 44,
    alignItems: 'center',
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[1],
    borderWidth: Border.thin,
    borderColor: Colors.borderSubtle,
    backgroundColor: Colors.surfaceMuted,
    ...Radius.sm,
  },
  cellToday: {
    borderColor: Colors.accentBlue,
    backgroundColor: 'rgba(53, 90, 115, 0.12)',
  },
  dow: {
    marginBottom: 2,
  },
  num: {
    color: Colors.ink,
  },
  numToday: {
    color: Colors.accentBlue,
  },
});
