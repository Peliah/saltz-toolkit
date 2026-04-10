import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { SketchText } from '@/components/sketch/sketch-text';
import { Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ToolsScreen() {
  const router = useRouter();

  return (
    <SketchScreen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Tools" onBack={() => router.back()} />
        <SketchText variant="body" size="base" muted style={styles.p}>
          More mini-apps will be listed here. For now, use Home for convert and the
          Notes tab for scratch space.
        </SketchText>
      </ScrollView>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing[6],
    paddingBottom: Spacing[20],
    gap: Spacing[4],
  },
  p: {
    lineHeight: 24,
  },
});
