const doctorFilterableFields: string[] = [
  'searchTerm',
  'userId',
  'department',
  'rank',
];

const doctorSearchableFields: string[] = ['qualifications', 'description'];

const doctorRelationalFields: string[] = ['userId'];

const doctorRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};

export const DoctorConstant = {
  doctorFilterableFields,
  doctorSearchableFields,
  doctorRelationalFields,
  doctorRelationalFieldsMapper,
};
