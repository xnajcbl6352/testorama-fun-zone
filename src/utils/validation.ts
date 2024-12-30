import { StudentCreateInput, ValidationError } from '@/types/student';

export const validateStudent = (data: Partial<StudentCreateInput>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const requiredFields: (keyof StudentCreateInput)[] = [
    'first_name',
    'last_name',
    'dni',
    'birth_date',
    'registration_date',
    'status'
  ];

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push({
        field,
        message: `El campo ${field} es requerido`
      });
    }
  });

  return errors;
};
