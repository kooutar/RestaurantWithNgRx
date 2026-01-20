import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  template: `
    <header>Restaurant App</header>
    <router-outlet />
    <footer>© 2026</footer>
  `,
  imports: [RouterOutlet]
})
export class MainLayoutComponent {}
