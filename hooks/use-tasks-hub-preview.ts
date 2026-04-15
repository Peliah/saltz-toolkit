import { loadTasks } from '@/lib/tasks-storage';
import { incompleteTasksFirst } from '@/lib/tasks';
import type { Task } from '@/types/tasks';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';

const PREVIEW_LIMIT = 3;

/**
 * Loads tasks for the kit hero; refreshes whenever the home tab gains focus
 * (e.g. after returning from /tools/tasks).
 */
export function useTasksHubPreview() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refresh = useCallback(() => {
    void loadTasks().then(setTasks);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const incompleteOrdered = useMemo(() => incompleteTasksFirst(tasks), [tasks]);

  const openCount = incompleteOrdered.length;

  const previewTitles = useMemo(
    () =>
      incompleteOrdered
        .slice(0, PREVIEW_LIMIT)
        .map((t) => t.title.trim() || 'Untitled'),
    [incompleteOrdered]
  );

  return {
    openCount,
    previewTitles,
    refresh,
  };
}
