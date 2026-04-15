import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '@/types/tasks';

export type { Task } from '@/types/tasks';

const KEY = 'saltz_tasks_v1';

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTask);
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
}

function isTask(x: unknown): x is Task {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.completed === 'boolean' &&
    typeof o.updatedAt === 'string'
  );
}
