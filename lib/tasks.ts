import type { Task } from '@/types/tasks';

export function createEmptyTask(): Task {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: '',
    completed: false,
    updatedAt: new Date().toISOString(),
  };
}

export function sortTasksForDisplay(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return a.updatedAt < b.updatedAt ? 1 : -1;
  });
}

export function removeTaskById(tasks: Task[], id: string): Task[] {
  return tasks.filter((x) => x.id !== id);
}

export function upsertTask(tasks: Task[], task: Task): Task[] {
  const merged: Task = {
    ...task,
    updatedAt: new Date().toISOString(),
  };
  const next = [...tasks.filter((x) => x.id !== task.id), merged];
  return sortTasksForDisplay(next);
}

export function toggleTaskCompleted(tasks: Task[], id: string): Task[] {
  const next = tasks.map((t) =>
    t.id === id
      ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
      : t
  );
  return sortTasksForDisplay(next);
}

export function incompleteTasksFirst(tasks: Task[]): Task[] {
  return sortTasksForDisplay(tasks).filter((t) => !t.completed);
}
