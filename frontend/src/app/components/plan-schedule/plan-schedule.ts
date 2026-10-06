import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-plan-schedule',
  imports: [
    MatExpansionModule
  ],
  templateUrl: './plan-schedule.html',
  styleUrl: './plan-schedule.css',
})
export class PlanSchedule {
    readonly plans = signal<google.maps.LatLngLiteral[]>([]);
    activePlan = signal<google.maps.LatLngLiteral | null>(null);
    addPlan(value: google.maps.LatLngLiteral){
        this.plans.update((pre) => [...pre,value])
            this.activePlan.set(value)
    }
    setActivePlan(value: google.maps.LatLngLiteral){
        this.activePlan.set(value)
    }
}
