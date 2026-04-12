import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Note } from '@/types/notes';

export type { Note } from '@/types/notes';

const KEY = 'saltz_notes_v1';

export async function loadNotes(): Promise<Note[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isNote);
  } catch {
    return [];
  }
}

export async function saveNotes(notes: Note[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(notes));
}

function isNote(x: unknown): x is Note {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.body === 'string' &&
    typeof o.updatedAt === 'string'
  );
}
