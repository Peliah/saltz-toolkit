import { Border, Colors, Radius, Shadow } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface SketchCardProps extends ViewProps {
  decoration?: 'tape' | 'tack' | 'none';
  variant?: 'default' | 'postit';
  rotate?: 'none' | 'cw' | 'ccw'; // clockwise / counter-clockwise tilt
  style?: ViewStyle;
  children: React.ReactNode;
}

/**
 * Hand-drawn card container.
 *
 * decoration="tape"  → grey tape strip across the top
 * decoration="tack"  → red thumbtack circle at top-center
 * variant="postit"   → post-it yellow background
 * rotate="cw"        → slight clockwise tilt (1.5deg)
 * rotate="ccw"       → slight counter-clockwise tilt (-1.5deg)
 */
export function SketchCard({
  decoration = 'none',
  variant = 'default',
  rotate = 'none',
  style,
  children,
  ...props
}: SketchCardProps) {
  const rotation =
    rotate === 'cw'
      ? { transform: [{ rotate: '1.5deg' }] }
      : rotate === 'ccw'
      ? { transform: [{ rotate: '-1.5deg' }] }
      : {};

  return (
    <View
      style={[
        styles.base,
        Radius.wobblyMd,
        Shadow.md,
        variant === 'postit' && styles.postit,
        rotation,
        style,
      ]}
      {...props}
    >
      {/* Tape decoration */}
      {decoration === 'tape' && (
        <View style={styles.tape} />
      )}

      {/* Thumbtack decoration */}
      {decoration === 'tack' && (
        <View style={styles.tackContainer}>
          <View style={styles.tack} />
        </View>
      )}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.white,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    padding: 16,
    overflow: 'visible',
  },
  postit: {
    backgroundColor: Colors.postIt,
  },
  // Tape strip — translucent grey bar sitting above card top edge
  tape: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: 64,
    height: 20,
    backgroundColor: 'rgba(200, 195, 188, 0.6)',
    borderRadius: 2,
    transform: [{ rotate: '-1deg' }],
  },
  tackContainer: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    zIndex: 10,
  },
  tack: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.border,
  },
});
