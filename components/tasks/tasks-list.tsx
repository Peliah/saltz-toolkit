import { SketchText } from '@/components/sketch/sketch-text';
import { TaskSectionHeader } from '@/components/tasks/task-section-header';
import { WeekStrip } from '@/components/tasks/week-strip';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import { buildTaskSections, taskBucket } from '@/lib/tasks';
import type { Task } from '@/types/tasks';
import React, { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, View } from 'react-native';

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
  const now = useMemo(() => new Date(), []);

  const sections = useMemo(() => buildTaskSections(tasks, now), [tasks, now]);

  const stats = useMemo(() => {
    const open = tasks.filter((t) => !t.completed);
    return {
      open: open.length,
      overdue: open.filter((t) => taskBucket(t, now) === 'overdue').length,
      today: open.filter((t) => taskBucket(t, now) === 'today').length,
      upcoming: open.filter((t) => taskBucket(t, now) === 'upcoming').length,
      nodate: open.filter((t) => taskBucket(t, now) === 'nodate').length,
      done: tasks.filter((t) => t.completed).length,
    };
  }, [tasks, now]);

  const listHeader = (
    <View style={styles.headerBlock}>
      

      <View style={styles.summaryCard}>
        <View style={styles.summaryRule} />
        <SketchText variant="heading" size="lg" style={styles.summaryTitle}>
          At a glance
        </SketchText>
        <View style={styles.statGrid}>
          <View style={styles.statCell}>
            <SketchText variant="heading" size="2xl" style={styles.statNum}>
              {stats.open}
            </SketchText>
            <SketchText variant="body" size="sm" muted>
              open
            </SketchText>
          </View>
          <View style={[styles.statCell, styles.statDanger]}>
            <SketchText variant="heading" size="2xl" style={styles.statNumDanger}>
              {stats.overdue}
            </SketchText>
            <SketchText variant="body" size="sm" muted>
              overdue
            </SketchText>
          </View>
          <View style={[styles.statCell, styles.statBlue]}>
            <SketchText variant="heading" size="2xl" style={styles.statNumBlue}>
              {stats.today}
            </SketchText>
            <SketchText variant="body" size="sm" muted>
              today
            </SketchText>
          </View>
          <View style={styles.statCell}>
            <SketchText variant="heading" size="2xl" style={styles.statNum}>
              {stats.nodate}
            </SketchText>
            <SketchText variant="body" size="sm" muted>
              no date
            </SketchText>
          </View>
        </View>
        <View style={styles.doneLine}>
          <SketchText variant="body" size="sm" style={styles.doneLabel}>
            {stats.done} completed
          </SketchText>
        </View>
      </View>

      <WeekStrip />

      <Pressable onPress={onNew} style={({ pressed }) => [styles.newBtn, pressed && styles.newBtnPressed]}>
        <SketchText variant="heading" size="base" style={styles.newBtnLabel}>
          Add task
        </SketchText>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.wrap}>
      <SectionList
        style={styles.list}
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        renderSectionHeader={({ section }) => (
          <TaskSectionHeader bucket={section.bucket} title={section.title} />
        )}
        renderItem={({ item }) => (
          <View style={styles.rowWrap}>
            <TaskRow
              task={item}
              onOpen={() => onOpenTask(item)}
              onToggleComplete={() => onToggleComplete(item.id)}
            />
          </View>
        )}
        ListHeaderComponent={listHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          tasks.length === 0 ? (
            <View style={styles.emptyWrap}>
              <SketchText variant="heading" size="lg" style={styles.emptyTitle}>
                Nothing scheduled yet
              </SketchText>
              <SketchText variant="body" size="base" muted style={styles.emptyBody}>
                Tap “Add task” for a quick jot—or give it a due date and it will land in Today,
                Upcoming, or Overdue.
              </SketchText>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  headerBlock: {
    marginBottom: Spacing[2],
  },
  intro: {
    marginBottom: Spacing[3],
  },
  summaryCard: {
    marginBottom: Spacing[4],
    padding: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceMuted,
    ...Radius.wobblyMd,
  },
  summaryRule: {
    height: 3,
    width: 48,
    backgroundColor: Colors.accent,
    marginBottom: Spacing[3],
    borderRadius: 2,
  },
  summaryTitle: {
    color: Colors.ink,
    marginBottom: Spacing[3],
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
  },
  statCell: {
    minWidth: '42%',
    flexGrow: 1,
    padding: Spacing[3],
    borderWidth: Border.thin,
    borderColor: Colors.borderSubtle,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  statDanger: {
    borderColor: 'rgba(180, 35, 24, 0.35)',
  },
  statBlue: {
    borderColor: 'rgba(53, 90, 115, 0.35)',
  },
  statNum: {
    color: Colors.ink,
  },
  statNumDanger: {
    color: Colors.danger,
  },
  statNumBlue: {
    color: Colors.accentBlue,
  },
  doneLine: {
    marginTop: Spacing[3],
    paddingTop: Spacing[3],
    borderTopWidth: Border.thin,
    borderTopColor: Colors.borderSubtle,
  },
  doneLabel: {
    color: Colors.inkMuted,
  },
  newBtn: {
    marginBottom: Spacing[2],
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing[12],
  },
  rowWrap: {
    marginBottom: Spacing[2],
  },
  emptyWrap: {
    paddingVertical: Spacing[8],
    paddingHorizontal: Spacing[2],
    alignItems: 'center',
  },
  emptyTitle: {
    color: Colors.ink,
    marginBottom: Spacing[2],
    textAlign: 'center',
  },
  emptyBody: {
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
});
