import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import type { Task } from '@/types/tasks';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type TaskRowProps = {
  task: Task;
  onOpen: () => void;
  onToggleComplete: () => void;
};

export function TaskRow({ task, onOpen, onToggleComplete }: TaskRowProps) {
  const done = task.completed;

  return (
    <View style={styles.row}>
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[3],
    padding: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  checkHit: {
    paddingTop: 2,
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
});
