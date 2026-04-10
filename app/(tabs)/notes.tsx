import { SketchScreen } from '@/components/sketch/sketch-screen';
import { SketchText } from '@/components/sketch/sketch-text';
import { Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * Notes mini-app placeholder — list + editor will land here.
 */
export default function NotesTabScreen() {
  return (
    <SketchScreen>
      <View style={styles.center}>
        <SketchText variant="heading" size="2xl" style={styles.title}>
          Notes
        </SketchText>
        <SketchText variant="body" size="lg" muted style={styles.sub}>
          Saved notes will show up here next.
        </SketchText>
      </View>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: Spacing[6],
    justifyContent: 'center',
    gap: Spacing[3],
  },
  title: {
    marginBottom: Spacing[1],
  },
  sub: {
    lineHeight: 24,
    maxWidth: 320,
  },
});
