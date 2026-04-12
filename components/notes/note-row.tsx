import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import type { Note } from '@/types/notes';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type NoteRowProps = {
  note: Note;
  onPress: () => void;
};

export function NoteRow({ note, onPress }: NoteRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <SketchText variant="heading" size="base" numberOfLines={1} style={styles.title}>
        {note.title.trim() || 'Untitled'}
      </SketchText>
      <SketchText variant="body" size="sm" muted numberOfLines={2}>
        {note.body.trim() || 'No content'}
      </SketchText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
    gap: Spacing[1],
  },
  rowPressed: {
    opacity: 0.92,
  },
  title: {
    marginBottom: 2,
  },
});
