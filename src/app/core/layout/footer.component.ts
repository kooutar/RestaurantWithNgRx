import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-charbon text-white pt-16 pb-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="font-titre text-3xl font-bold text-white">
                Restaurant<span class="text-or">.</span>
              </span>
            </div>
            <p class="font-body text-gray-400 text-sm leading-relaxed max-w-xs">
              Une expérience culinaire inoubliable alliant tradition et modernité. Des ingrédients
              frais, une passion authentique.
            </p>
            <div class="flex gap-4 pt-2">
              <a href="#" class="text-gray-400 hover:text-or transition-colors"
                ><i class="h-6 w-6 border rounded-full flex items-center justify-center not-italic"
                  >Fb</i
                ></a
              >
              <a href="#" class="text-gray-400 hover:text-or transition-colors"
                ><i class="h-6 w-6 border rounded-full flex items-center justify-center not-italic"
                  >Ig</i
                ></a
              >
            </div>
          </div>

          <div>
            <h3 class="font-titre text-xl font-bold text-or mb-6">Navigation</h3>
            <ul class="space-y-3 font-body text-sm">
              <li>
                <a
                  routerLink="/menu"
                  class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform"
                >
                  Notre Menu
                </a>
              </li>
              <li>
                <a
                  routerLink="/order"
                  class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform"
                >
                  Votre Commande
                </a>
              </li>
              <li>
                <a
                  routerLink="/complaint"
                  class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform"
                >
                  Service Client & Avis
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-titre text-xl font-bold text-or mb-6">Nous trouver</h3>
            <ul class="space-y-4 font-body text-sm text-gray-400">
              <li class="flex items-start gap-3">
                <svg
                  class="h-5 w-5 text-or mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Avenue de la Gastronomie,<br />75000 Paris, France</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="h-5 w-5 text-or" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+33 1 23 45 67 89</span>
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="h-5 w-5 text-or mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Mar - Dim: 12h00 - 23h00<br />Lundi: Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 border-t border-gray-800 pt-8 text-center">
          <p class="font-body text-xs text-gray-600">
            &copy; 2026 Restaurant App. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
