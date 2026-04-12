import { ConverterSection } from '@/components/converter-section';
import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ConverterScreen() {
  const router = useRouter();

  return (
    <SketchScreen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Converter" onBack={() => router.back()} />
        <ConverterSection />
      </ScrollView>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[20],
  },
});
