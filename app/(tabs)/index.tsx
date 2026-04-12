import { BentoToolGrid } from '@/components/kit/bento-tool-grid';
import { KitHeroCard } from '@/components/kit/kit-hero-card';
import { KitHomeShell } from '@/components/kit/kit-home-shell';
import { Spacing } from '@/constants/theme';
import { liveTools } from '@/lib/tools-registry';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function KitHomeScreen() {
  const tools = liveTools();

  return (
    <KitHomeShell>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
});
