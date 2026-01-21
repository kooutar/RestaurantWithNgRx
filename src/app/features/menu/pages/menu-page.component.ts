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
  MenuSelectors: any;
 currentPage$: Observable<number> | undefined;
  constructor(private store: Store<AppState>) {
   // this.menuItems$ = this.store.select(MenuSelectors.selectFilteredMenuItems);
    this.loading$ = this.store.select(MenuSelectors.selectMenuLoading);
    this.error$ = this.store.select(MenuSelectors.selectMenuError);
    this.showOnlyAvailable$ = this.store.select(MenuSelectors.selectShowOnlyAvailable);
    this.availableCount$ = this.store.select(MenuSelectors.selectAvailableCount);
    this.totalCount$ = this.store.select(MenuSelectors.selectTotalCount);
    this.menuItems$ = this.store.select(MenuSelectors.selectPaginatedMenuItems);
     this.currentPage$ = this.store.select(MenuSelectors.selectCurrentPage); 
  }

  ngOnInit(): void {
    this.store.dispatch(MenuActions.loadMenuItems())

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

  // Méthodes pour naviguer entre les pages
goToPage(page: number) {
  this.store.dispatch(MenuActions.changePage({ page }));
}
nextPage() {
  this.store.select(MenuSelectors.selectCurrentPage).subscribe(page => {
    this.store.dispatch(MenuActions.changePage({ page: page + 1 }));
  }).unsubscribe();
}
prevPage() {
  this.store.select(MenuSelectors.selectCurrentPage).subscribe(page => {
    if (page > 1) this.store.dispatch(MenuActions.changePage({ page: page - 1 }));
  }).unsubscribe();
}
  
}
