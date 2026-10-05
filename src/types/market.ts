export type MarketStatus = 'open' | 'closed' | 'maintenance';
export type InspectionPriority = 'low' | 'medium' | 'high';

export interface MarketZone {
  id: string;
  name: string;
  category: string;
  status: MarketStatus;
  priority: InspectionPriority;
  imagePlaceholder: string;
}
