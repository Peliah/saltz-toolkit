import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, PaperShadow, Radius, Spacing } from '@/constants/theme';
import { formatDueLabel } from '@/lib/format-due';
import type { Task } from '@/types/tasks';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

type TaskEditorProps = {
  task: Task;
  isNew: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: () => void;
};

function defaultDueDate(): Date {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  if (d.getTime() < Date.now()) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

export function TaskEditor({ task, isNew, onClose, onSave, onDelete }: TaskEditorProps) {
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState<Date | null>(() =>
    task.dueAt ? new Date(task.dueAt) : null
  );
  const [iosPickerVisible, setIosPickerVisible] = useState(false);
  const [androidOpen, setAndroidOpen] = useState(false);

  const primaryDueLine = dueDate ? formatDueLabel(dueDate.toISOString()) : null;

  const openDuePicker = useCallback(() => {
    const next = dueDate ?? defaultDueDate();
    setDueDate(next);
    if (Platform.OS === 'android') {
      setAndroidOpen(true);
    } else if (Platform.OS === 'ios') {
      setIosPickerVisible(true);
    }
  }, [dueDate]);

  const clearDue = useCallback(() => {
    setDueDate(null);
    setIosPickerVisible(false);
    setAndroidOpen(false);
  }, []);

  const onAndroidPick = useCallback((event: DateTimePickerEvent, selected?: Date) => {
    setAndroidOpen(false);
    if (event.type === 'set' && selected != null) {
      setDueDate(selected);
    }
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.screen}>
        <ScreenHeader title={isNew ? 'New task' : 'Edit task'} onBack={onClose} />
        <SketchText variant="body" size="sm" style={styles.inputLabel}>
          Title
        </SketchText>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="What needs doing?"
          style={styles.input}
        />

        <SketchText variant="body" size="sm" style={styles.inputLabel}>
          Due
        </SketchText>
        <Pressable
          onPress={openDuePicker}
          style={({ pressed }) => [styles.dueCard, pressed && styles.dueCardPressed]}
          accessibilityRole="button"
          accessibilityLabel={primaryDueLine ? `Due ${primaryDueLine}. Tap to change` : 'Set due date'}
        >
          <View style={styles.dueIconWrap}>
            <Ionicons name="calendar-outline" size={22} color={Colors.accentBlue} />
          </View>
          <View style={styles.dueTextCol}>
            <SketchText variant="heading" size="base" style={styles.duePrimary}>
              {primaryDueLine ?? 'No due date'}
            </SketchText>
            <SketchText variant="body" size="sm" muted style={styles.dueHint}>
              Tap to set date & time
            </SketchText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.inkMuted} />
        </Pressable>

        <View style={styles.dueActions}>
          <Pressable
            onPress={openDuePicker}
            style={({ pressed }) => [styles.chipBtn, pressed && styles.chipBtnPressed]}
          >
            <SketchText variant="body" size="sm" style={styles.chipBtnLabel}>
              Set due
            </SketchText>
          </Pressable>
          <Pressable
            onPress={clearDue}
            style={({ pressed }) => [styles.chipGhost, pressed && styles.chipGhostPressed]}
            disabled={!dueDate}
          >
            <SketchText variant="body" size="sm" style={[styles.chipGhostLabel, !dueDate && styles.disabled]}>
              Clear
            </SketchText>
          </Pressable>
        </View>

        {Platform.OS === 'ios' && iosPickerVisible && dueDate ? (
          <View style={styles.pickerShell}>
            <View style={styles.pickerToolbar}>
              <Pressable onPress={() => setIosPickerVisible(false)} hitSlop={12}>
                <SketchText variant="heading" size="sm" style={styles.doneLink}>
                  Done
                </SketchText>
              </Pressable>
            </View>
            <DateTimePicker
              value={dueDate}
              mode="datetime"
              display="spinner"
              onChange={(_, selected) => {
                if (selected) setDueDate(selected);
              }}
            />
          </View>
        ) : null}

        {Platform.OS === 'android' && androidOpen && dueDate ? (
          <DateTimePicker
            value={dueDate}
            mode="datetime"
            display="default"
            onChange={onAndroidPick}
          />
        ) : null}

        {Platform.OS === 'web' ? (
          <View style={styles.webFallback}>
            <SketchText variant="body" size="sm" muted>
              Due dates on web: use the mobile app for the full picker.
            </SketchText>
          </View>
        ) : null}

        <View style={styles.actions}>
          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
          >
            <SketchText variant="body" size="sm" style={styles.deleteLabel}>
              Delete
            </SketchText>
          </Pressable>
          <Pressable
            onPress={() =>
              onSave({
                ...task,
                title,
                dueAt: dueDate ? dueDate.toISOString() : null,
              })
            }
            style={({ pressed }) => [styles.saveBtn, pressed && styles.saveBtnPressed]}
          >
            <SketchText variant="heading" size="base" style={styles.saveLabel}>
              Save
            </SketchText>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: Spacing[4],
  },
  screen: {
    width: '100%',
  },
  inputLabel: {
    marginTop: Spacing[2],
  },
  input: {
    marginTop: Spacing[1],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    padding: Spacing[3],
    fontSize: 16,
    fontFamily: FontFamily.body,
    color: Colors.foreground,
    ...Radius.wobbly,
  },
  dueCard: {
    marginTop: Spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    padding: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceMuted,
    ...Radius.wobbly,
    ...PaperShadow.hubTile,
  },
  dueCardPressed: {
    opacity: 0.94,
  },
  dueIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: Border.thin,
    borderColor: Colors.borderSubtle,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  duePrimary: {
    color: Colors.ink,
  },
  dueHint: {
    lineHeight: 18,
  },
  dueActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    marginTop: Spacing[3],
  },
  chipBtn: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  chipBtnPressed: {
    opacity: 0.92,
  },
  chipBtnLabel: {
    color: Colors.accentBlue,
  },
  chipGhost: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.borderSubtle,
    ...Radius.wobbly,
  },
  chipGhostPressed: {
    opacity: 0.9,
  },
  chipGhostLabel: {
    color: Colors.ink,
  },
  disabled: {
    opacity: 0.45,
  },
  pickerShell: {
    marginTop: Spacing[2],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
    overflow: 'hidden',
  },
  pickerToolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderBottomWidth: Border.thin,
    borderBottomColor: Colors.borderSubtle,
    backgroundColor: Colors.surfaceMuted,
  },
  doneLink: {
    color: Colors.accentBlue,
  },
  webFallback: {
    marginTop: Spacing[2],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[6],
    gap: Spacing[3],
  },
  deleteBtn: {
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
  },
  deleteBtnPressed: {
    opacity: 0.85,
  },
  deleteLabel: {
    color: Colors.danger,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: Spacing[3],
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  saveBtnPressed: {
    opacity: 0.92,
  },
  saveLabel: {
    color: Colors.accentBlue,
  },
});
