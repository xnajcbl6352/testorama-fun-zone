import * as z from "zod";

// Define the base schema for student form values
export const studentSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  dni: z.string().regex(/^[0-9]{8}[A-Z]$/, "DNI inválido (formato: 12345678A)"),
  birth_date: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  email: z.string().email("Email inválido").optional().nullable(),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  gdpr_consent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar el tratamiento de datos personales",
  }),
});

// Export the type for form values
export type StudentFormValues = z.infer<typeof studentSchema>;

// Define the status type
export const StudentStatus = {
  active: "active",
  inactive: "inactive",
} as const;

export type StudentStatus = typeof StudentStatus[keyof typeof StudentStatus];

// Define the complete student record type including database fields
export interface StudentRecord extends StudentFormValues {
  id: string;
  registration_date: string;
  status: StudentStatus;
  created_at: string | null;
  updated_at: string | null;
}