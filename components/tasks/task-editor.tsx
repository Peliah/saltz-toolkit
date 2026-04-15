import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import type { Task } from '@/types/tasks';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type TaskEditorProps = {
  task: Task;
  isNew: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: () => void;
};

export function TaskEditor({ task, isNew, onClose, onSave, onDelete }: TaskEditorProps) {
  const [title, setTitle] = useState(task.title);

  return (
    <View style={styles.screen}>
      <ScreenHeader title={isNew ? 'New task' : 'Edit task'} onBack={onClose} />
      <SketchText variant="body" size="sm" style={styles.inputLabel}>
        Title
      </SketchText>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="What needs doing?"
        style={styles.input}
      />
      <View style={styles.actions}>
        <Pressable
          onPress={onDelete}
          style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
        >
          <SketchText variant="body" size="sm" style={styles.deleteLabel}>
            Delete
          </SketchText>
        </Pressable>
        <Pressable
          onPress={() => onSave({ ...task, title })}
          style={({ pressed }) => [styles.saveBtn, pressed && styles.saveBtnPressed]}
        >
          <SketchText variant="heading" size="base" style={styles.saveLabel}>
            Save
          </SketchText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
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
