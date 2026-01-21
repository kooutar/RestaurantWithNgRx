import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { menuReducer } from './features/menu/store/menu.reducer';
import { from } from 'rxjs';
import {MenuEffects} from './features/menu/store/menu.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore(),
    provideState('menu', menuReducer),
    provideEffects(MenuEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
