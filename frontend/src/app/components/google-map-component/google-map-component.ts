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
import { LatLng } from '../../models/place';
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
  panTo = input<LatLng | null>(null);
  center: google.maps.LatLngLiteral = { lat: 13.7563, lng: 100.5018 };
  constructor() {
    effect(() => {
      const center = this.panTo();
      if (!center) {
        return;
      }
      this.map().panTo({ lat: center.latitude, lng: center.longitude });
    });
  }
  @Output() markerClicked = new EventEmitter<google.maps.LatLngLiteral>();
  map = viewChild.required(GoogleMap);
  onMapClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {}
  readonly dialog = inject(MatDialog);
}
