import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function KitHeroCard() {
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.chip} />
        <SketchText variant="heading" size="3xl" style={styles.wordmark} numberOfLines={2}>
          Saltz Toolkit
        </SketchText>
      </View>
      <View style={styles.rule} />
      <SketchText variant="body" size="lg" style={styles.lede} muted>
        Units, time, scan, scribble — the boring stuff, done well.
      </SketchText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.surface,
    borderWidth: Border.default,
    borderColor: Colors.border,
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[6],
    paddingBottom: Spacing[5],
    ...Radius.wobblyMd,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[4],
  },
  chip: {
    width: 14,
    marginTop: Spacing[2],
    minHeight: 56,
    backgroundColor: Colors.accent,
    ...Radius.sm,
    transform: [{ rotate: '-2deg' }],
  },
  wordmark: {
    flex: 1,
    color: Colors.ink,
  },
  rule: {
    height: Border.thick,
    backgroundColor: Colors.ink,
    marginTop: Spacing[4],
    marginBottom: Spacing[3],
    opacity: 0.85,
    alignSelf: 'stretch',
  },
  lede: {
    maxWidth: 320,
    lineHeight: 24,
  },
});
