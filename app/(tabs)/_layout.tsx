import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { Border, Colors, FontFamily, Shadow } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: `${Colors.foreground}66`,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <TabBarBackground />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji="" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji="" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  emoji,
  focused,
}: {
  emoji: string;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
}

function TabBarBackground() {
  return <View style={styles.tabBarBackground} />;
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 88 : 68,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    paddingTop: 8,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopWidth: Border.default,
    borderTopColor: Colors.border,
    ...Shadow.md,
    shadowOffset: { width: 0, height: -3 },
    borderTopLeftRadius: 18,
    borderTopRightRadius: 10,
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: Colors.postIt,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 7,
  },
  emoji: {
    fontSize: 20,
  },
});