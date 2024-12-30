export type StudentStatus = 'active' | 'inactive';

export interface StudentRecord {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  birth_date: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  registration_date: string;
  status: StudentStatus;
  gdpr_consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudentCreateInput {
  first_name: string;
  last_name: string;
  dni: string;
  birth_date: string;
  registration_date: string;
  status: StudentStatus;
  phone?: string;
  email?: string;
  address?: string;
  gdpr_consent?: boolean;
}

// Tipo para validación de datos
export type ValidationError = {
  field: string;
  message: string;
};

// Utilidades para validación
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

  // Validación de formato DNI
  if (data.dni && !/^\d{8}[A-Z]$/.test(data.dni)) {
    errors.push({
      field: 'dni',
      message: 'El DNI debe tener 8 números seguidos de una letra mayúscula'
    });
  }

  // Validación de email
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({
      field: 'email',
      message: 'El formato del email no es válido'
    });
  }

  return errors;
};
