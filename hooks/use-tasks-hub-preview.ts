import { incompleteTasksFirst, taskBucket } from '@/lib/tasks';
import { loadTasks } from '@/lib/tasks-storage';
import type { Task } from '@/types/tasks';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';

const PREVIEW_LIMIT = 3;

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

  const overdueCount = useMemo(
    () => incompleteOrdered.filter((t) => taskBucket(t) === 'overdue').length,
    [incompleteOrdered]
  );

  const todayDueCount = useMemo(
    () => incompleteOrdered.filter((t) => taskBucket(t) === 'today').length,
    [incompleteOrdered]
  );

  return {
    openCount,
    overdueCount,
    todayDueCount,
    previewTitles,
    refresh,
  };
}
