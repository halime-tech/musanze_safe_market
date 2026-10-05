export const colors = {
  primary: '#1B5E20',
  primaryLight: '#4CAF50',
  primaryDark: '#0D3B0F',
  secondary: '#FF6F00',
  secondaryLight: '#FFA040',
  
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#EEEEEE',
  
  text: '#212121',
  textSecondary: '#757575',
  textLight: '#FFFFFF',
  
  border: '#E0E0E0',
  divider: '#BDBDBD',
  
  error: '#D32F2F',
  errorLight: '#FFEBEE',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  success: '#388E3C',
  successLight: '#E8F5E9',
  info: '#1976D2',
  infoLight: '#E3F2FD',
  
  statusOpen: '#388E3C',
  statusClosed: '#D32F2F',
  statusMaintenance: '#FF9800',
  
  priorityLow: '#4CAF50',
  priorityMedium: '#FF9800',
  priorityHigh: '#D32F2F',
  
  overlay: 'rgba(0, 0, 0, 0.5)',
  disabled: '#BDBDBD',
} as const;

export type ColorKey = keyof typeof colors;