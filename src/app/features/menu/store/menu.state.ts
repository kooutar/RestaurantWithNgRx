import { MenuItem } from "../../../core/services/menu-api.service";

export interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  showOnlyAvailable: boolean;
}

export const initialMenuState: MenuState = {
  items: [],
  loading: false,
  error: null,
  showOnlyAvailable: false
};
