import { ScreenHeader } from '@/components/layout/screen-header';
import { SketchScreen } from '@/components/sketch/sketch-screen';
import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import * as Clipboard from 'expo-clipboard';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

const SYMBOLS = '!@#$%^&*-_+=?';

export default function PasswordScreen() {
  const router = useRouter();
  const [length, setLength] = useState(18);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [out, setOut] = useState('');
  const [copied, setCopied] = useState(false);

  const charset = useCallback(() => {
    let s = '';
    if (upper) s += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (lower) s += 'abcdefghijkmnopqrstuvwxyz';
    if (digits) s += '23456789';
    if (symbols) s += SYMBOLS;
    return s;
  }, [upper, lower, digits, symbols]);

  const generate = useCallback(async () => {
    const pool = charset();
    if (pool.length === 0) {
      setOut('');
      return;
    }
    const bytes = await Crypto.getRandomBytesAsync(length);
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += pool[bytes[i] % pool.length]!;
    }
    setOut(pwd);
    setCopied(false);
  }, [charset, length]);

  const copy = async () => {
    if (!out) return;
    await Clipboard.setStringAsync(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SketchScreen>
      <View style={styles.screen}>
        <ScreenHeader title="Passwords" onBack={() => router.back()} />
        <SketchText variant="body" size="sm" muted style={styles.intro}>
          Uses secure random bytes — nothing leaves your device until you copy.
        </SketchText>

        <SketchText variant="body" size="sm" style={styles.label}>
          Length ({length})
        </SketchText>
        <View style={styles.lenRow}>
          {[12, 16, 18, 24, 32].map((n) => (
            <Pressable
              key={n}
              onPress={() => setLength(n)}
              style={({ pressed }) => [
                styles.lenChip,
                length === n && styles.lenChipActive,
                pressed && styles.lenChipPressed,
              ]}
            >
              <SketchText variant="body" size="sm" style={length === n ? styles.lenChipLabel : undefined}>
                {n}
              </SketchText>
            </Pressable>
          ))}
        </View>

        <ToggleRow label="Uppercase A–Z" on={upper} onToggle={() => setUpper((v) => !v)} />
        <ToggleRow label="Lowercase a–z" on={lower} onToggle={() => setLower((v) => !v)} />
        <ToggleRow label="Digits" on={digits} onToggle={() => setDigits((v) => !v)} />
        <ToggleRow label="Symbols" on={symbols} onToggle={() => setSymbols((v) => !v)} />

        <Pressable onPress={() => void generate()} style={({ pressed }) => [styles.genBtn, pressed && styles.genBtnPressed]}>
          <SketchText variant="heading" size="lg" style={styles.genBtnLabel}>
            Generate
          </SketchText>
        </Pressable>

        <SketchText variant="body" size="sm" style={styles.label}>
          Result
        </SketchText>
        <TextInput
          style={styles.out}
          value={out}
          editable={false}
          multiline
          selectTextOnFocus
        />

        <Pressable
          onPress={() => void copy()}
          disabled={!out}
          style={({ pressed }) => [styles.copyBtn, !out && styles.copyBtnDisabled, pressed && styles.copyBtnPressed]}
        >
          <SketchText variant="body" size="base" style={styles.copyBtnLabel}>
            {copied ? 'Copied' : 'Copy'}
          </SketchText>
        </Pressable>
      </View>
    </SketchScreen>
  );
}

function ToggleRow({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.toggleRow, pressed && styles.togglePressed]}>
      <SketchText variant="body" size="base">
        {label}
      </SketchText>
      <SketchText variant="heading" size="sm" style={on ? styles.toggleOn : styles.toggleOff}>
        {on ? 'On' : 'Off'}
      </SketchText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[10],
    gap: Spacing[3],
  },
  intro: {
    marginBottom: Spacing[1],
  },
  label: {
    marginTop: Spacing[1],
  },
  lenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  lenChip: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  lenChipActive: {
    borderColor: Colors.accentBlue,
    backgroundColor: Colors.accentMuted,
  },
  lenChipPressed: {
    opacity: 0.9,
  },
  lenChipLabel: {
    fontFamily: FontFamily.heading,
    color: Colors.accentBlue,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  togglePressed: {
    opacity: 0.85,
  },
  toggleOn: {
    color: Colors.accentBlue,
  },
  toggleOff: {
    color: Colors.inkMuted,
  },
  genBtn: {
    marginTop: Spacing[2],
    paddingVertical: Spacing[4],
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    borderWidth: Border.thin,
    borderColor: Colors.accentBlue,
    ...Radius.wobbly,
  },
  genBtnPressed: {
    opacity: 0.92,
  },
  genBtnLabel: {
    color: Colors.accentBlue,
  },
  out: {
    minHeight: 80,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    padding: Spacing[3],
    fontFamily: FontFamily.body,
    fontSize: 16,
    color: Colors.foreground,
    ...Radius.wobbly,
  },
  copyBtn: {
    paddingVertical: Spacing[3],
    alignItems: 'center',
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  copyBtnDisabled: {
    opacity: 0.45,
  },
  copyBtnPressed: {
    opacity: 0.88,
  },
  copyBtnLabel: {
    fontFamily: FontFamily.heading,
  },
});
