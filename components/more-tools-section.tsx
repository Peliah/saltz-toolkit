import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import { PLANNED_TOOLS } from '@/lib/planned-tools';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

const GRID_GAP = Spacing[2];
const SCROLL_HORIZONTAL_PADDING = Spacing[6];

export function MoreToolsSection() {
  const { width: windowWidth } = useWindowDimensions();

  const cellWidth = useMemo(() => {
    const contentWidth = windowWidth - SCROLL_HORIZONTAL_PADDING * 2;
    return (contentWidth - GRID_GAP * 2) / 3;
  }, [windowWidth]);

  return (
    <View style={styles.wrap}>
      <View style={styles.sectionHead}>
        <SketchText variant="heading" size="xl">
          More tools
        </SketchText>
        <SketchText variant="body" size="sm" muted>
          Coming to the app—stay tuned.
        </SketchText>
      </View>

      <View style={styles.grid}>
        {PLANNED_TOOLS.map((tool) => (
          <View key={tool.id} style={[styles.cell, { width: cellWidth }]}>
            <View style={styles.iconWrap}>
              <Ionicons
                name={tool.iconName as keyof typeof Ionicons.glyphMap}
                size={22}
                color={`${Colors.foreground}99`}
              />
            </View>
            <SketchText
              variant="body"
              size="sm"
              style={styles.cellTitle}
              numberOfLines={2}
            >
              {tool.title}
            </SketchText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: Spacing[4],
    gap: Spacing[4],
  },
  sectionHead: {
    gap: Spacing[1],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  cell: {
    paddingVertical: Spacing[1],
    paddingHorizontal: Spacing[1],
    ...Radius.wobbly,
    alignItems: 'center',
    gap: Spacing[2],
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.thin,
    borderColor: `${Colors.border}55`,
  },
  cellTitle: {
    textAlign: 'center',
    opacity: 0.92,
  },
  cellSub: {
    textAlign: 'center',
    lineHeight: 16,
  },
  badge: {
    marginTop: Spacing[1],
  },
});
