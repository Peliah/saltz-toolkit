import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import { bucketAccent, bucketIcon, bucketTint } from '@/components/tasks/scheduler-tokens';
import type { TaskBucket } from '@/types/tasks';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type TaskSectionHeaderProps = {
  bucket: TaskBucket;
  title: string;
};

export function TaskSectionHeader({ bucket, title }: TaskSectionHeaderProps) {
  const accent = bucketAccent[bucket];
  return (
    <View style={[styles.wrap, { backgroundColor: bucketTint[bucket] }]}>
      <View style={[styles.accentBar, { backgroundColor: accent }]} />
      <View style={styles.inner}>
        <Ionicons name={bucketIcon[bucket]} size={18} color={accent} />
        <SketchText variant="heading" size="sm" style={[styles.title, { color: accent }]}>
          {title}
        </SketchText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: Spacing[2],
    marginBottom: Spacing[2],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Radius.wobbly,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[2],
    paddingLeft: Spacing[3] + 4,
    paddingRight: Spacing[3],
  },
  title: {
    flex: 1,
  },
});
