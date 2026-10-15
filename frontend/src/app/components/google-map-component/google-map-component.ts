import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  output,
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
    center: { lat: 13.7563, lng: 100.5018 },
  };
  fitBounds = input<Bounds | null>(null);
  constructor() {
    effect(() => {
      const bounds = this.fitBounds();
      if (!bounds) {
        return;
      }
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
  centerChanged = output<LatLng>();
  onIdle() {
    const center = this.map().getCenter();
    if (!center) {
      return;
    }
    this.centerChanged.emit({
      latitude: center.lat(),
      longitude: center.lng(),
    });
  }
}
