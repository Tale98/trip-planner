import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSchedule } from './plan-schedule';

describe('PlanSchedule', () => {
  let component: PlanSchedule;
  let fixture: ComponentFixture<PlanSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
