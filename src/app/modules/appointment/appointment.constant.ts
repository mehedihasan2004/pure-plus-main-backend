const appointmentFilterableFields: string[] = [
  'searchTerm',
  'department',
  'date',
  'timeSlot',
  'status',
  'paymentStatus',
  'followUpDate',
  'doctorId',
  'patientId',
  'createdAt',
  'updatedAt',
];

const appointmentSearchableFields: string[] = [
  'date',
  'prescription',
  'followUpDate',
];

const appointmentRelationalFields: string[] = ['doctorId', 'patientId'];

const appointmentRelationalFieldsMapper: { [key: string]: string } = {
  doctorId: 'doctor',
  patientId: 'patient',
};

export const AppointmentConstant = {
  appointmentFilterableFields,
  appointmentSearchableFields,
  appointmentRelationalFields,
  appointmentRelationalFieldsMapper,
};
