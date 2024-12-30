import { z } from "zod";

// Define the status type
export const StudentStatus = {
  active: "active",
  inactive: "inactive",
} as const;

export type StudentStatus = typeof StudentStatus[keyof typeof StudentStatus];

// Base schema for student form values
export const studentSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  dni: z.string().regex(/^[0-9]{8}[A-Z]$/, "DNI inválido (formato: 12345678A)"),
  birth_date: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos").nullable().optional(),
  email: z.string().email("Email inválido").nullable().optional(),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres").nullable().optional(),
  gdpr_consent: z.boolean().default(false),
});

// Export the type for form values
export type StudentFormValues = z.infer<typeof studentSchema>;

// Define the complete student record type including database fields
export interface StudentRecord extends Omit<StudentFormValues, 'birth_date'> {
  id: string;
  birth_date: string;
  registration_date: string;
  status: StudentStatus;
  created_at: string | null;
  updated_at: string | null;
}

// Type for creating a new student that matches Supabase schema
export interface StudentCreateInput {
  first_name: string;
  last_name: string;
  dni: string;
  birth_date: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  registration_date?: string;
  status?: string;
  gdpr_consent?: boolean;
}