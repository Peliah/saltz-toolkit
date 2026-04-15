import { loadTasks, saveTasks } from '@/lib/tasks-storage';
import {
  createEmptyTask,
  removeTaskById,
  sortTasksForDisplay,
  toggleTaskCompleted,
  upsertTask,
} from '@/lib/tasks';
import type { Task } from '@/types/tasks';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editor, setEditor] = useState<Task | null>(null);

  useEffect(() => {
    void loadTasks().then(setTasks);
  }, []);

  const persist = useCallback(async (next: Task[]) => {
    setTasks(next);
    await saveTasks(next);
  }, []);

  const sortedTasks = useMemo(() => sortTasksForDisplay(tasks), [tasks]);

  const openNew = useCallback(() => {
    setEditor(createEmptyTask());
  }, []);

  const openTask = useCallback((t: Task) => {
    setEditor({ ...t });
  }, []);

  const closeEditor = useCallback(() => {
    setEditor(null);
  }, []);

  const saveTask = useCallback(
    async (task: Task) => {
      await persist(upsertTask(tasks, task));
      closeEditor();
    },
    [tasks, persist, closeEditor]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      await persist(removeTaskById(tasks, id));
      closeEditor();
    },
    [tasks, persist, closeEditor]
  );

  const toggleComplete = useCallback(
    async (id: string) => {
      await persist(toggleTaskCompleted(tasks, id));
    },
    [tasks, persist]
  );

  return {
    sortedTasks,
    editor,
    openNew,
    openTask,
    closeEditor,
    saveTask,
    deleteTask,
    toggleComplete,
  };
}
