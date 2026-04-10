/**
 * Mini-apps and utilities planned for future releases (shown on Home).
 */
export type PlannedTool = {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
};

export const PLANNED_TOOLS: readonly PlannedTool[] = [
  {
    id: 'tip',
    title: 'Tip calculator',
    subtitle: 'Split checks and rounding',
    iconName: 'restaurant-outline',
  },
  {
    id: 'timer',
    title: 'Timer & stopwatch',
    subtitle: 'Quick countdowns',
    iconName: 'timer-outline',
  },
  {
    id: 'qr',
    title: 'QR tools',
    subtitle: 'Scan and share links',
    iconName: 'qr-code-outline',
  },
  {
    id: 'password',
    title: 'Password generator',
    subtitle: 'Length, symbols, copy',
    iconName: 'key-outline',
  },
  {
    id: 'clipboard',
    title: 'Clipboard history',
    subtitle: 'Recent copies',
    iconName: 'clipboard-outline',
  },
] as const;
