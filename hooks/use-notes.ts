import { loadNotes, saveNotes } from '@/lib/notes-storage';
import {
  createEmptyNote,
  removeNoteById,
  sortNotesByUpdatedDesc,
  upsertNote,
} from '@/lib/notes';
import type { Note } from '@/types/notes';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editor, setEditor] = useState<Note | null>(null);

  useEffect(() => {
    void loadNotes().then(setNotes);
  }, []);

  const persist = useCallback(async (next: Note[]) => {
    setNotes(next);
    await saveNotes(next);
  }, []);

  const sortedNotes = useMemo(() => sortNotesByUpdatedDesc(notes), [notes]);

  const openNew = useCallback(() => {
    setEditor(createEmptyNote());
  }, []);

  const openNote = useCallback((n: Note) => {
    setEditor({ ...n });
  }, []);

  const closeEditor = useCallback(() => {
    setEditor(null);
  }, []);

  const saveNote = useCallback(
    async (note: Note) => {
      await persist(upsertNote(notes, note));
      closeEditor();
    },
    [notes, persist, closeEditor]
  );

  const deleteNote = useCallback(
    async (id: string) => {
      await persist(removeNoteById(notes, id));
      closeEditor();
    },
    [notes, persist, closeEditor]
  );

  return {
    sortedNotes,
    editor,
    openNew,
    openNote,
    closeEditor,
    saveNote,
    deleteNote,
  };
}
