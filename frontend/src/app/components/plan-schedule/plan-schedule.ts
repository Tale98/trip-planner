import { Component, signal } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-plan-schedule',
  imports: [
    MatStepperModule
  ],
  templateUrl: './plan-schedule.html',
  styleUrl: './plan-schedule.css',
})
export class PlanSchedule {
    readonly plans = signal<google.maps.LatLngLiteral[]>([]);
    addplan(value: google.maps.LatLngLiteral){
        this.plans.update((pre) => [...pre,value])
        console.log(this.plans())
    }
}
