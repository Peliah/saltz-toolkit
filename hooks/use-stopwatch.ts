import type { Lap } from '@/types/timer';
import { useCallback, useEffect, useRef, useState } from 'react';

const TICK_MS = 50;

export function useStopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);

  const startedAtRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);
  const latestElapsedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    latestElapsedRef.current = elapsedMs;
  }, [elapsedMs]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    startedAtRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      if (startedAtRef.current === null) return;
      const next = accumulatedRef.current + (Date.now() - startedAtRef.current);
      latestElapsedRef.current = next;
      setElapsedMs(next);
    }, TICK_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const start = useCallback(() => {
    startedAtRef.current = Date.now();
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (startedAtRef.current !== null) {
      accumulatedRef.current += Date.now() - startedAtRef.current;
    }
    startedAtRef.current = null;
    setRunning(false);
    setElapsedMs(accumulatedRef.current);
    latestElapsedRef.current = accumulatedRef.current;
  }, []);

  const reset = useCallback(() => {
    accumulatedRef.current = 0;
    startedAtRef.current = null;
    setRunning(false);
    setElapsedMs(0);
    latestElapsedRef.current = 0;
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    const at = latestElapsedRef.current;
    setLaps((prev) => [
      ...prev,
      { index: prev.length + 1, elapsedMs: at },
    ]);
  }, []);

  return {
    running,
    elapsedMs,
    laps,
    start,
    pause,
    reset,
    lap,
  };
}
