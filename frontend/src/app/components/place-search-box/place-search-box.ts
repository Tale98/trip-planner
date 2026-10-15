import { Component, inject, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  AutoCompleteSearchRequest,
  AutoCompleteSearchResult,
  GetPlaceDetailRequest,
  PlaceDetailData,
} from '../../models/place';
import { PlaceService } from '../../services/place-service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipe } from '../../pipes/truncate-pipe';
@Component({
  selector: 'app-place-search-box',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatTooltipModule,
    TruncatePipe,
  ],
  templateUrl: './place-search-box.html',
  styleUrl: './place-search-box.css',
})
export class PlaceSearchBox {
  formComtrol = new FormControl<string | AutoCompleteSearchResult>('');
  sessionToken: string = crypto.randomUUID();
  placeService = inject(PlaceService);
  results$ = this.formComtrol.valueChanges.pipe(
    filter((value): value is string => typeof value === 'string'),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((text) => {
      if (!text) {
        return of([]);
      }
      if (text.length === 0) {
        return of([]);
      }
      const request: AutoCompleteSearchRequest = {
        session_token: this.sessionToken,
        text: text,
      };
      return this.placeService.autoCompleteSearch(request).pipe(
        map((res) => res.suggests),
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
      );
    }),
  );
  display = (record: AutoCompleteSearchResult) => {
    return record.text;
  };
  selectedPlace = output<PlaceDetailData>();
  onSelect(option: AutoCompleteSearchResult) {
    const request: GetPlaceDetailRequest = {
      session_token: this.sessionToken,
      place_id: option.place_id,
    };
    this.placeService.getPlaceDetail(request).subscribe({
      next: (res) => {
        this.selectedPlace.emit(res.details);
        // refresh session token //
        this.sessionToken = crypto.randomUUID();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
