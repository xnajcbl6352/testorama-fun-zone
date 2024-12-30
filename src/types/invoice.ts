export type PaymentStatus = 'pending' | 'paid' | 'overdue';
export type PaymentMethod = 'cash' | 'card' | 'transfer';

export interface Invoice {
    id: string;
    student_id: string;
    invoice_number: string;
    amount: number;
    status: PaymentStatus;
    due_date: string;
    created_at: string;
    updated_at: string;
    student?: {
        first_name: string;
        last_name: string;
        dni: string;
    };
}

export interface InvoiceCreateInput {
    student_id: string;
    amount: number;
    due_date: string;
}