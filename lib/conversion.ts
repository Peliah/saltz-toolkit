/**
 * Pure conversion helpers — no React. Currency uses rates from Frankfurter API shape.
 */

export type ConversionCategory = 'length' | 'weight' | 'temperature' | 'currency';

export type UnitDef = { id: string; label: string };

export const LENGTH_UNITS: UnitDef[] = [
  { id: 'm', label: 'Meters' },
  { id: 'km', label: 'Kilometers' },
  { id: 'cm', label: 'Centimeters' },
  { id: 'mm', label: 'Millimeters' },
  { id: 'mi', label: 'Miles' },
  { id: 'yd', label: 'Yards' },
  { id: 'ft', label: 'Feet' },
  { id: 'in', label: 'Inches' },
];

export const WEIGHT_UNITS: UnitDef[] = [
  { id: 'kg', label: 'Kilograms' },
  { id: 'g', label: 'Grams' },
  { id: 'lb', label: 'Pounds' },
  { id: 'oz', label: 'Ounces' },
];

export const TEMPERATURE_UNITS: UnitDef[] = [
  { id: 'C', label: 'Celsius' },
  { id: 'F', label: 'Fahrenheit' },
  { id: 'K', label: 'Kelvin' },
];

/** ISO 4217 — subset supported by Frankfurter */
export const CURRENCY_UNITS: UnitDef[] = [
  { id: 'USD', label: 'USD' },
  { id: 'EUR', label: 'EUR' },
  { id: 'GBP', label: 'GBP' },
  { id: 'JPY', label: 'JPY' },
  { id: 'CHF', label: 'CHF' },
  { id: 'CAD', label: 'CAD' },
  { id: 'AUD', label: 'AUD' },
  { id: 'INR', label: 'INR' },
];

const LENGTH_TO_METERS: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
};

const WEIGHT_TO_KG: Record<string, number> = {
  kg: 1,
  g: 0.001,
  lb: 0.45359237,
  oz: 0.028349523125,
};

function convertLength(value: number, from: string, to: string): number {
  const a = LENGTH_TO_METERS[from];
  const b = LENGTH_TO_METERS[to];
  if (a === undefined || b === undefined) {
    throw new Error(`Unknown length unit: ${from} or ${to}`);
  }
  const meters = value * a;
  return meters / b;
}

function convertWeight(value: number, from: string, to: string): number {
  const a = WEIGHT_TO_KG[from];
  const b = WEIGHT_TO_KG[to];
  if (a === undefined || b === undefined) {
    throw new Error(`Unknown weight unit: ${from} or ${to}`);
  }
  const kg = value * a;
  return kg / b;
}

function convertTemperature(value: number, from: string, to: string): number {
  let c: number;
  switch (from) {
    case 'C':
      c = value;
      break;
    case 'F':
      c = ((value - 32) * 5) / 9;
      break;
    case 'K':
      c = value - 273.15;
      break;
    default:
      throw new Error(`Unknown temperature from: ${from}`);
  }
  switch (to) {
    case 'C':
      return c;
    case 'F':
      return (c * 9) / 5 + 32;
    case 'K':
      return c + 273.15;
    default:
      throw new Error(`Unknown temperature to: ${to}`);
  }
}

export type FrankfurterLatest = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

/**
 * Converts using Frankfurter `latest` JSON: pivot currency is `base`.
 */
export function convertCurrency(
  value: number,
  from: string,
  to: string,
  latest: FrankfurterLatest
): number {
  if (from === to) return value;
  const { base, rates } = latest;

  const toBase = (amount: number, unit: string): number => {
    if (unit === base) return amount;
    const r = rates[unit];
    if (r === undefined) {
      throw new Error(`No rate for ${unit}`);
    }
    return amount / r;
  };

  const fromBase = (amountBase: number, unit: string): number => {
    if (unit === base) return amountBase;
    const r = rates[unit];
    if (r === undefined) {
      throw new Error(`No rate for ${unit}`);
    }
    return amountBase * r;
  };

  const inBase = toBase(value, from);
  return fromBase(inBase, to);
}

export function convertNumber(
  value: number,
  from: string,
  to: string,
  category: ConversionCategory,
  currencyLatest?: FrankfurterLatest | null
): number {
  if (from === to) return value;
  switch (category) {
    case 'length':
      return convertLength(value, from, to);
    case 'weight':
      return convertWeight(value, from, to);
    case 'temperature':
      return convertTemperature(value, from, to);
    case 'currency':
      if (!currencyLatest) {
        throw new Error('Currency rates not loaded');
      }
      return convertCurrency(value, from, to, currencyLatest);
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export function getUnitsForCategory(category: ConversionCategory): UnitDef[] {
  switch (category) {
    case 'length':
      return LENGTH_UNITS;
    case 'weight':
      return WEIGHT_UNITS;
    case 'temperature':
      return TEMPERATURE_UNITS;
    case 'currency':
      return CURRENCY_UNITS;
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export async function fetchFrankfurterLatest(): Promise<FrankfurterLatest> {
  const res = await fetch('https://api.frankfurter.app/v1/latest');
  if (!res.ok) {
    throw new Error(`Rates request failed: ${res.status}`);
  }
  const data = (await res.json()) as FrankfurterLatest;
  if (typeof data.base !== 'string' || typeof data.rates !== 'object') {
    throw new Error('Unexpected rates response');
  }
  return data;
}
