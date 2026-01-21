import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable ,Subscription } from 'rxjs';
import { MenuItem } from '../../../core/services/menu-api.service';
import * as MenuSelectors from '../store/menu.selectors'
import * as MenuActions from '../store/menu.actions'
import { CommonModule } from '@angular/common';
import {AppState } from '../store/menu.state';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  templateUrl:'./menu-page.component.html',
  styleUrl:'./menu-page.component.css',
 imports: [CommonModule],
})
export class MenuPageComponent implements OnInit ,OnDestroy{

 menuItems$: Observable<MenuItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  showOnlyAvailable$: Observable<boolean>;
  availableCount$: Observable<number>;
  totalCount$: Observable<number>;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {
    this.menuItems$ = this.store.select(MenuSelectors.selectFilteredMenuItems);
    this.loading$ = this.store.select(MenuSelectors.selectMenuLoading);
    this.error$ = this.store.select(MenuSelectors.selectMenuError);
    this.showOnlyAvailable$ = this.store.select(MenuSelectors.selectShowOnlyAvailable);
    this.availableCount$ = this.store.select(MenuSelectors.selectAvailableCount);
    this.totalCount$ = this.store.select(MenuSelectors.selectTotalCount);
  }

  ngOnInit(): void {
    this.store.dispatch(MenuActions.loadMenuItems());

    // 📌 Option 1 : Afficher tous les items dans la console
    this.subscriptions.add(
      this.store.select(MenuSelectors.selectAllMenuItems).subscribe(items => {
        console.log('📋 Tous les plats:', items);
        console.log('📊 Nombre total:', items.length);
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleFilter(showOnlyAvailable: boolean): void {
    console.log('🔄 Filtre changé:', showOnlyAvailable ? 'Disponibles uniquement' : 'Tous les plats');
    this.store.dispatch(
      MenuActions.filterAvailableItems({ showOnlyAvailable })
    );
  }

  reload(): void {
    console.log('🔄 Rechargement des plats...');
    this.store.dispatch(MenuActions.loadMenuItems());
  }
  
}
