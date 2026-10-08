import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
export interface PlanData {
  locationName: string;
}

@Component({
  selector: 'app-location-add-dialog',
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './location-add-dialog.html',
  styleUrl: './location-add-dialog.css',
})
export class LocationAddDialog {
  readonly dialogRef = inject(MatDialogRef<LocationAddDialog>);
  readonly data = inject<google.maps.LatLngLiteral>(MAT_DIALOG_DATA);
  onCreateClicked() {
    const data: PlanData = {
      locationName: 'AAA',
    };
    this.dialogRef.close();
  }
}
