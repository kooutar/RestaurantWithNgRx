import { Component } from '@angular/core';
import { RouterOutlet } from "../../../../node_modules/@angular/router/types/_router_module-chunk";

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
