import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InspectionRecord, InspectionFormData, INITIAL_FORM_DATA } from '../types/inspection';
import { generateId } from '../utils/formatters';
import { APP_CONFIG } from '../config/appConfig';

interface InspectionContextType {
  records: InspectionRecord[];
  formData: InspectionFormData;
  setFormData: (data: InspectionFormData) => void;
  updateFormField: <K extends keyof InspectionFormData>(
    field: K,
    value: InspectionFormData[K]
  ) => void;
  resetForm: () => void;
  addRecord: (data: InspectionFormData) => InspectionRecord;
  getRecordById: (id: string) => InspectionRecord | undefined;
}

const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

interface InspectionProviderProps {
  children: ReactNode;
}

export function InspectionProvider({ children }: InspectionProviderProps) {
  const [records, setRecords] = useState<InspectionRecord[]>([]);
  const [formData, setFormDataState] = useState<InspectionFormData>(INITIAL_FORM_DATA);

  const setFormData = (data: InspectionFormData) => {
    setFormDataState(data);
  };

  const updateFormField = <K extends keyof InspectionFormData>(
    field: K,
    value: InspectionFormData[K]
  ) => {
    setFormDataState((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormDataState(INITIAL_FORM_DATA);
  };

  const addRecord = (data: InspectionFormData): InspectionRecord => {
    const newRecord: InspectionRecord = {
      ...data,
      id: generateId(),
      timestamp: new Date().toISOString(),
      groupCode: APP_CONFIG.groupCode,
    };
    setRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const getRecordById = (id: string): InspectionRecord | undefined => {
    return records.find((record) => record.id === id);
  };

  return (
    <InspectionContext.Provider
      value={{
        records,
        formData,
        setFormData,
        updateFormField,
        resetForm,
        addRecord,
        getRecordById,
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
}

export function useInspection(): InspectionContextType {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
}