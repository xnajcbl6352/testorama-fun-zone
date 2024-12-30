export type RecordStatus = 'pending' | 'in_progress' | 'completed';

export interface Record {
  id: string;
  student_id: string;
  record_number: string;
  status: RecordStatus;
  document_url: string | null;
  dgt_submission_date: string | null;
  dgt_response_date: string | null;
  dgt_response_status: string | null;
  dgt_comments: string | null;
  created_at: string;
  updated_at: string;
  student?: {
    first_name: string;
    last_name: string;
    dni: string;
  };
}

export interface RecordCreateInput {
  student_id: string;
  record_number: string;
  status?: RecordStatus;
  document_url?: string | null;
}

export interface RecordUpdateInput {
  status?: RecordStatus;
  document_url?: string | null;
  dgt_submission_date?: string | null;
  dgt_response_date?: string | null;
  dgt_response_status?: string | null;
  dgt_comments?: string | null;
}