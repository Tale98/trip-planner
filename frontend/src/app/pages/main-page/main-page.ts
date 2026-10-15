import { Component, ElementRef, inject, signal, viewChild, ViewChild } from '@angular/core';
import { GoogleMapComponent } from '../../components/google-map-component/google-map-component';
import { PlanList } from '../../components/plan-list/plan-list';
import { PlanSchedule } from '../../components/plan-schedule/plan-schedule';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarLabel } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';
import { PlaceSearchBox } from '../../components/place-search-box/place-search-box';
import { Bounds, LatLng, PlaceDetailData } from '../../models/place';

@Component({
  selector: 'app-main-page',
  imports: [GoogleMapComponent, PlanList, PlanSchedule, MatIconModule, PlaceSearchBox],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  @ViewChild(PlanSchedule) planSchedule!: PlanSchedule;
  addPlan(plan: google.maps.LatLngLiteral) {
    this.planSchedule.addPlan(plan);
  }
  private authSercice = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  onLogout() {
    this.authSercice.logout().subscribe({
      next: (res) => {
        this.toastService.show('success', 'Logout Success', res.message);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.router.navigate(['/login']);
  }
  center: LatLng | null = null;
  bounds = signal<Bounds | null>(null);
  onPlaceSelected(details: PlaceDetailData) {
    this.bounds.set(details.bounds);
  }
  onCenterChanged(event: LatLng) {
    this.center = event;
    console.log(event);
  }
}
