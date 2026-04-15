import { Border, Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import type { Task } from '@/types/tasks';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TaskEditor } from './task-editor';

type TaskEditorModalProps = {
  visible: boolean;
  task: Task | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskEditorModal({
  visible,
  task,
  isNew,
  onClose,
  onSave,
  onDelete,
}: TaskEditorModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Dismiss" />
        <View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, Spacing[4]),
              paddingTop: Spacing[4],
            },
          ]}
        >
          {task ? (
            <TaskEditor
              task={task}
              isNew={isNew}
              onClose={onClose}
              onSave={onSave}
              onDelete={() => onDelete(task.id)}
            />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 33, 30, 0.38)',
  },
  sheet: {
    width: '100%',
    maxHeight: '72%',
    backgroundColor: Colors.surface,
    borderTopWidth: Border.default,
    borderLeftWidth: Border.default,
    borderRightWidth: Border.default,
    borderColor: Colors.border,
    borderTopLeftRadius: Radius.wobblyMd.borderTopLeftRadius,
    borderTopRightRadius: Radius.wobblyMd.borderTopRightRadius,
    paddingHorizontal: Spacing[6],
    ...Shadow.lg,
  },
});
