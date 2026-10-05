export const CATEGORIES = [
  'Fresh Produce',
  'Meat & Poultry',
  'Grains & Cereals',
  'Textiles',
  'Electronics',
  'Household Items',
  'Beverages',
  'Other',
] as const;

export const RISK_LEVELS = [
  { value: 'low', label: 'Low Risk', description: 'Minimal health or safety concern' },
  { value: 'medium', label: 'Medium Risk', description: 'Moderate concern requiring attention' },
  { value: 'high', label: 'High Risk', description: 'Immediate action required' },
] as const;

export const STALL_CODE_PREFIX = 'MUS';
export const STALL_CODE_REGEX = /^MUS-\d{3}$/;
export const PHONE_REGEX = /^07[2389]\d{7}$/;