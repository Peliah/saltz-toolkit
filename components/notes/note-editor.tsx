import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import type { Note } from '@/types/notes';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type NoteEditorProps = {
  note: Note;
  onClose: () => void;
  onSave: (note: Note) => void;
  onDelete: () => void;
};

export function NoteEditor({ note, onClose, onSave, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  return (
    <SketchScreen>
      <View style={styles.screen}>
        <ScreenHeader title="Edit note" onBack={onClose} />
        <SketchText variant="body" size="sm" style={styles.inputLabel}>
          Title
        </SketchText>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          style={styles.input}
        />
        <SketchText variant="body" size="sm" style={styles.inputLabel}>
          Body
        </SketchText>
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Write here…"
          multiline
          textAlignVertical="top"
          style={[styles.input, styles.bodyInput]}
        />
        <View style={styles.actions}>
          <Pressable onPress={onDelete} style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}>
            <SketchText variant="body" size="sm" style={styles.deleteLabel}>
              Delete
            </SketchText>
          </Pressable>
          <Pressable
            onPress={() => onSave({ ...note, title, body })}
            style={({ pressed }) => [styles.saveBtn, pressed && styles.saveBtnPressed]}
          >
            <SketchText variant="heading" size="base" style={styles.saveLabel}>
              Save
            </SketchText>
          </Pressable>
        </View>
      </View>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[10],
  },
  inputLabel: {
    marginTop: Spacing[2],
  },
  input: {
    marginTop: Spacing[1],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    padding: Spacing[3],
    fontSize: 16,
    fontFamily: FontFamily.body,
    color: Colors.foreground,
    ...Radius.wobbly,
  },
  bodyInput: {
    minHeight: 200,
    marginTop: Spacing[1],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[6],
    gap: Spacing[3],
  },
  deleteBtn: {
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
  },
  deleteBtnPressed: {
    opacity: 0.85,
  },
  deleteLabel: {
    color: Colors.danger,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: Spacing[3],
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  saveBtnPressed: {
    opacity: 0.92,
  },
  saveLabel: {
    color: Colors.accentBlue,
  },
});
