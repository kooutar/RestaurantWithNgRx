import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ComplaintState, ComplaintStatus, ComplaintPriority } from './complaint.state';

/**
 * Sélecteur racine de la feature
 */
export const selectComplaintFeature = createFeatureSelector<ComplaintState>('complaint');

/**
 * Sélecteurs de base
 */
export const selectAllComplaints = createSelector(
  selectComplaintFeature,
  (state) => state.complaints
);

export const selectComplaintsLoading = createSelector(
  selectComplaintFeature,
  (state) => state.loading
);

export const selectComplaintsError = createSelector(
  selectComplaintFeature,
  (state) => state.error
);

export const selectSelectedComplaint = createSelector(
  selectComplaintFeature,
  (state) => state.selectedComplaint
);

/**
 * Sélecteurs de filtres
 */
export const selectFilters = createSelector(
  selectComplaintFeature,
  (state) => state.filters
);

/**
 * Sélecteur des réclamations filtrées
 */
export const selectFilteredComplaints = createSelector(
  selectAllComplaints,
  selectFilters,
  (complaints, filters) => {
    let filtered = complaints;

    if (filters.status) {
      filtered = filtered.filter(c => c.status === filters.status);
    }

    if (filters.priority) {
      filtered = filtered.filter(c => c.priority === filters.priority);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.customerName.toLowerCase().includes(term) ||
          c.subject.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term)
      );
    }

    return [...filtered].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
);

/**
 * Statistiques
 */
export const selectComplaintsStats = createSelector(selectAllComplaints, (complaints) => {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === ComplaintStatus.PENDING).length;
  const inProgress = complaints.filter(c => c.status === ComplaintStatus.IN_PROGRESS).length;
  const resolved = complaints.filter(c => c.status === ComplaintStatus.RESOLVED).length;

  const highPriority = complaints.filter(
    c => c.priority === ComplaintPriority.HIGH && c.status !== ComplaintStatus.RESOLVED
  ).length;

  return {
    total,
    pending,
    inProgress,
    resolved,
    highPriority,
    resolvedPercentage: total > 0 ? Math.round((resolved / total) * 100) : 0
  };
});
