import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  AutoCompleteSearchRequest,
  AutoCompleteSearchResponse,
  GetPlaceDetailRequest,
  GetPlaceDetailResponse,
} from '../models/place';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private http = inject(HttpClient);
  private BASE_URL = `${environment.BACKEND_BASE_URL}`;
  autoCompleteSearch(request: AutoCompleteSearchRequest): Observable<AutoCompleteSearchResponse> {
    return this.http.post<AutoCompleteSearchResponse>(
      `${this.BASE_URL}/place/auto-complete`,
      request,
    );
  }
  getPlaceDetail(request: GetPlaceDetailRequest): Observable<GetPlaceDetailResponse> {
    return this.http.post<GetPlaceDetailResponse>(`${this.BASE_URL}/place/place-detail`, request);
  }
}
