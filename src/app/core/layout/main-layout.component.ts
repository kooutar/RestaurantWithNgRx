import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTotalItems } from '../../features/order/store/order.reducers';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="min-h-screen flex flex-col bg-creme">
      <!-- Navbar Sticky -->
      <nav class="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            
            <!-- Logo / Brand -->
            <div class="flex items-center">
              <a routerLink="/" class="flex-shrink-0 flex items-center gap-2">
                <span class="text-3xl">🍕</span>
                <span class="font-titre text-2xl font-bold text-charbon">
                  Resto<span class="text-or">App</span>
                </span>
              </a>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden sm:flex sm:items-center sm:space-x-8">
              <a
                routerLink="/menu"
                routerLinkActive="text-or border-b-2 border-or"
                class="px-1 pt-1 text-lg font-body font-medium text-gris-texte hover:text-charbon transition-colors duration-200"
              >
                La Carte
              </a>

              <a
                routerLink="/order"
                routerLinkActive="text-or border-b-2 border-or"
                class="relative px-1 pt-1 text-lg font-body font-medium text-gris-texte hover:text-charbon transition-colors duration-200"
              >
                Mon Panier
                <!-- Badge Compteur -->
                <span 
                  *ngIf="(cartCount$ | async) as count"
                  class="absolute -top-1 -right-4 bg-rouge text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-bounce-in"
                >
                  {{ count }}
                </span>
              </a>

              <a
                routerLink="/complaint"
                routerLinkActive="text-or border-b-2 border-or"
                class="px-1 pt-1 text-lg font-body font-medium text-gris-texte hover:text-charbon transition-colors duration-200"
              >
                Réclamations
              </a>
            </div>

            <!-- Mobile Menu Button (placeholder) -->
            <div class="flex items-center sm:hidden">
              <a routerLink="/order" class="text-charbon relative mr-4">
                 <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>
                 <span *ngIf="(cartCount$ | async) as count" class="absolute -top-2 -right-2 bg-rouge text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                   {{ count }}
                 </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="bg-charbon text-white py-8 mt-auto">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="font-body text-gray-400">
            © 2026 RestoApp - Une expérience culinaire NgRx.
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @keyframes bounce-in {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .animate-bounce-in {
      animation: bounce-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `]
})
export class MainLayoutComponent {
  private store = inject(Store);

  cartCount$ = this.store.select(selectTotalItems);
}
