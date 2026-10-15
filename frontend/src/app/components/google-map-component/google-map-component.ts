import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
  viewChild,
} from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { LocationAddDialog } from '../location-add-dialog/location-add-dialog';
import { Bounds, LatLng } from '../../models/place';
@Component({
  selector: 'app-google-map-component',
  imports: [GoogleMap, MapAdvancedMarker],
  templateUrl: './google-map-component.html',
  styleUrl: './google-map-component.css',
})
export class GoogleMapComponent {
  options: google.maps.MapOptions = {
    zoom: 10,
    mapId: 'DEMO_MAP_ID',
  };
  fitBounds = input<Bounds | null>(null);
  center: google.maps.LatLngLiteral = { lat: 13.7563, lng: 100.5018 };
  constructor() {
    effect(() => {
      const bounds = this.fitBounds();
      if (!bounds) {
        return;
      }
      console.log(bounds);
      this.map().fitBounds(
        {
          east: bounds.east,
          west: bounds.west,
          north: bounds.north,
          south: bounds.south,
        },
        20,
      );
    });
  }
  @Output() markerClicked = new EventEmitter<google.maps.LatLngLiteral>();
  map = viewChild.required(GoogleMap);
  onMapClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {}
  readonly dialog = inject(MatDialog);
}
