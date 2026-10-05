import { InspectionRecord } from './inspection';

export type RootTabParamList = {
  Home: undefined;
  NewInspection: undefined;
  Records: undefined;
};

export type RecordsStackParamList = {
  RecordsList: undefined;
  InspectionDetails: { record: InspectionRecord };
};

export type NewInspectionStackParamList = {
  InspectionForm: undefined;
  Review: { formData: import('./inspection').InspectionFormData };
};