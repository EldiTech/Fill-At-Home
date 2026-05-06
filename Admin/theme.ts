import { AdminModuleKey } from './types';

export const ADMIN_COLORS = {
  background: '#F5F7FB',
  surface: '#FFFFFF',
  ink: '#151515',
  softInk: '#4E4A45',
  muted: '#7E756D',
  border: 'rgba(21, 21, 21, 0.12)',
  shadow: 'rgba(18, 18, 18, 0.08)',
  orange: '#F4A23A',
  teal: '#2BB9A6',
  red: '#F24B3D',
  blue: '#3568E8',
  green: '#1FAF76',
  amber: '#D9912E',
};

export const ADMIN_MODULE_ORDER: AdminModuleKey[] = [
  'dashboard',
  'users',
  'core',
  'reports',
  'notifications',
  'settings',
];

export const ADMIN_MODULE_LABELS: Record<AdminModuleKey, string> = {
  dashboard: 'Dashboard',
  users: 'Users',
  core: 'Core Modules',
  reports: 'Reports',
  notifications: 'Notifications',
  settings: 'Settings & Roles',
};

