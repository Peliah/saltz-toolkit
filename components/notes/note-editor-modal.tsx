import type { Note } from '@/types/notes';
import React from 'react';
import { Modal } from 'react-native';

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
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      {note ? (
        <NoteEditor
          note={note}
          onClose={onClose}
          onSave={onSave}
          onDelete={() => onDelete(note.id)}
        />
      ) : null}
    </Modal>
  );
}
