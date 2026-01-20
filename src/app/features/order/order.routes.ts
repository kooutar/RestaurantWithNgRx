import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/order-page.component')
        .then(m => m.OrderPageComponent)
  }
];
