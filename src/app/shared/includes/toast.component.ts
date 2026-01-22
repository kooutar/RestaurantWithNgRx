import {
  Component,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastMessage, ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      <div
        *ngIf="mounted"
        [class.translate-y-0]="visible"
        [class.opacity-100]="visible"
        [class.translate-y-12]="!visible"
        [class.opacity-0]="!visible"
        class="pointer-events-auto relative w-80 overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-charbon/5 transition-all duration-500 ease-out transform"
      >
        <div class="flex items-start gap-4 p-4">
          <div class="shrink-0 pt-0.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-vert/10 text-vert">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div class="flex-1">
            <p class="font-body text-xs font-bold uppercase tracking-widest text-gris-texte">
              Ajouté avec succès
            </p>
            <p class="mt-1 font-titre text-lg font-bold text-charbon">
              {{ message?.itemName }}
            </p>
          </div>

          <button (click)="hide()" class="text-charbon/40 hover:text-charbon transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          class="absolute bottom-0 left-0 h-1 bg-or transition-all duration-3000 ease-linear"
          [style.width]="progressWidth"
        ></div>
      </div>
    </div>
  `,
})
export class ToastComponent implements OnInit, OnDestroy {
  mounted = false;
  visible = false;
  message: ToastMessage | null = null;
  progressWidth = '100%';

  private sub!: Subscription;
  private animationTimer: any;
  private autoHideTimer: any;

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.sub = this.toastService.toast$.subscribe((msg) => {
      this.trigger(msg);
    });
  }

  trigger(msg: ToastMessage) {
    if (!isPlatformBrowser(this.platformId)) return;

    clearTimeout(this.animationTimer);
    clearTimeout(this.autoHideTimer);

    this.message = msg;
    this.mounted = true;
    this.visible = false;
    this.progressWidth = '100%';
    this.cdr.detectChanges();

    setTimeout(() => {
      this.visible = true;
      this.progressWidth = '0%';
      this.cdr.detectChanges();
    }, 50);

    this.autoHideTimer = setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.visible = false;
    this.cdr.detectChanges();

    this.animationTimer = setTimeout(() => {
      this.mounted = false;
      this.progressWidth = '100%';
      this.cdr.detectChanges();
    }, 500);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    clearTimeout(this.animationTimer);
    clearTimeout(this.autoHideTimer);
  }
}
