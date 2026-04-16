import { SketchText } from '@/components/sketch/sketch-text';
import { bucketTint } from '@/components/tasks/scheduler-tokens';
import { Border, Colors, PaperShadow, Radius, Spacing } from '@/constants/theme';
import { formatDueLabel } from '@/lib/format-due';
import { taskBucket } from '@/lib/tasks';
import type { Task } from '@/types/tasks';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type TaskRowProps = {
  task: Task;
  onOpen: () => void;
  onToggleComplete: () => void;
};

export function TaskRow({ task, onOpen, onToggleComplete }: TaskRowProps) {
  const done = task.completed;
  const now = useMemo(() => new Date(), []);
  const bucket = taskBucket(task, now);
  const railTint = bucketTint[bucket];
  const dueLine =
    task.dueAt && !Number.isNaN(new Date(task.dueAt).getTime())
      ? formatDueLabel(task.dueAt, now)
      : null;

  return (
    <View style={[styles.row, done && styles.rowDone]}>
      <View style={[styles.rail, { backgroundColor: railTint }]} />
      <Pressable
        onPress={onToggleComplete}
        style={({ pressed }) => [styles.checkHit, pressed && styles.checkHitPressed]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={done ? 'Mark incomplete' : 'Mark complete'}
      >
        <View style={[styles.checkBox, done && styles.checkBoxDone]}>
          {done ? (
            <Ionicons name="checkmark" size={16} color={Colors.white} />
          ) : null}
        </View>
      </Pressable>
      <Pressable
        onPress={onOpen}
        style={({ pressed }) => [styles.titleHit, pressed && styles.titleHitPressed]}
        accessibilityRole="button"
        accessibilityLabel={`Edit task ${task.title || 'Untitled'}`}
      >
        <SketchText
          variant="heading"
          size="base"
          numberOfLines={2}
          style={[styles.title, done && styles.titleDone]}
        >
          {task.title.trim() || 'Untitled'}
        </SketchText>
        {dueLine ? (
          <View style={styles.dueRow}>
            <View style={styles.dueChip}>
              <Ionicons name="time-outline" size={12} color={done ? Colors.inkMuted : Colors.accentBlue} />
              <SketchText
                variant="body"
                size="sm"
                style={[styles.dueText, done && styles.dueTextDone]}
                numberOfLines={1}
              >
                {dueLine}
              </SketchText>
            </View>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[2],
    padding: Spacing[3],
    paddingLeft: Spacing[2],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
    ...PaperShadow.hubTile,
    overflow: 'hidden',
  },
  rowDone: {
    opacity: 0.92,
  },
  rail: {
    width: 4,
    alignSelf: 'stretch',
    minHeight: 48,
    borderRadius: 2,
    marginRight: Spacing[1],
  },
  checkHit: {
    paddingTop: 4,
  },
  checkHitPressed: {
    opacity: 0.85,
  },
  checkBox: {
    width: 26,
    height: 26,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    ...Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxDone: {
    backgroundColor: Colors.accentBlue,
    borderColor: Colors.accentBlue,
  },
  titleHit: {
    flex: 1,
    paddingVertical: 2,
    minWidth: 0,
  },
  titleHitPressed: {
    opacity: 0.92,
  },
  title: {
    color: Colors.ink,
  },
  titleDone: {
    color: Colors.inkMuted,
    textDecorationLine: 'line-through',
  },
  dueRow: {
    marginTop: Spacing[2],
  },
  dueChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: Spacing[2],
    borderWidth: Border.thin,
    borderColor: Colors.borderSubtle,
    backgroundColor: Colors.surfaceMuted,
    ...Radius.sm,
  },
  dueText: {
    color: Colors.accentBlue,
    flexShrink: 1,
  },
  dueTextDone: {
    color: Colors.inkMuted,
  },
});
