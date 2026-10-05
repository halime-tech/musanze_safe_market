
export type RootTabParamList = {
  Home: undefined;
  NewInspection: undefined;
  Records: undefined;
};

export type RecordsStackParamList = {
  RecordsList: undefined;
  InspectionDetails: { recordId: string };
};

export type NewInspectionStackParamList = {
  InspectionForm: undefined;
  Review: undefined;
};