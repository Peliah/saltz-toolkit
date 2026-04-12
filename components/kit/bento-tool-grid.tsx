import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import type { ToolDef } from '@/lib/tools-registry';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { Href } from 'expo-router';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type BentoToolGridProps = {
  tools: readonly ToolDef[];
};

const TILE_TINTS = [
  Colors.accentMuted,
  'rgba(53, 90, 115, 0.12)',
  'rgba(242, 230, 166, 0.55)',
] as const;

export function BentoToolGrid({ tools }: BentoToolGridProps) {
  const ordered = useMemo(() => {
    const featured = tools.filter((t) => t.hubVariant === 'featured');
    const rest = tools.filter((t) => t.hubVariant === 'compact');
    return [...featured, ...rest];
  }, [tools]);

  return (
    <View style={styles.wrap}>
      {ordered.map((tool, index) => (
        <ToolRow key={tool.id} tool={tool} index={index} featured={tool.hubVariant === 'featured'} />
      ))}
    </View>
  );
}

function ToolRow({
  tool,
  index,
  featured,
}: {
  tool: ToolDef;
  index: number;
  featured: boolean;
}) {
  const tint = TILE_TINTS[index % TILE_TINTS.length];

  return (
    <Pressable
      onPress={() => router.push(tool.href as Href)}
      style={({ pressed }) => [
        styles.row,
        featured && styles.rowFeatured,
        { backgroundColor: tint },
        pressed && styles.rowPressed,
        !pressed && styles.rowShadow,
      ]}
    >
      <View style={[styles.iconBox, { borderColor: Colors.border }]}>
        <Ionicons name={tool.iconName} size={featured ? 24 : 20} color={Colors.ink} />
      </View>
      <View style={styles.copy}>
        <SketchText variant="heading" size={featured ? 'xl' : 'lg'} numberOfLines={2} style={styles.title}>
          {tool.title}
        </SketchText>
        <SketchText variant="body" size="sm" muted numberOfLines={2}>
          {tool.subtitle}
        </SketchText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing[3],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[4],
    borderWidth: Border.default,
    borderColor: Colors.border,
    ...Radius.wobbly,
    // ...PaperShadow.hubTile,
  },
  rowFeatured: {
    paddingVertical: Spacing[5],
  },
  rowPressed: {
    opacity: 0.9,
    // transform: [{ translateX: 1 }, { translateY: 1 }],
    ...Shadow.pressed,
  },
  rowShadow: {
    // ...PaperShadow.hubTile,
  },
  iconBox: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: Border.thin,
    ...Radius.wobbly,
  },
  copy: {
    flex: 1,
    gap: Spacing[1],
    paddingRight: Spacing[2],
  },
  title: {
    color: Colors.ink,
  },
});
