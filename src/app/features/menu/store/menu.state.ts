import { MenuItem } from "../../../core/services/menu-api.service";

export interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  showOnlyAvailable: boolean;
  currentPage: number;      // <- page actuelle
  itemsPerPage: number;
}

export const initialMenuState: MenuState = {
  items: [],
  loading: false,
  error: null,
  showOnlyAvailable: false,
  currentPage: 1,
  itemsPerPage: 6, 
  
};

// Ajout de l'interface pour l'AppState
export interface AppState {
  menu: MenuState;
}