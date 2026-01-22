import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

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
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-titre text-charbon mb-2">Gestion des réclamations</h1>
        <p class="text-gris-texte">Gérez les réclamations de vos clients de manière efficace</p>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-md p-4">
          <p class="text-sm text-gris-texte mb-1">Total</p>
          <p class="text-3xl font-titre text-charbon">{{ stats().total }}</p>
        </div>
        <div class="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <p class="text-sm text-yellow-800 mb-1">En attente</p>
          <p class="text-3xl font-titre text-yellow-700">{{ stats().pending }}</p>
        </div>
        <div class="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p class="text-sm text-blue-800 mb-1">En cours</p>
          <p class="text-3xl font-titre text-blue-700">{{ stats().inProgress }}</p>
        </div>
        <div class="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p class="text-sm text-green-800 mb-1">Résolues</p>
          <p class="text-3xl font-titre text-green-700">{{ stats().resolved }}</p>
        </div>
        <div class="bg-red-50 rounded-lg shadow-md p-4 border border-red-200">
          <p class="text-sm text-red-800 mb-1">Priorité haute</p>
          <p class="text-3xl font-titre text-red-700">{{ stats().highPriority }}</p>
        </div>
        <div class="bg-or/10 rounded-lg shadow-md p-4 border border-or">
          <p class="text-sm text-or-dark mb-1">Taux résolution</p>
          <p class="text-3xl font-titre text-or">{{ stats().resolvedPercentage }}%</p>
        </div>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gris-texte mb-1">Rechercher</label>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              placeholder="Nom, sujet, email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gris-texte mb-1">Statut</label>
            <select
              [(ngModel)]="statusFilter"
              (ngModelChange)="onStatusChange()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or text-sm"
            >
              <option [value]="null">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="RESOLVED">Résolu</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gris-texte mb-1">Priorité</label>
            <select
              [(ngModel)]="priorityFilter"
              (ngModelChange)="onPriorityChange()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or text-sm"
            >
              <option [value]="null">Toutes les priorités</option>
              <option value="LOW">Basse</option>
              <option value="MEDIUM">Moyenne</option>
              <option value="HIGH">Haute</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading()" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-or"></div>
        <p class="mt-4 text-gris-texte">Chargement...</p>
      </div>

      <!-- Success Toast -->
      <div *ngIf="success()" class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 animate-bounce">
        {{ success() }}
      </div>

      <!-- Error -->
      <div *ngIf="error()" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
        <p>{{ error() }}</p>
      </div>

      <!-- Contenu -->
      <div *ngIf="!loading()" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Formulaire -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-2xl font-titre text-charbon mb-6">Nouvelle réclamation</h3>
            <form (ngSubmit)="onSubmit()" #form="ngForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gris-texte mb-1">Nom complet *</label>
                <input
                  type="text"
                  name="customerName"
                  [(ngModel)]="formData.customerName"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or"
                  placeholder="Ex: Jean Dupont"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gris-texte mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  [(ngModel)]="formData.email"
                  required
                  email
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or"
                  placeholder="jean@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gris-texte mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  [(ngModel)]="formData.phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or"
                  placeholder="+212 6 XX XX XX XX"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gris-texte mb-1">Référence commande</label>
                <input
                  type="text"
                  name="orderReference"
                  [(ngModel)]="formData.orderReference"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or"
                  placeholder="ORDER-123456"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gris-texte mb-1">Sujet *</label>
                <input
                  type="text"
                  name="subject"
                  [(ngModel)]="formData.subject"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or"
                  placeholder="Problème avec ma commande"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gris-texte mb-1">Priorité *</label>
                <select
                  name="priority"
                  [(ngModel)]="formData.priority"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or"
                >
                  <option value="LOW">Basse</option>
                  <option value="MEDIUM">Moyenne</option>
                  <option value="HIGH">Haute</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gris-texte mb-1">Description *</label>
                <textarea
                  name="description"
                  [(ngModel)]="formData.description"
                  required
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-or resize-none"
                  placeholder="Décrivez votre réclamation..."
                ></textarea>
              </div>
              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  [disabled]="!form.valid"
                  class="flex-1 bg-or hover:bg-or-dark text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-300"
                >
                  Soumettre
                </button>

              </div>
            </form>
          </div>
        </div>

        <!-- Liste -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-2xl font-titre text-charbon mb-6">Liste des réclamations</h3>

            <div *ngIf="complaints().length === 0" class="text-center py-12">
              <p class="text-gris-texte text-lg">Aucune réclamation trouvée</p>
            </div>

            <div *ngIf="complaints().length > 0" class="space-y-4">
              <div
                *ngFor="let complaint of complaints()"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="text-lg font-semibold text-charbon">{{ complaint.subject }}</h4>
                      <span [class]="getStatusClass(complaint.status)" class="px-3 py-1 text-xs font-medium rounded-full">
                        {{ getStatusLabel(complaint.status) }}
                      </span>
                      <span [class]="getPriorityClass(complaint.priority)" class="px-3 py-1 text-xs font-medium rounded-full">
                        {{ getPriorityLabel(complaint.priority) }}
                      </span>
                    </div>
                    <p class="text-sm text-gris-texte">
                      <span class="font-medium">Client:</span> {{ complaint.customerName }} •
                      <span class="font-medium">Email:</span> {{ complaint.email }}
                    </p>
                    <p *ngIf="complaint.orderReference" class="text-sm text-gris-texte mt-1">
                      <span class="font-medium">Réf:</span> {{ complaint.orderReference }}
                    </p>
                  </div>
                </div>
                <p class="text-gris-texte mb-3">{{ complaint.description }}</p>
                <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span class="text-xs text-gray-500">Créée le {{ formatDate(complaint.createdAt) }}</span>
                  <div class="flex gap-2">
                    <button
                      *ngIf="complaint.status === 'PENDING'"
                      (click)="updateStatus(complaint.id, 'IN_PROGRESS')"
                      class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Prendre en charge
                    </button>
                    <button
                      *ngIf="complaint.status === 'IN_PROGRESS'"
                      (click)="updateStatus(complaint.id, 'RESOLVED')"
                      class="px-3 py-1 text-sm bg-vert text-white rounded hover:bg-green-700"
                    >
                      Marquer résolu
                    </button>
                    <button
                      (click)="deleteComplaint(complaint.id)"
                      class="px-3 py-1 text-sm bg-rouge text-white rounded hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ComplaintPageComponent implements OnInit {
  complaints = signal<Complaint[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
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

  constructor(private store: Store) {
    this.store.select(selectFilteredComplaints).subscribe(c => this.complaints.set(c));
    this.store.select(selectComplaintsLoading).subscribe(l => this.loading.set(l));
    this.store.select(selectComplaintsError).subscribe(e => this.error.set(e));
    this.store.select(selectComplaintsStats).subscribe(s => this.stats.set(s));
  }

  ngOnInit(): void {
    this.store.dispatch(ComplaintActions.loadComplaints());
  }

  onSubmit(): void {
    this.store.dispatch(ComplaintActions.createComplaint({ complaint: { ...this.formData } }));
    this.success.set('Réclamation envoyée avec succès !');
    setTimeout(() => this.success.set(null), 3000);
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
