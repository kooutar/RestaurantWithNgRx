import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService<T> {
  private platformId = inject(PLATFORM_ID);

  get(key: string): T | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  set(key: string, value: T): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem(key);
  }
}
