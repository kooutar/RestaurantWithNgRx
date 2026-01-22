import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header
      class="fixed top-0 z-40 w-full border-t-4 border-or bg-white/95 shadow-sm backdrop-blur-md"
    >
      <div
        class="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
      <a routerLink="/" class="font-titre text-2xl font-bold tracking-tight text-charbon">
        <span class="text-or">R</span>estaurant<span class="text-or">.</span>
      </a>

        <nav class="hidden md:flex items-center gap-8">
          <a
            routerLink="/menu"
            routerLinkActive="text-or"
            class="text-sm font-semibold uppercase tracking-widest text-charbon hover:text-or transition-colors"
          >
            Le Menu
          </a>

          <a
            routerLink="/complaint"
            routerLinkActive="text-or"
            class="text-sm font-semibold uppercase tracking-widest text-charbon hover:text-or transition-colors"
          >
            Avis
          </a>

          <a
            routerLink="/order"
            routerLinkActive="bg-or text-white border-or"
            class="group flex items-center gap-2 rounded-full border-2 border-charbon px-6 py-2 text-sm font-bold uppercase tracking-wider text-charbon transition-all hover:bg-charbon hover:text-white"
          >
            <span>Commande</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
