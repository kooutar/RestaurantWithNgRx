import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService<T> {

  get(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  set(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
