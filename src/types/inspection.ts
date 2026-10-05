// src/types/inspection.ts

export type RiskLevel = 'low' | 'medium' | 'high';

export interface InspectionFormData {
  vendorAlias: string;
  stallCode: string;
  category: string;
  contactNumber: string;
  riskLevel: RiskLevel;
  consent: boolean;
  imageUri: string | null;
}

export interface InspectionRecord extends InspectionFormData {
  id: string;
  timestamp: string;
  groupCode: string;
}

export type ValidationErrors = Partial<Record<keyof InspectionFormData, string>>;

export const INITIAL_FORM_DATA: InspectionFormData = {
  vendorAlias: '',
  stallCode: '',
  category: '',
  contactNumber: '',
  riskLevel: 'low',
  consent: false,
  imageUri: null,
};
