import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItem } from '../../../core/services/menu-api.service';
import * as MenuSelectors from '../store/menu.selectors'
import * as MenuActions from '../store/menu.actions'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  templateUrl:'./menu-page.component.html',
  styleUrl:'./menu-page.component.css',
 imports: [CommonModule],
})
export class MenuPageComponent implements OnInit{

  menuItems$: Observable<MenuItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  showOnlyAvailable$: Observable<boolean>;
  availableCount$: Observable<number>;
  totalCount$: Observable<number>;

  constructor(private store: Store) {
    this.menuItems$ = this.store.select(MenuSelectors.selectFilteredMenuItems);
    this.loading$ = this.store.select(MenuSelectors.selectMenuLoading);
    this.error$ = this.store.select(MenuSelectors.selectMenuError);
    this.showOnlyAvailable$ = this.store.select(MenuSelectors.selectShowOnlyAvailable);
    this.availableCount$ = this.store.select(MenuSelectors.selectAvailableCount);
    this.totalCount$ = this.store.select(MenuSelectors.selectTotalCount);
  }
 ngOnInit(): void {
    this.store.dispatch(MenuActions.loadMenuItems());
  }

  toggleFilter(showOnlyAvailable: boolean): void {
    this.store.dispatch(
      MenuActions.filterAvailableItems({ showOnlyAvailable })
    );
  }

  reload(): void {
    this.store.dispatch(MenuActions.loadMenuItems());
  }

  
}
