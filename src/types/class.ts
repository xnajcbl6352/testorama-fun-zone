export interface Teacher {
  first_name: string;
  last_name: string;
}

export interface Student {
  first_name: string;
  last_name: string;
}

export interface Vehicle {
  plate_number: string;
  brand: string;
  model: string;
}

export interface Class {
  id: string;
  type: "theoretical" | "practical" | "exam";
  teacher_id: string;
  student_id: string;
  vehicle_id?: string | null;
  date: string;
  start_time: string;
  end_time: string;
  status: "scheduled" | "completed" | "cancelled";
  attendance_marked: boolean;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  teacher: Teacher | null;
  student: Student | null;
  vehicle: Vehicle | null;
  payment_status?: "pending" | "paid" | "overdue" | null;
  route_plan?: Record<string, any> | null;
  cancellation_reason?: string | null;
  cancelled_at?: string | null;
}