import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const TICK_MS = 1000;
const MAX_MINUTES = 599;

export function useCountdownTimer() {
  const [minutesInput, setMinutesInput] = useState('3');
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running) {
      clearTick();
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, TICK_MS);
    return clearTick;
  }, [running, clearTick]);

  const parsedMinutes = useMemo(() => {
    const m = Math.max(0, Math.min(MAX_MINUTES, parseInt(minutesInput || '0', 10) || 0));
    return m;
  }, [minutesInput]);

  const displaySeconds = useMemo(() => {
    if (running || remainingSeconds > 0) return remainingSeconds;
    return parsedMinutes * 60;
  }, [running, remainingSeconds, parsedMinutes]);

  const startFromInputs = useCallback(() => {
    const total = parsedMinutes * 60;
    if (total <= 0) return;
    setRemainingSeconds(total);
    setRunning(true);
  }, [parsedMinutes]);

  const pause = useCallback(() => setRunning(false), []);

  const resume = useCallback(() => setRunning(true), []);

  const reset = useCallback(() => {
    setRunning(false);
    setRemainingSeconds(0);
  }, []);

  const applyPreset = useCallback((minutes: number) => {
    setMinutesInput(String(minutes));
    setRunning(false);
    setRemainingSeconds(0);
  }, []);

  const primaryAction = useCallback(() => {
    if (running) pause();
    else if (remainingSeconds > 0) resume();
    else startFromInputs();
  }, [running, remainingSeconds, pause, resume, startFromInputs]);

  const primaryLabel = running
    ? 'Pause'
    : remainingSeconds > 0
      ? 'Resume'
      : 'Start';

  return {
    minutesInput,
    setMinutesInput,
    running,
    displaySeconds,
    primaryLabel,
    primaryAction,
    pause,
    reset,
    applyPreset,
  };
}
