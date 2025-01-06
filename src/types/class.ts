export interface Class {
  id: string;
  type: 'theoretical' | 'practical' | 'exam';
  teacher_id: string;
  student_id: string;
  vehicle_id?: string;
  location_id?: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  attendance_marked?: boolean;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  teacher?: {
    first_name: string;
    last_name: string;
  };
  student?: {
    first_name: string;
    last_name: string;
  };
  vehicle?: {
    plate_number: string;
    brand: string;
    model: string;
  };
  location?: {
    id: string;
    name: string;
  };
  payment_status?: string;
  route_plan?: Record<string, any>;
  cancellation_reason?: string;
  cancelled_at?: string;
}