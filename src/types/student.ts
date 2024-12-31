export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  status: string;
}

export enum StudentStatus {
  active = 'active',
  inactive = 'inactive'
}