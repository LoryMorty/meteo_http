import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDays } from './five-days';

describe('FiveDays', () => {
  let component: FiveDays;
  let fixture: ComponentFixture<FiveDays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiveDays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveDays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
