import type { Task, TaskBucket } from '@/types/tasks';

export function createEmptyTask(): Task {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: '',
    completed: false,
    dueAt: null,
    updatedAt: new Date().toISOString(),
  };
}

function startOfLocalDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfLocalDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

/** Classify a task for sectioning (uses local calendar). */
export function taskBucket(task: Task, now: Date = new Date()): TaskBucket {
  if (task.completed) return 'done';
  if (task.dueAt == null || task.dueAt === '') return 'nodate';
  const due = new Date(task.dueAt);
  if (Number.isNaN(due.getTime())) return 'nodate';
  const start = startOfLocalDay(now);
  const end = endOfLocalDay(now);
  if (due < start) return 'overdue';
  if (due <= end) return 'today';
  return 'upcoming';
}

function compareDueThenUpdated(a: Task, b: Task): number {
  const da = a.dueAt ? new Date(a.dueAt).getTime() : Number.POSITIVE_INFINITY;
  const db = b.dueAt ? new Date(b.dueAt).getTime() : Number.POSITIVE_INFINITY;
  if (da !== db) return da - db;
  return a.updatedAt < b.updatedAt ? 1 : -1;
}

function compareUpdatedDesc(a: Task, b: Task): number {
  return a.updatedAt < b.updatedAt ? 1 : -1;
}

export const SECTION_ORDER: TaskBucket[] = [
  'overdue',
  'today',
  'upcoming',
  'nodate',
  'done',
];

export type TaskSection = { bucket: TaskBucket; title: string; data: Task[] };

const SECTION_TITLES: Record<TaskBucket, string> = {
  overdue: 'Overdue',
  today: 'Today',
  upcoming: 'Upcoming',
  nodate: 'No date',
  done: 'Done',
};

export function buildTaskSections(tasks: Task[], now: Date = new Date()): TaskSection[] {
  const byBucket = new Map<TaskBucket, Task[]>();
  for (const b of SECTION_ORDER) {
    byBucket.set(b, []);
  }
  for (const t of tasks) {
    const b = taskBucket(t, now);
    byBucket.get(b)!.push(t);
  }
  for (const b of SECTION_ORDER) {
    const list = byBucket.get(b)!;
    if (b === 'done') {
      list.sort(compareUpdatedDesc);
    } else {
      list.sort(compareDueThenUpdated);
    }
  }
  return SECTION_ORDER.filter((b) => (byBucket.get(b)?.length ?? 0) > 0).map((bucket) => ({
    bucket,
    title: SECTION_TITLES[bucket],
    data: byBucket.get(bucket)!,
  }));
}

export function sortTasksForDisplay(tasks: Task[]): Task[] {
  const now = new Date();
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (!a.completed) {
      const ba = taskBucket(a, now);
      const bb = taskBucket(b, now);
      const ia = SECTION_ORDER.indexOf(ba);
      const ib = SECTION_ORDER.indexOf(bb);
      if (ia !== ib) return ia - ib;
      return compareDueThenUpdated(a, b);
    }
    return compareUpdatedDesc(a, b);
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
