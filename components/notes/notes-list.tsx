import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import type { Note } from '@/types/notes';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { NoteRow } from './note-row';

type NotesListProps = {
  notes: Note[];
  onNew: () => void;
  onSelectNote: (note: Note) => void;
};

export function NotesList({ notes, onNew, onSelectNote }: NotesListProps) {
  return (
    <View style={styles.wrap}>
      <SketchText variant="body" size="sm" muted style={styles.intro}>
        Saved on this device only.
      </SketchText>

      <Pressable onPress={onNew} style={({ pressed }) => [styles.newBtn, pressed && styles.newBtnPressed]}>
        <SketchText variant="heading" size="base" style={styles.newBtnLabel}>
          New note
        </SketchText>
      </Pressable>

      <FlatList
        style={styles.flatList}
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <SketchText variant="body" size="base" muted style={styles.empty}>
            No notes yet. Tap “New note” to start.
          </SketchText>
        }
        renderItem={({ item }) => (
          <NoteRow note={item} onPress={() => onSelectNote(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  intro: {
    marginBottom: Spacing[2],
  },
  newBtn: {
    marginBottom: Spacing[4],
    paddingVertical: Spacing[3],
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  newBtnPressed: {
    opacity: 0.92,
  },
  newBtnLabel: {
    color: Colors.accentBlue,
  },
  list: {
    paddingBottom: Spacing[10],
    gap: Spacing[2],
  },
  empty: {
    marginTop: Spacing[6],
    textAlign: 'center',
  },
});
