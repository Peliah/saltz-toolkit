import { NoteEditorModal } from '@/components/notes/note-editor-modal';
import { NotesList } from '@/components/notes/notes-list';
import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { Spacing } from '@/constants/theme';
import { useNotes } from '@/hooks/use-notes';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function NotesScreen() {
  const router = useRouter();
  const {
    sortedNotes,
    editor,
    openNew,
    openNote,
    closeEditor,
    saveNote,
    deleteNote,
  } = useNotes();

  return (
    <SketchScreen>
      <View style={styles.screen}>
        <ScreenHeader title="Notes" onBack={() => router.back()} />
        <NotesList notes={sortedNotes} onNew={openNew} onSelectNote={openNote} />
      </View>

      <NoteEditorModal
        visible={editor !== null}
        note={editor}
        onClose={closeEditor}
        onSave={(n) => void saveNote(n)}
        onDelete={(id) => void deleteNote(id)}
      />
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[10],
  },
});
