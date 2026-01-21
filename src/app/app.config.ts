
import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { menuReducer } from './features/menu/store/menu.reducer';
import { from } from 'rxjs';
import { MenuEffects } from './features/menu/store/menu.effects';
import { complaintReducer } from './features/complaint/store/complaint.reducer';
import { ComplaintEffects } from './features/complaint/store/complaint.effects';
import { orderReducer } from './features/order/store/order.reducers';
import {
  loadOrderEffect,
  addItemEffect,
  removeItemEffect,
  updateItemQuantityEffect,
  clearOrdersEffect
} from './features/order/store/order.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({
      menu: menuReducer,
      order: orderReducer,
      complaint: complaintReducer
    }),
    provideEffects(
      MenuEffects,
      ComplaintEffects,
      loadOrderEffect,
      addItemEffect,
      removeItemEffect,
      updateItemQuantityEffect,
      clearOrdersEffect
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
