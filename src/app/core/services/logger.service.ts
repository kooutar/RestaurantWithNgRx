import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string, data?: unknown) {
    console.log(`[APP] ${message}`, data);
  }
}
