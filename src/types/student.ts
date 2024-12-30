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
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  gdpr_consent?: boolean;
}

// Tipo para la tabla de Supabase
export interface Database {
  public: {
    Tables: {
      students: {
        Row: StudentRecord;
        Insert: StudentCreateInput;
        Update: Partial<StudentCreateInput>;
      };
    };
  };
}