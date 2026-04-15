import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import { useTasksHubPreview } from '@/hooks/use-tasks-hub-preview';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export function KitHeroCard() {
  const router = useRouter();
  const { openCount, previewTitles } = useTasksHubPreview();

  return (
    <Pressable
      onPress={() => router.push('/tools/tasks')}
      style={({ pressed }) => [styles.wrap, pressed && styles.wrapPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Today's tasks, ${openCount} open. Open task list.`}
    >


      <View style={styles.tasksBlock}>
        <View style={styles.tasksRule} />
        <View style={styles.tasksHeader}>
          <Ionicons
            name="calendar-outline"
            size={24}
            color={Colors.accentBlue}
            style={styles.tasksCalendarIcon}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
          <View style={styles.tasksTitleWrap}>
            <View style={styles.tasksTitleRow}>
              <SketchText variant="heading" size="base" style={styles.tasksHeading}>
                {"Today's tasks"}
              </SketchText>
              <SketchText variant="heading" size="base" style={styles.tasksCount}>
                {` · ${openCount} open`}
              </SketchText>
            </View>
          </View>
        </View>
        {previewTitles.length > 0 ? (
          <View style={styles.previewList}>
            {previewTitles.map((line, index) => (
              <SketchText
                key={`${index}-${line}`}
                variant="body"
                size="sm"
                style={styles.previewLine}
                numberOfLines={1}
              >
                — {line}
              </SketchText>
            ))}
          </View>
        ) : (
          <SketchText variant="body" size="sm" muted style={styles.previewEmpty}>
            Nothing queued — tap to jot one down.
          </SketchText>
        )}
        <SketchText variant="body" size="sm" style={styles.cta}>
          Open list →
        </SketchText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.surface,
    borderWidth: Border.default,
    borderColor: Colors.border,
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[6],
    paddingBottom: Spacing[5],
    ...Radius.wobblyMd,
  },
  wrapPressed: {
    opacity: 0.94,
  },
  
  rule: {
    height: Border.thick,
    backgroundColor: Colors.ink,
    marginTop: Spacing[4],
    marginBottom: Spacing[3],
    opacity: 0.85,
    alignSelf: 'stretch',
  },
  lede: {
    maxWidth: 320,
    lineHeight: 24,
  },
  tasksBlock: {
    gap: Spacing[2],
  },
  tasksRule: {
    height: Border.thin,
    backgroundColor: Colors.border,
    opacity: 0.9,
    alignSelf: 'stretch',
  },
  tasksHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[3],
  },
  tasksCalendarIcon: {
    marginTop: 2,
  },
  tasksTitleWrap: {
    flex: 1,
    minWidth: 0,
  },
  tasksTitleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 0,
  },
  tasksHeading: {
    color: Colors.ink,
  },
  tasksCount: {
    color: Colors.accentBlue,
    fontWeight: '600',
  },
  previewList: {
    gap: Spacing[1],
  },
  previewLine: {
    color: Colors.ink,
  },
  previewEmpty: {
    lineHeight: 20,
  },
  cta: {
    marginTop: Spacing[1],
    color: Colors.accentBlue,
  },
});
