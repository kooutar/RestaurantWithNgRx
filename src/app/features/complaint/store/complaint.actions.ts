import { createAction, props } from '@ngrx/store';
import { Complaint, CreateComplaintDto, ComplaintStatus } from './complaint.state';

/**
 * Actions pour charger les réclamations
 */
export const loadComplaints = createAction('[Complaint] Load Complaints');

export const loadComplaintsSuccess = createAction(
  '[Complaint] Load Complaints Success',
  props<{ complaints: Complaint[] }>()
);

export const loadComplaintsFailure = createAction(
  '[Complaint] Load Complaints Failure',
  props<{ error: string }>()
);

/**
 * Actions pour créer une réclamation
 */
export const createComplaint = createAction(
  '[Complaint] Create Complaint',
  props<{ complaint: CreateComplaintDto }>()
);

export const createComplaintSuccess = createAction(
  '[Complaint] Create Complaint Success',
  props<{ complaint: Complaint }>()
);

export const createComplaintFailure = createAction(
  '[Complaint] Create Complaint Failure',
  props<{ error: string }>()
);

/**
 * Actions pour mettre à jour le statut
 */
export const updateComplaintStatus = createAction(
  '[Complaint] Update Complaint Status',
  props<{ id: string; status: ComplaintStatus }>()
);

export const updateComplaintStatusSuccess = createAction(
  '[Complaint] Update Complaint Status Success',
  props<{ complaint: Complaint }>()
);

/**
 * Actions pour supprimer une réclamation
 */
export const deleteComplaint = createAction(
  '[Complaint] Delete Complaint',
  props<{ id: string }>()
);


export const deleteComplaintSuccess = createAction(
  '[Complaint] Delete Complaint Success',
  props<{ id: string }>()
);


export const deleteComplaintFailure = createAction(
  '[Complaint] Delete Complaint Failure',
  props<{ error: string }>()
);


/**
 * Actions pour sélectionner une réclamation
 */
export const selectComplaint = createAction(
  '[Complaint] Select Complaint',
  props<{ complaint: Complaint | null }>()
);

/**
 * Actions pour filtrer
 */
export const setStatusFilter = createAction(
  '[Complaint] Set Status Filter',
  props<{ status: string | null }>()
);

export const setPriorityFilter = createAction(
  '[Complaint] Set Priority Filter',
  props<{ priority: string | null }>()
);

export const setSearchTerm = createAction(
  '[Complaint] Set Search Term',
  props<{ searchTerm: string }>()
);

export const clearFilters = createAction('[Complaint] Clear Filters');

/**
 * Action pour persister dans LocalStorage
 */
export const persistComplaints = createAction('[Complaint] Persist Complaints');
