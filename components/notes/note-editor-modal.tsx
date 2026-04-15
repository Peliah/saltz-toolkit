import { Border, Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import type { Note } from '@/types/notes';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NoteEditor } from './note-editor';

type NoteEditorModalProps = {
  visible: boolean;
  note: Note | null;
  onClose: () => void;
  onSave: (note: Note) => void;
  onDelete: (noteId: string) => void;
};

export function NoteEditorModal({
  visible,
  note,
  onClose,
  onSave,
  onDelete,
}: NoteEditorModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Dismiss" />
        <View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, Spacing[4]),
              paddingTop: Spacing[4],
            },
          ]}
        >
          {note ? (
            <NoteEditor
              note={note}
              onClose={onClose}
              onSave={onSave}
              onDelete={() => onDelete(note.id)}
            />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 33, 30, 0.38)',
  },
  sheet: {
    width: '100%',
    maxHeight: '72%',
    backgroundColor: Colors.surface,
    borderTopWidth: Border.default,
    borderLeftWidth: Border.default,
    borderRightWidth: Border.default,
    borderColor: Colors.border,
    borderTopLeftRadius: Radius.wobblyMd.borderTopLeftRadius,
    borderTopRightRadius: Radius.wobblyMd.borderTopRightRadius,
    paddingHorizontal: Spacing[6],
    ...Shadow.lg,
  },
});
