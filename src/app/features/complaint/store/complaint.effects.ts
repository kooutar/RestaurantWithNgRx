import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, of, withLatestFrom, tap, switchMap } from 'rxjs';
import * as ComplaintActions from './complaint.actions';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Complaint, ComplaintStatus } from './complaint.state';
import { selectAllComplaints } from './complaint.selectors';

const COMPLAINTS_STORAGE_KEY = 'restaurant_complaints';

@Injectable()
export class ComplaintEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private localStorageService = inject(LocalStorageService<Complaint[]>);

  /**
   * Charge les réclamations depuis LocalStorage au démarrage
   */
  loadComplaints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComplaintActions.loadComplaints),
      switchMap(() => {
        try {
          const complaints = this.localStorageService.get(COMPLAINTS_STORAGE_KEY) || [];
          return of(ComplaintActions.loadComplaintsSuccess({ complaints }));
        } catch (error) {
          return of(
            ComplaintActions.loadComplaintsFailure({
              error: 'Erreur lors du chargement des réclamations'
            })
          );
        }
      })
    )
  );

  /**
   * Crée une nouvelle réclamation
   */
  createComplaint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComplaintActions.createComplaint),
      map(({ complaint }) => {
        const newComplaint: Complaint = {
          ...complaint,
          id: this.generateId(),
          status: ComplaintStatus.PENDING,
          createdAt: new Date()
        };
        return ComplaintActions.createComplaintSuccess({ complaint: newComplaint });
      }),
      catchError(() =>
        of(
          ComplaintActions.createComplaintFailure({
            error: 'Erreur lors de la création de la réclamation'
          })
        )
      )
    )
  );

  /**
   * Met à jour le statut d'une réclamation
   */
  updateComplaintStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComplaintActions.updateComplaintStatus),
      withLatestFrom(this.store.select(selectAllComplaints)),
      map(([{ id, status }, complaints]) => {
        const complaint = complaints.find(c => c.id === id);
        if (!complaint) {
          throw new Error('Réclamation non trouvée');
        }

        const updatedComplaint: Complaint = {
          ...complaint,
          status,
          updatedAt: new Date(),
          resolvedAt: status === ComplaintStatus.RESOLVED ? new Date() : complaint.resolvedAt
        };

        return ComplaintActions.updateComplaintStatusSuccess({ complaint: updatedComplaint });
      })
    )
  );

/**
 * Supprime une réclamation
 */
deleteComplaint$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ComplaintActions.deleteComplaint),
    withLatestFrom(this.store.select(selectAllComplaints)),
    map(([{ id }, complaints]) => {
      const exists = complaints.some(c => c.id === id);

      if (!exists) {
        return ComplaintActions.deleteComplaintFailure({
          error: 'Réclamation non trouvée'
        });
      }

      return ComplaintActions.deleteComplaintSuccess({ id });
    })
  )
);


  /**
   * Persiste les réclamations dans LocalStorage après chaque modification
   */
  persistComplaints$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ComplaintActions.createComplaintSuccess,
          ComplaintActions.updateComplaintStatusSuccess,
          ComplaintActions.deleteComplaintSuccess
        ),
        tap(() => {
          this.store.dispatch(ComplaintActions.persistComplaints());
        })
      ),
    { dispatch: false }
  );

  /**
   * Sauvegarde dans LocalStorage
   */
  saveToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ComplaintActions.persistComplaints),
        withLatestFrom(this.store.select(selectAllComplaints)),
        tap(([, complaints]) => {
          this.localStorageService.set(COMPLAINTS_STORAGE_KEY, complaints);
        })
      ),
    { dispatch: false }
  );



  /**
   * Génère un ID unique
   */
  private generateId(): string {
    return `complaint_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
