import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  itemName: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();

  toast$ = this.toastSubject.asObservable();

  show(itemName: string) {
    this.toastSubject.next({ itemName, type: 'success' });
  }
}
