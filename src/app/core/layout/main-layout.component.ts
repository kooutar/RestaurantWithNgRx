import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";
import { ToastComponent } from "../../shared/includes/toast.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex min-h-screen flex-col bg-creme font-body text-charbon">
      <app-header/>
      <main class="grow pt-20 pb-24 md:pb-0">
        <router-outlet></router-outlet>
      </main>

      <div class="hidden md:block">
        <app-footer/>
      </div>

      <nav
        class="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden"
      >
        <div class="flex h-16 items-center justify-around px-2">
          <a
            routerLink="/menu"
            routerLinkActive="text-or"
            class="group flex flex-1 flex-col items-center justify-center gap-1 text-gray-400 hover:text-or transition-colors"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span class="text-[10px] font-bold uppercase tracking-widest">Carte</span>
          </a>

          <a
            routerLink="/order"
            routerLinkActive="text-or"
            class="group flex flex-1 flex-col items-center justify-center gap-1 text-gray-400 hover:text-or transition-colors"
          >
            <div class="relative">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-widest">Panier</span>
          </a>

          <a
            routerLink="/complaint"
            routerLinkActive="text-or"
            class="group flex flex-1 flex-col items-center justify-center gap-1 text-gray-400 hover:text-or transition-colors"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span class="text-[10px] font-bold uppercase tracking-widest">Avis</span>
          </a>
        </div>

        <div class="h-1 w-full bg-white pb-safe"></div>
      </nav>
    </div>
    <app-toast/>
  `,
  imports: [RouterOutlet, CommonModule, RouterModule, FooterComponent, HeaderComponent, ToastComponent],
})
export class MainLayoutComponent {
  private store = inject(Store);

  cartCount$: Observable<number> = this.store.select(selectComputedTotalItems);
}
