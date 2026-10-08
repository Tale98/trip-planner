import { Component, signal, ViewChild } from '@angular/core';
import { GoogleMapComponent } from './components/google-map-component/google-map-component';
import { PlanList } from './components/plan-list/plan-list';
import { PlanSchedule } from './components/plan-schedule/plan-schedule';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
