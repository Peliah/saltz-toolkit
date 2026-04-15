import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import type { Task } from '@/types/tasks';
import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { TaskRow } from './task-row';

type TasksListProps = {
  tasks: Task[];
  onNew: () => void;
  onOpenTask: (task: Task) => void;
  onToggleComplete: (id: string) => void;
};

export function TasksList({
  tasks,
  onNew,
  onOpenTask,
  onToggleComplete,
}: TasksListProps) {
  const { openCount, doneCount, firstDoneIndex, listData } = useMemo(() => {
    const open = tasks.filter((t) => !t.completed);
    const done = tasks.filter((t) => t.completed);
    const firstDone = tasks.findIndex((t) => t.completed);
    return {
      openCount: open.length,
      doneCount: done.length,
      firstDoneIndex: firstDone === -1 ? -1 : firstDone,
      listData: tasks,
    };
  }, [tasks]);

  return (
    <View style={styles.wrap}>
      <SketchText variant="body" size="sm" muted style={styles.intro}>
        Saved list of tasks.
      </SketchText>

      <View style={styles.summary}>
        <View style={styles.summaryRule} />
        <View style={styles.summaryLine}>
          <SketchText variant="heading" size="lg" style={styles.summaryEm}>
            {openCount}
          </SketchText>
          <SketchText variant="heading" size="lg" style={styles.summaryPlain}>
            {' '}open ·{' '}
          </SketchText>
          <SketchText variant="heading" size="lg" style={styles.summaryEm}>
            {doneCount}
          </SketchText>
          <SketchText variant="heading" size="lg" style={styles.summaryPlain}>
            {' '}
            done
          </SketchText>
        </View>
      </View>

      <Pressable onPress={onNew} style={({ pressed }) => [styles.newBtn, pressed && styles.newBtnPressed]}>
        <SketchText variant="heading" size="base" style={styles.newBtnLabel}>
          Add task
        </SketchText>
      </Pressable>

      <FlatList
        style={styles.flatList}
        data={listData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <SketchText variant="body" size="base" muted style={styles.empty}>
            Nothing queued yet. Tap “Add task” when something occurs to you.
          </SketchText>
        }
        renderItem={({ item, index }) => (
          <View style={styles.rowWrap}>
            {index === firstDoneIndex && firstDoneIndex !== -1 ? (
              <SketchText variant="heading" size="sm" style={styles.sectionLabel}>
                Done
              </SketchText>
            ) : null}
            <TaskRow
              task={item}
              onOpen={() => onOpenTask(item)}
              onToggleComplete={() => onToggleComplete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  intro: {
    marginBottom: Spacing[2],
  },
  summary: {
    marginBottom: Spacing[4],
    gap: Spacing[2],
  },
  summaryRule: {
    height: 3,
    width: 56,
    backgroundColor: Colors.accent,
    opacity: 0.85,
    borderRadius: 2,
  },
  summaryLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  summaryPlain: {
    color: Colors.ink,
  },
  summaryEm: {
    color: Colors.accentBlue,
  },
  newBtn: {
    marginBottom: Spacing[4],
    paddingVertical: Spacing[3],
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  newBtnPressed: {
    opacity: 0.92,
  },
  newBtnLabel: {
    color: Colors.accentBlue,
  },
  flatList: {
    flex: 1,
  },
  list: {
    paddingBottom: Spacing[10],
    gap: Spacing[2],
  },
  rowWrap: {
    gap: Spacing[2],
  },
  sectionLabel: {
    marginTop: Spacing[2],
    marginBottom: Spacing[1],
    color: Colors.inkMuted,
  },
  empty: {
    marginTop: Spacing[6],
    textAlign: 'center',
  },
});
