import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSearchBox } from './place-search-box';

describe('PlaceSearchBox', () => {
  let component: PlaceSearchBox;
  let fixture: ComponentFixture<PlaceSearchBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceSearchBox],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceSearchBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
