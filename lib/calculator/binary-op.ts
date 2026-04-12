import type { BinaryOp } from '@/types/calculator';

export function applyBinaryOp(a: number, b: number, op: BinaryOp): number {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? NaN : a / b;
  }
}
