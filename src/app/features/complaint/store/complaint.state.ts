/**
 * Enums pour les statuts et priorités
 */
export enum ComplaintStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED'
}

export enum ComplaintPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

/**
 * Interface représentant une réclamation
 */
export interface Complaint {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  orderReference?: string;
  createdAt: Date;
  updatedAt?: Date;
  resolvedAt?: Date;
}

/**
 * DTO pour créer une réclamation
 */
export interface CreateComplaintDto {
  customerName: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  priority: ComplaintPriority;
  orderReference?: string;
}

/**
 * État de la feature Complaint
 */
export interface ComplaintState {
  complaints: Complaint[];
  loading: boolean;
  error: string | null;
  selectedComplaint: Complaint | null;
  filters: {
    status: string | null;
    priority: string | null;
    searchTerm: string;
  };
}

/**
 * État initial
 */
export const initialComplaintState: ComplaintState = {
  complaints: [],
  loading: false,
  error: null,
  selectedComplaint: null,
  filters: {
    status: null,
    priority: null,
    searchTerm: ''
  }
};
