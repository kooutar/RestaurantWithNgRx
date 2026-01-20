import { Routes } from '@angular/router';

export const COMPLAINT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/complaint-page.component')
        .then(m => m.ComplaintPageComponent)
  }
];
