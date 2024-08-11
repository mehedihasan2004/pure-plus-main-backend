type Meta = {
  page: number;
  limit: number;
  total: number;
};

type GenericResponse<T> = {
  meta: Meta;
  data: T;
};

type GenericErrorMessage = {
  path: string | number;
  message: string;
};

type GenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
};

export { Meta, GenericResponse, GenericErrorMessage, GenericErrorResponse };
