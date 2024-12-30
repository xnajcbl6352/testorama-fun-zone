import * as z from "zod";

export const studentSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  dni: z.string().regex(/^[0-9]{8}[A-Z]$/, "DNI inválido (formato: 12345678A)"),
  birth_date: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  address: z.string().optional(),
  gdpr_consent: z.boolean().default(false),
});

export type StudentFormValues = z.infer<typeof studentSchema>;

// Type that matches the database schema
export type StudentRecord = {
  id?: string;
  first_name: string;
  last_name: string;
  dni: string;
  birth_date: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  gdpr_consent?: boolean | null;
  registration_date?: string | null;
  status?: string;
  created_at?: string | null;
  updated_at?: string | null;
};