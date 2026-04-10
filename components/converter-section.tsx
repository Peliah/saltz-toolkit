import { SketchInput } from '@/components/sketch/sketch-input';
import { SketchText } from '@/components/sketch/sketch-text';
import { Border, Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import {
  type ConversionCategory,
  type FrankfurterLatest,
  type UnitDef,
  convertNumber,
  fetchFrankfurterLatest,
  getUnitsForCategory,
} from '@/lib/conversion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

const CATEGORIES: { id: ConversionCategory; label: string }[] = [
  { id: 'length', label: 'Length' },
  { id: 'weight', label: 'Weight' },
  { id: 'temperature', label: 'Temperature' },
  { id: 'currency', label: 'Currency' },
];

function formatResult(value: number, category: ConversionCategory): string {
  if (!Number.isFinite(value)) return '—';
  if (category === 'currency') return value.toFixed(2);
  if (category === 'temperature') return value.toFixed(2);
  const abs = Math.abs(value);
  if (abs >= 10000 || (abs > 0 && abs < 0.0001)) {
    return value.toExponential(4);
  }
  return Number(value.toPrecision(6)).toString();
}

export function ConverterSection() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const units = useMemo(() => getUnitsForCategory(category), [category]);

  const [fromId, setFromId] = useState(units[0]?.id ?? 'm');
  const [toId, setToId] = useState(units[1]?.id ?? 'km');

  useEffect(() => {
    const next = getUnitsForCategory(category);
    setFromId(next[0]?.id ?? 'm');
    setToId(next[1]?.id ?? next[0]?.id ?? 'm');
  }, [category]);

  const [input, setInput] = useState('1');
  const [rates, setRates] = useState<FrankfurterLatest | null>(null);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);

  const loadRates = useCallback(async () => {
    setRatesLoading(true);
    setRatesError(null);
    try {
      const data = await fetchFrankfurterLatest();
      setRates(data);
    } catch (e) {
      setRatesError(e instanceof Error ? e.message : 'Could not load rates');
      setRates(null);
    } finally {
      setRatesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (category === 'currency') {
      void loadRates();
    }
  }, [category, loadRates]);

  const numericValue = useMemo(() => {
    const t = input.trim().replace(',', '.');
    if (t === '' || t === '-' || t === '.') return null;
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
  }, [input]);

  const output = useMemo(() => {
    if (numericValue === null) return null;
    if (category === 'currency' && !rates) return null;
    try {
      return convertNumber(
        numericValue,
        fromId,
        toId,
        category,
        category === 'currency' ? rates : undefined
      );
    } catch {
      return null;
    }
  }, [numericValue, fromId, toId, category, rates]);

  const [picker, setPicker] = useState<'from' | 'to' | null>(null);

  const pickUnit = (id: string) => {
    if (picker === 'from') setFromId(id);
    if (picker === 'to') setToId(id);
    setPicker(null);
  };

  const openPicker = (which: 'from' | 'to') => {
    setPicker(which);
  };

  return (
    <View style={styles.wrap}>
      <SketchText variant="heading" size="2xl" style={styles.sectionTitle}>
        Saltz Toolkit
      </SketchText>

      <View style={styles.categoryRow}>
        {CATEGORIES.map((c) => {
          const active = category === c.id;
          return (
            <Pressable
              key={c.id}
              onPress={() => setCategory(c.id)}
              style={({ pressed }) => [
                styles.chip,
                active && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
            >
              <SketchText
                variant="body"
                size="sm"
                style={active ? styles.chipLabelActive : undefined}
              >
                {c.label}
              </SketchText>
            </Pressable>
          );
        })}
      </View>

      <SketchInput
        label="Amount"
        value={input}
        onChangeText={setInput}
        placeholder="0"
        keyboardType="decimal-pad"
      />

      <View style={styles.unitRow}>
        <View style={styles.unitCol}>
          <SketchText variant="body" size="sm" style={styles.unitLabel}>
            From
          </SketchText>
          <Pressable
            onPress={() => openPicker('from')}
            style={({ pressed }) => [styles.unitBtn, pressed && styles.unitBtnPressed]}
          >
            <SketchText variant="body" size="base">
              {units.find((u) => u.id === fromId)?.label ?? fromId}
            </SketchText>
          </Pressable>
        </View>
        <View style={styles.unitCol}>
          <SketchText variant="body" size="sm" style={styles.unitLabel}>
            To
          </SketchText>
          <Pressable
            onPress={() => openPicker('to')}
            style={({ pressed }) => [styles.unitBtn, pressed && styles.unitBtnPressed]}
          >
            <SketchText variant="body" size="base">
              {units.find((u) => u.id === toId)?.label ?? toId}
            </SketchText>
          </Pressable>
        </View>
      </View>

      <View style={styles.resultBox}>
        <SketchText variant="body" size="sm" muted>
          Result
        </SketchText>
        {category === 'currency' && ratesLoading && (
          <ActivityIndicator color={Colors.accentBlue} style={styles.loader} />
        )}
        {category === 'currency' && ratesError && (
          <SketchText variant="body" size="sm" style={styles.err}>
            {ratesError}
          </SketchText>
        )}
        <SketchText variant="heading" size="3xl" style={styles.resultNum}>
          {output !== null && (category !== 'currency' || rates)
            ? formatResult(output, category)
            : '—'}
        </SketchText>
        {category === 'currency' && rates && (
          <SketchText variant="body" size="xs" muted style={styles.rateMeta}>
            Rates: {rates.date} · base {rates.base}
          </SketchText>
        )}
      </View>

      <Modal
        visible={picker !== null}
        animationType="fade"
        transparent
        onRequestClose={() => setPicker(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setPicker(null)}>
          <View style={styles.modalSheet} onStartShouldSetResponder={() => true}>
            <SketchText variant="heading" size="lg" style={styles.modalTitle}>
              Choose unit
            </SketchText>
            <FlatList<UnitDef>
              data={units}
              keyExtractor={(u) => u.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalRow}
                  onPress={() => pickUnit(item.id)}
                >
                  <SketchText variant="body" size="base">
                    {item.label}
                  </SketchText>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing[4],
  },
  sectionTitle: {
    marginBottom: Spacing[1],
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  chip: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  chipActive: {
    borderWidth: Border.default,
    borderColor: Colors.accentBlue,
    backgroundColor: `${Colors.accentBlue}14`,
  },
  chipPressed: {
    opacity: 0.9,
  },
  chipLabelActive: {
    fontFamily: FontFamily.heading,
    color: Colors.accentBlue,
  },
  unitRow: {
    flexDirection: 'row',
    gap: Spacing[4],
  },
  unitCol: {
    flex: 1,
    gap: Spacing[1],
  },
  unitLabel: {
    marginBottom: 2,
  },
  unitBtn: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: Spacing[3],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
  },
  unitBtnPressed: {
    backgroundColor: Colors.muted,
  },
  resultBox: {
    marginTop: Spacing[2],
    padding: Spacing[4],
    borderWidth: Border.thin,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Radius.wobbly,
    gap: Spacing[1],
  },
  resultNum: {
    marginTop: Spacing[1],
  },
  rateMeta: {
    marginTop: Spacing[2],
  },
  err: {
    color: Colors.accent,
  },
  loader: {
    marginVertical: Spacing[2],
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: Colors.foreground + '55',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.background,
    borderTopWidth: Border.default,
    borderColor: Colors.border,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 14,
    padding: Spacing[4],
    maxHeight: '70%',
  },
  modalTitle: {
    marginBottom: Spacing[3],
  },
  modalRow: {
    paddingVertical: Spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: Colors.muted,
  },
});
