import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import * as ComplaintActions from '../store/complaint.actions';
import {
  selectFilteredComplaints,
  selectComplaintsLoading,
  selectComplaintsError,
  selectComplaintsStats,
  selectFilters
} from '../store/complaint.selectors';
import { Complaint, CreateComplaintDto, ComplaintStatus, ComplaintPriority } from '../store/complaint.state';

@Component({
  selector: 'app-complaint-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaint-page.component.html',
  styleUrls: ['./complaint-page.component.css']
})
export class ComplaintPageComponent implements OnInit {
  complaints = signal<Complaint[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  showSuccessToast = signal(false);
  stats = signal({ total: 0, pending: 0, inProgress: 0, resolved: 0, highPriority: 0, resolvedPercentage: 0 });

  searchTerm = '';
  statusFilter: string | null = null;
  priorityFilter: string | null = null;

  formData: CreateComplaintDto = {
    customerName: '',
    email: '',
    phone: '',
    subject: '',
    description: '',
    priority: ComplaintPriority.MEDIUM,
    orderReference: ''
  };

  constructor(private store: Store, private actions$: Actions) {
    this.store.select(selectFilteredComplaints).subscribe(c => this.complaints.set(c));
    this.store.select(selectComplaintsLoading).subscribe(l => this.loading.set(l));
    this.store.select(selectComplaintsError).subscribe(e => this.error.set(e));
    this.store.select(selectComplaintsStats).subscribe(s => this.stats.set(s));

    // Listen for success action to show toast
    this.actions$.pipe(
      ofType(ComplaintActions.createComplaintSuccess)
    ).subscribe(() => {
      this.showSuccessToast.set(true);
      setTimeout(() => this.showSuccessToast.set(false), 3000); // Hide after 3 seconds
    });
  }

  ngOnInit(): void {
    this.store.dispatch(ComplaintActions.loadComplaints());
  }

  onSubmit(): void {
    this.store.dispatch(ComplaintActions.createComplaint({ complaint: { ...this.formData } }));
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      customerName: '',
      email: '',
      phone: '',
      subject: '',
      description: '',
      priority: ComplaintPriority.MEDIUM,
      orderReference: ''
    };
  }

  updateStatus(id: string, status: string): void {
    this.store.dispatch(ComplaintActions.updateComplaintStatus({ id, status: status as ComplaintStatus }));
  }

  deleteComplaint(id: string): void {
    if (confirm('Supprimer cette réclamation ?')) {
      this.store.dispatch(ComplaintActions.deleteComplaint({ id }));
    }
  }

  onSearchChange(): void {
    this.store.dispatch(ComplaintActions.setSearchTerm({ searchTerm: this.searchTerm }));
  }

  onStatusChange(): void {
    this.store.dispatch(ComplaintActions.setStatusFilter({ status: this.statusFilter }));
  }

  onPriorityChange(): void {
    this.store.dispatch(ComplaintActions.setPriorityFilter({ priority: this.priorityFilter }));
  }

  onClearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = null;
    this.priorityFilter = null;
    this.store.dispatch(ComplaintActions.clearFilters());
  }

  getStatusClass(status: ComplaintStatus): string {
    const classes = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      RESOLVED: 'bg-green-100 text-green-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: ComplaintStatus): string {
    const labels = { PENDING: 'En attente', IN_PROGRESS: 'En cours', RESOLVED: 'Résolu' };
    return labels[status] || status;
  }

  getPriorityClass(priority: ComplaintPriority): string {
    const classes = {
      LOW: 'bg-gray-100 text-gray-700',
      MEDIUM: 'bg-orange-100 text-orange-700',
      HIGH: 'bg-red-100 text-red-700'
    };
    return classes[priority] || 'bg-gray-100 text-gray-800';
  }

  getPriorityLabel(priority: ComplaintPriority): string {
    const labels = { LOW: 'Basse', MEDIUM: 'Moyenne', HIGH: 'Haute' };
    return labels[priority] || priority;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
