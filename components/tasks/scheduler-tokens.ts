import { Colors } from '@/constants/theme';
import type { TaskBucket } from '@/types/tasks';
import type { ComponentProps } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export type IonIconName = ComponentProps<typeof Ionicons>['name'];

/** Accent (ink / semantic) per section — sketch palette */
export const bucketAccent: Record<TaskBucket, string> = {
  overdue: Colors.danger,
  today: Colors.accentBlue,
  upcoming: Colors.accentSecondary,
  nodate: Colors.inkMuted,
  done: Colors.inkMuted,
};

/** Soft fill behind section rule / chip */
export const bucketTint: Record<TaskBucket, string> = {
  overdue: 'rgba(180, 35, 24, 0.08)',
  today: 'rgba(53, 90, 115, 0.1)',
  upcoming: 'rgba(107, 100, 92, 0.08)',
  nodate: 'rgba(209, 201, 188, 0.35)',
  done: 'rgba(107, 100, 92, 0.06)',
};

export const bucketIcon: Record<TaskBucket, IonIconName> = {
  overdue: 'alert-circle-outline',
  today: 'sunny-outline',
  upcoming: 'calendar-outline',
  nodate: 'ellipse-outline',
  done: 'checkmark-circle-outline',
};
