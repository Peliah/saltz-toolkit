export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueAt: string | null;
  updatedAt: string;
};

export type TaskBucket = 'overdue' | 'today' | 'upcoming' | 'nodate' | 'done';
