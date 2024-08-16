const patientFilterableFields: string[] = [
  'searchTerm',
  'userId',
  'emergencyContactNumber',
];

const patientSearchableFields: string[] = ['address', 'emergencyContactNumber'];

const patientRelationalFields: string[] = ['userId'];

const patientRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};

export const PatientConstant = {
  patientFilterableFields,
  patientSearchableFields,
  patientRelationalFields,
  patientRelationalFieldsMapper,
};
