import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '@/types/tasks';

export type { Task } from '@/types/tasks';

const KEY = 'saltz_tasks_v1';

/** Stored JSON may omit `dueAt` (legacy rows). */
type StoredTask = Omit<Task, 'dueAt'> & { dueAt?: string | null };

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTask).map(normalizeTask);
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
}

function isTask(x: unknown): x is StoredTask {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  const dueOk =
    o.dueAt === undefined || o.dueAt === null || typeof o.dueAt === 'string';
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.completed === 'boolean' &&
    typeof o.updatedAt === 'string' &&
    dueOk
  );
}

function normalizeTask(t: StoredTask): Task {
  return {
    ...t,
    dueAt:
      t.dueAt != null && typeof t.dueAt === 'string' && t.dueAt.length > 0
        ? t.dueAt
        : null,
  };
}
