import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './services/toast-service';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
  toastService = inject(ToastService);
  dissmissToast(id: number) {
    this.toastService.dissmiss(id);
  }
}
