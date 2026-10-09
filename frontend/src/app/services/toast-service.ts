import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'warning' | 'error';
export interface NotificationData {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toasts = signal<NotificationData[]>([]);
  show(type: NotificationType, title: string, description: string = '', duration: number = 3000) {
    const nextId = this.toasts().length;
    this.toasts.update((toasts) => [
      ...toasts,
      { id: nextId, type: type, title: title, description: description },
    ]);
    setTimeout(() => this.dissmiss(nextId), duration);
  }
  dissmiss(id: number) {
    this.toasts.update((toasts) => toasts.filter((t) => t.id != id));
  }
}
