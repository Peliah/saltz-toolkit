import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

export type ToolStatus = 'live' | 'soon';

export type HubVariant = 'featured' | 'compact';

export type IonIconName = ComponentProps<typeof Ionicons>['name'];

export type ToolDef = {
  id: string;
  title: string;
  subtitle: string;
  iconName: IonIconName;
  href: `/${string}`;
  status: ToolStatus;
  hubVariant: HubVariant;
};

export const TOOLS = [
  {
    id: 'converter',
    title: 'Converter',
    subtitle: 'Units & live currency',
    iconName: 'swap-horizontal-outline',
    href: '/tools/converter',
    status: 'live',
    hubVariant: 'featured',
  },
  {
    id: 'timer',
    title: 'Timer & stopwatch',
    subtitle: 'Countdown & laps',
    iconName: 'timer-outline',
    href: '/tools/timer',
    status: 'live',
    hubVariant: 'featured',
  },
  {
    id: 'qr',
    title: 'QR scan',
    subtitle: 'Point, scan, open links',
    iconName: 'qr-code-outline',
    href: '/tools/qr',
    status: 'live',
    hubVariant: 'compact',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    subtitle: 'Quick arithmetic',
    iconName: 'calculator-outline',
    href: '/tools/calculator',
    status: 'live',
    hubVariant: 'compact',
  },
  {
    id: 'password',
    title: 'Passwords',
    subtitle: 'Strong random strings',
    iconName: 'key-outline',
    href: '/tools/password',
    status: 'live',
    hubVariant: 'compact',
  },
  {
    id: 'notes',
    title: 'Notes',
    subtitle: 'Jots saved on device',
    iconName: 'document-text-outline',
    href: '/tools/notes',
    status: 'live',
    hubVariant: 'compact',
  },
] as const satisfies readonly ToolDef[];

export type ToolId = (typeof TOOLS)[number]['id'];

export function liveTools(): readonly ToolDef[] {
  return TOOLS.filter((t) => t.status === 'live');
}
