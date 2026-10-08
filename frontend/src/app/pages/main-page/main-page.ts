import { Component, ViewChild } from '@angular/core';
import { GoogleMapComponent } from '../../components/google-map-component/google-map-component';
import { PlanList } from '../../components/plan-list/plan-list';
import { PlanSchedule } from '../../components/plan-schedule/plan-schedule';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-page',
  imports: [GoogleMapComponent, PlanList, PlanSchedule, MatIconModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  @ViewChild(PlanSchedule) planSchedule!: PlanSchedule;
  addPlan(plan: google.maps.LatLngLiteral) {
    this.planSchedule.addPlan(plan);
  }
}
