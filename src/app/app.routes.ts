import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full'
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./features/menu/menu.routes').then(m => m.MENU_ROUTES)
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./features/order/order.routes').then(m => m.ORDER_ROUTES)
      },
      {
        path: 'complaint',
        loadChildren: () =>
          import('./features/complaint/complaint.routes').then(m => m.COMPLAINT_ROUTES)
      }
    ]
  }
];
