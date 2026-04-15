import { TaskEditorModal } from '@/components/tasks/task-editor-modal';
import { TasksList } from '@/components/tasks/tasks-list';
import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { Spacing } from '@/constants/theme';
import { useTasks } from '@/hooks/use-tasks';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export default function TasksScreen() {
  const router = useRouter();
  const {
    sortedTasks,
    editor,
    openNew,
    openTask,
    closeEditor,
    saveTask,
    deleteTask,
    toggleComplete,
  } = useTasks();

  const editorIsNew = useMemo(
    () => (editor ? !sortedTasks.some((t) => t.id === editor.id) : false),
    [editor, sortedTasks]
  );

  return (
    <SketchScreen>
      <View style={styles.screen}>
        <ScreenHeader title="Tasks" onBack={() => router.back()} />
        <TasksList
          tasks={sortedTasks}
          onNew={openNew}
          onOpenTask={openTask}
          onToggleComplete={toggleComplete}
        />
      </View>

      <TaskEditorModal
        visible={editor !== null}
        task={editor}
        isNew={editorIsNew}
        onClose={closeEditor}
        onSave={(t) => void saveTask(t)}
        onDelete={(id) => void deleteTask(id)}
      />
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[10],
  },
});
