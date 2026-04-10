import { ConverterSection } from '@/components/converter-section';
import { MoreToolsSection } from '@/components/more-tools-section';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { Border, Colors, Spacing } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {

  return (
    <SketchScreen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <ConverterSection />

        <MoreToolsSection />
      </ScrollView>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing[6],
    paddingBottom: Spacing[20],
    gap: Spacing[6],
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[1],
  },
  wordmark: {
    flex: 1,
    paddingRight: Spacing[4],
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.white,
  },
  iconBtnPressed: {
    opacity: 0.88,
  },
});
