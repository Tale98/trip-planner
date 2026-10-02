import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';

@Component({
  selector: 'app-google-map-component',
  imports: [
    GoogleMap, MapAdvancedMarker
  ],
  templateUrl: './google-map-component.html',
  styleUrl: './google-map-component.css',
})
export class GoogleMapComponent {
    options:google.maps.MapOptions={
    zoom: 10,
  center:{
    lat: 13.7563,
    lng: 100.5018
  },
  mapId: "DEMO_MAP_ID"
  }
  @Output() markerClicked = new EventEmitter<google.maps.LatLngLiteral>();
  onMapClick(event:google.maps.MapMouseEvent | google.maps.IconMouseEvent){
    this.markerClicked.emit(event.latLng!.toJSON());
  }
}
