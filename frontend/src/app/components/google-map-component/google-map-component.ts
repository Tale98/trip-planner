import { Component, EventEmitter, inject, Output, signal, viewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { LocationAddDialog } from '../location-add-dialog/location-add-dialog';
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
  center = signal<google.maps.LatLngLiteral>({
    lat: 13.7563,
    lng: 100.5018,
  });
  @Output() markerClicked = new EventEmitter<google.maps.LatLngLiteral>();
  map = viewChild.required(GoogleMap);
  onMapClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    const suggestion = google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
      input: '',
    });
    if (event.latLng == null) {
      return;
    }
    this.markerClicked.emit(event.latLng.toJSON());
    const dialogRef = this.dialog.open(LocationAddDialog, {
      data: event.latLng.toJSON(),
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
  readonly dialog = inject(MatDialog);
}
