import { InspectionFormData, ValidationErrors } from '../types/inspection';
import { STALL_CODE_REGEX, PHONE_REGEX } from '../data/constants';

export function validateForm(data: InspectionFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Vendor Alias validation
  if (!data.vendorAlias || data.vendorAlias.trim().length === 0) {
    errors.vendorAlias = 'Vendor alias is required';
  } else if (data.vendorAlias.trim().length < 2) {
    errors.vendorAlias = 'Vendor alias must be at least 2 characters';
  } else if (data.vendorAlias.trim().length > 50) {
    errors.vendorAlias = 'Vendor alias must not exceed 50 characters';
  }

  // Stall Code validation
  if (!data.stallCode || data.stallCode.trim().length === 0) {
    errors.stallCode = 'Stall code is required';
  } else if (!STALL_CODE_REGEX.test(data.stallCode.trim().toUpperCase())) {
    errors.stallCode = 'Format: MUS-XXX (e.g., MUS-001)';
  }

  // Category validation
  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  // Contact Number validation
  if (!data.contactNumber || data.contactNumber.trim().length === 0) {
    errors.contactNumber = 'Contact number is required';
  } else if (!PHONE_REGEX.test(data.contactNumber.trim())) {
    errors.contactNumber = 'Format: 07XXXXXXXX (e.g., 0788123456)';
  }

  // Risk Level validation
  if (!data.riskLevel) {
    errors.riskLevel = 'Risk level is required';
  }

  // Consent validation
  if (!data.consent) {
    errors.consent = 'Consent confirmation is required';
  }

  return errors;
}

export function isFormValid(data: InspectionFormData): boolean {
  const errors = validateForm(data);
  return Object.keys(errors).length === 0;
}