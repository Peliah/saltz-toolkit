import { BentoToolGrid } from '@/components/kit/bento-tool-grid';
import { KitHeroCard } from '@/components/kit/kit-hero-card';
import { KitHomeShell } from '@/components/kit/kit-home-shell';
import { SketchText } from '@/components/sketch';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { liveTools } from '@/lib/tools-registry';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function KitHomeScreen() {
  const tools = liveTools();

  return (
    <KitHomeShell>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topRow}>
          <View style={styles.chip} />
          <SketchText variant="heading" size="3xl" style={styles.wordmark} numberOfLines={2}>
            Saltz Toolkit
          </SketchText>
        </View>
        <KitHeroCard />
        <BentoToolGrid tools={tools} />
      </ScrollView>
    </KitHomeShell>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[20],
    gap: Spacing[6],
    paddingTop: Spacing[2],
  },
  // topRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: Spacing[2],
  // },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[4],
  },
  chip: {
    width: 14,
    marginTop: Spacing[2],
    minHeight: 40,
    backgroundColor: Colors.accent,
    ...Radius.sm,
    transform: [{ rotate: '-2deg' }],
  },
  wordmark: {
    flex: 1,
    color: Colors.ink,
  },
});
