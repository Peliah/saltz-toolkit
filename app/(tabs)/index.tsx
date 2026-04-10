import { ConverterSection } from '@/components/converter-section';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Spacing } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SketchScreen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <SketchText variant="heading" size="2xl" numberOfLines={1} style={styles.wordmark}>
            Saltz Toolkit
          </SketchText>
          <Pressable
            onPress={() => router.push('/tools')}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
            accessibilityRole="button"
            accessibilityLabel="All tools"
          >
            <Ionicons name="apps-outline" size={22} color={Colors.foreground} />
          </Pressable>
        </View>

        <ConverterSection />
      </ScrollView>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing[6],
    paddingBottom: Spacing[20],
    gap: Spacing[6],
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[1],
  },
  wordmark: {
    flex: 1,
    paddingRight: Spacing[4],
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.white,
  },
  iconBtnPressed: {
    opacity: 0.88,
  },
  hero: {
    gap: Spacing[2],
    marginBottom: Spacing[2],
  },
  heroTitle: {
    letterSpacing: -0.5,
  },
  heroSub: {
    lineHeight: 24,
    maxWidth: 340,
  },
});
