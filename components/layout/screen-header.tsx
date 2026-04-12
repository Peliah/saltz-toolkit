import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Spacing } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type ScreenHeaderProps = {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
};

export function ScreenHeader({ title, onBack, right }: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={22} color={Colors.ink} />
      </Pressable>
      <SketchText variant="heading" size="2xl" style={styles.title} numberOfLines={1}>
        {title}
      </SketchText>
      <View style={styles.right}>{right ?? null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingBottom: Spacing[4],
  },
  back: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -Spacing[2],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.white,
  },
  backPressed: {
    opacity: 0.85,
  },
  title: {
    flex: 1,
  },
  right: {
    minWidth: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
