import { createReducer, on } from '@ngrx/store';
import { ComplaintState, initialComplaintState } from './complaint.state';
import * as ComplaintActions from './complaint.actions';

export const complaintReducer = createReducer(
  initialComplaintState,

  // Load complaints
  on(ComplaintActions.loadComplaints, (state): ComplaintState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ComplaintActions.loadComplaintsSuccess, (state, { complaints }): ComplaintState => ({
    ...state,
    complaints,
    loading: false,
    error: null
  })),

  on(ComplaintActions.loadComplaintsFailure, (state, { error }): ComplaintState => ({
    ...state,
    loading: false,
    error
  })),

  // Create complaint
  on(ComplaintActions.createComplaint, (state): ComplaintState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ComplaintActions.createComplaintSuccess, (state, { complaint }): ComplaintState => ({
    ...state,
    complaints: [...state.complaints, complaint],
    loading: false,
    error: null
  })),

  on(ComplaintActions.createComplaintFailure, (state, { error }): ComplaintState => ({
    ...state,
    loading: false,
    error
  })),

  // Update complaint status
  on(ComplaintActions.updateComplaintStatusSuccess, (state, { complaint }): ComplaintState => ({
    ...state,
    complaints: state.complaints.map(c => (c.id === complaint.id ? complaint : c)),
    selectedComplaint: state.selectedComplaint?.id === complaint.id ? complaint : state.selectedComplaint
  })),

  // Delete complaint
  on(ComplaintActions.deleteComplaintSuccess, (state, { id }): ComplaintState => ({
    ...state,
    complaints: state.complaints.filter(c => c.id !== id),
    selectedComplaint: state.selectedComplaint?.id === id ? null : state.selectedComplaint
  })),

  // Select complaint
  on(ComplaintActions.selectComplaint, (state, { complaint }): ComplaintState => ({
    ...state,
    selectedComplaint: complaint
  })),

  // Filters
  on(ComplaintActions.setStatusFilter, (state, { status }): ComplaintState => ({
    ...state,
    filters: { ...state.filters, status }
  })),

  on(ComplaintActions.setPriorityFilter, (state, { priority }): ComplaintState => ({
    ...state,
    filters: { ...state.filters, priority }
  })),

  on(ComplaintActions.setSearchTerm, (state, { searchTerm }): ComplaintState => ({
    ...state,
    filters: { ...state.filters, searchTerm }
  })),

  on(ComplaintActions.clearFilters, (state): ComplaintState => ({
    ...state,
    filters: { status: null, priority: null, searchTerm: '' }
  }))
);
