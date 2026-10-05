import { MarketZone } from '../types/market';

export const marketZones: MarketZone[] = [
  {
    id: '1',
    name: 'Zone A - Fresh Produce',
    category: 'Vegetables & Fruits',
    status: 'open',
    priority: 'high',
    imagePlaceholder: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Zone+A',
  },
  {
    id: '2',
    name: 'Zone B - Meat & Poultry',
    category: 'Butchery',
    status: 'open',
    priority: 'high',
    imagePlaceholder: 'https://via.placeholder.com/300x200/D32F2F/FFFFFF?text=Zone+B',
  },
  {
    id: '3',
    name: 'Zone C - Grains & Cereals',
    category: 'Dry Goods',
    status: 'open',
    priority: 'medium',
    imagePlaceholder: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Zone+C',
  },
  {
    id: '4',
    name: 'Zone D - Textiles',
    category: 'Clothing & Fabrics',
    status: 'closed',
    priority: 'low',
    imagePlaceholder: 'https://via.placeholder.com/300x200/1976D2/FFFFFF?text=Zone+D',
  },
  {
    id: '5',
    name: 'Zone E - Electronics',
    category: 'Devices & Accessories',
    status: 'maintenance',
    priority: 'medium',
    imagePlaceholder: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Zone+E',
  },
  {
    id: '6',
    name: 'Zone F - Household Items',
    category: 'Kitchenware & Tools',
    status: 'open',
    priority: 'low',
    imagePlaceholder: 'https://via.placeholder.com/300x200/607D8B/FFFFFF?text=Zone+F',
  },
];