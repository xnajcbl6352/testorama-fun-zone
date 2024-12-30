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