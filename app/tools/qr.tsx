import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, Radius, Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import type { BarcodeScanningResult } from 'expo-camera';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useRef, useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';

export default function QrScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [data, setData] = useState<string | null>(null);
  const lastScan = useRef<{ t: number; v: string } | null>(null);

  const onBarcodeScanned = useCallback((e: BarcodeScanningResult) => {
    const now = Date.now();
    const prev = lastScan.current;
    if (prev && prev.v === e.data && now - prev.t < 1200) return;
    lastScan.current = { t: now, v: e.data };
    setData(e.data);
  }, []);

  const openUrl = async () => {
    if (!data) return;
    const url = data.trim();
    if (!/^https?:\/\//i.test(url)) return;
    await WebBrowser.openBrowserAsync(url);
  };

  const openExternally = () => {
    if (!data) return;
    void Linking.openURL(data.trim());
  };

  if (Platform.OS === 'web') {
    return (
      <SketchScreen>
        <View style={styles.screen}>
          <ScreenHeader title="QR scan" onBack={() => router.back()} />
          <SketchText variant="body" size="base" muted>
            Camera scanning is not supported on web in this build. Use iOS or Android.
          </SketchText>
        </View>
      </SketchScreen>
    );
  }

  return (
    <SketchScreen>
      <View style={styles.screen}>
        <ScreenHeader title="QR scan" onBack={() => router.back()} />

        {!permission?.granted ? (
          <View style={styles.permBox}>
            <SketchText variant="body" size="base" style={styles.permText}>
              Camera access is needed to scan QR codes.
            </SketchText>
            <Pressable onPress={() => void requestPermission()} style={({ pressed }) => [styles.permBtn, pressed && styles.permBtnPressed]}>
              <SketchText variant="heading" size="base" style={styles.permBtnLabel}>
                Allow camera
              </SketchText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.cameraBox}>
            <CameraView
              style={styles.camera}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={onBarcodeScanned}
            />
          </View>
        )}

        <View style={styles.result}>
          <SketchText variant="body" size="sm" muted>
            Last scan
          </SketchText>
          <SketchText variant="body" size="base" selectable>
            {data ?? '—'}
          </SketchText>
          {data && /^https?:\/\//i.test(data.trim()) ? (
            <Pressable onPress={() => void openUrl()} style={({ pressed }) => [styles.linkBtn, pressed && styles.linkBtnPressed]}>
              <SketchText variant="heading" size="sm" style={styles.linkBtnLabel}>
                Open in in-app browser
              </SketchText>
            </Pressable>
          ) : null}
          {data ? (
            <Pressable onPress={openExternally} style={({ pressed }) => [styles.secondaryBtn, pressed && styles.secondaryBtnPressed]}>
              <SketchText variant="body" size="sm">
                Open with system…
              </SketchText>
            </Pressable>
          ) : null}
        </View>
      </View>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[10],
    gap: Spacing[4],
  },
  permBox: {
    gap: Spacing[4],
    padding: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  permText: {
    textAlign: 'center',
  },
  permBtn: {
    paddingVertical: Spacing[3],
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  permBtnPressed: {
    opacity: 0.9,
  },
  permBtnLabel: {
    color: Colors.accentBlue,
  },
  cameraBox: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 280,
    borderWidth: Border.thin,
    borderColor: Colors.border,
  },
  camera: {
    flex: 1,
  },
  result: {
    gap: Spacing[2],
  },
  linkBtn: {
    marginTop: Spacing[2],
    paddingVertical: Spacing[3],
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  linkBtnPressed: {
    opacity: 0.9,
  },
  linkBtnLabel: {
    color: Colors.accentBlue,
  },
  secondaryBtn: {
    paddingVertical: Spacing[2],
    alignItems: 'center',
  },
  secondaryBtnPressed: {
    opacity: 0.85,
  },
});
