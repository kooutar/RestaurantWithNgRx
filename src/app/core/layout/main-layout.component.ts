import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  template: `
    <header>Restaurant App</header>
    <router-outlet />
    <footer>© 2026</footer>
  `
})
export class MainLayoutComponent {}
