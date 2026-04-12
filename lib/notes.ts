import type { Note } from '@/types/notes';

export function createEmptyNote(): Note {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: '',
    body: '',
    updatedAt: new Date().toISOString(),
  };
}

export function sortNotesByUpdatedDesc(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function removeNoteById(notes: Note[], id: string): Note[] {
  return notes.filter((x) => x.id !== id);
}

/** Replace or append a note and set `updatedAt`; returns sorted list. */
export function upsertNote(notes: Note[], note: Note): Note[] {
  const merged: Note = {
    ...note,
    updatedAt: new Date().toISOString(),
  };
  const next = [...notes.filter((x) => x.id !== note.id), merged];
  return sortNotesByUpdatedDesc(next);
}
