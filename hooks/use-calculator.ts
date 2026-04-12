import { applyBinaryOp } from '@/lib/calculator/binary-op';
import { trimCalculatorDisplay } from '@/lib/calculator/format-display';
import type { BinaryOp } from '@/types/calculator';
import { useCallback, useState } from 'react';

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<BinaryOp | null>(null);
  const [fresh, setFresh] = useState(true);

  const fold = useCallback((acc: number, op: BinaryOp, cur: number) => {
    const r = applyBinaryOp(acc, cur, op);
    if (!Number.isFinite(r)) {
      setDisplay('Error');
      setStored(null);
      setPendingOp(null);
      setFresh(true);
      return;
    }
    const s = trimCalculatorDisplay(String(r));
    setDisplay(s);
    setStored(parseFloat(s));
  }, []);

  const onOp = useCallback(
    (op: BinaryOp) => {
      if (display === 'Error') return;
      const cur = parseFloat(display.replace(',', '.'));
      if (stored !== null && pendingOp !== null && !fresh) {
        fold(stored, pendingOp, cur);
        setPendingOp(op);
        setFresh(true);
        return;
      }
      setStored(cur);
      setPendingOp(op);
      setFresh(true);
    },
    [display, stored, pendingOp, fresh, fold]
  );

  const onEquals = useCallback(() => {
    if (display === 'Error') return;
    if (stored === null || pendingOp === null) return;
    const cur = parseFloat(display.replace(',', '.'));
    fold(stored, pendingOp, cur);
    setPendingOp(null);
    setFresh(true);
  }, [display, stored, pendingOp, fold]);

  const onKey = useCallback(
    (key: string) => {
      if (display === 'Error') {
        if (key === 'C') {
          setDisplay('0');
          setStored(null);
          setPendingOp(null);
          setFresh(true);
        }
        return;
      }

      if (key === 'C') {
        setDisplay('0');
        setStored(null);
        setPendingOp(null);
        setFresh(true);
        return;
      }

      if (key === '⌫') {
        setDisplay((d) => (d.length <= 1 ? '0' : d.slice(0, -1)));
        setFresh(false);
        return;
      }

      if (['+', '-', '*', '/'].includes(key)) {
        onOp(key as BinaryOp);
        return;
      }

      if (key === '=') {
        onEquals();
        return;
      }

      if (key === '%') {
        setDisplay((d) => {
          const v = parseFloat(d.replace(',', '.')) / 100;
          return trimCalculatorDisplay(String(v));
        });
        setFresh(true);
        return;
      }

      if (key === '.') {
        if (fresh) {
          setDisplay('0.');
          setFresh(false);
          return;
        }
        setDisplay((d) => (!d.includes('.') ? d + '.' : d));
        return;
      }

      if (/^\d$/.test(key)) {
        if (fresh) {
          setDisplay(key);
          setFresh(false);
        } else {
          setDisplay((d) => (d === '0' ? key : d + key));
        }
      }
    },
    [display, fresh, onOp, onEquals]
  );

  return { display, onKey };
}
