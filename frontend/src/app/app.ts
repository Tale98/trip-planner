import { Component, signal, ViewChild } from '@angular/core';
import { GoogleMapComponent } from './components/google-map-component/google-map-component';
import { PlanList } from './components/plan-list/plan-list';
import { PlanSchedule } from './components/plan-schedule/plan-schedule';
@Component({
  selector: 'app-root',
  imports: [
    GoogleMapComponent,
    PlanList,
    PlanSchedule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  @ViewChild(PlanSchedule) planSchedule!: PlanSchedule;
  addPlan(plan:google.maps.LatLngLiteral){
    this.planSchedule.addPlan(plan)
  }
}
