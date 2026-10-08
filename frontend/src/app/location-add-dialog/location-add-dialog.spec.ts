import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddDialog } from './location-add-dialog';

describe('LocationAddDialog', () => {
  let component: LocationAddDialog;
  let fixture: ComponentFixture<LocationAddDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationAddDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationAddDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
