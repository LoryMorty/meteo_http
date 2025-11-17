import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoAttuale } from './meteo-attuale';

describe('MeteoAttuale', () => {
  let component: MeteoAttuale;
  let fixture: ComponentFixture<MeteoAttuale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoAttuale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoAttuale);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
