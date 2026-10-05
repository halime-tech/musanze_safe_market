import { useInspection } from './InspectionContext';
import { InspectionRecord, ValidationErrors } from '../types/inspection';
import { validateForm, isFormValid } from '../utils/validation';

export function useInspections() {
  const { records, formData, addRecord, resetForm, updateFormField, setFormData } = useInspection();

  const validateCurrentForm = (): ValidationErrors => {
    return validateForm(formData);
  };

  const isCurrentFormValid = (): boolean => {
    return isFormValid(formData);
  };

  const saveInspection = (): InspectionRecord => {
    return addRecord(formData);
  };

  const getRecordCount = (): number => {
    return records.length;
  };

  const getRecentRecords = (limit: number = 5): InspectionRecord[] => {
    return records.slice(0, limit);
  };

  return {
    records,
    formData,
    updateFormField,
    setFormData,
    resetForm,
    validateCurrentForm,
    isCurrentFormValid,
    saveInspection,
    getRecordCount,
    getRecentRecords,
  };
}