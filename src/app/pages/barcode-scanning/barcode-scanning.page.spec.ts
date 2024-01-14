import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeScanningPage } from './barcode-scanning.page';

describe('BarcodeScanningPage', () => {
  let component: BarcodeScanningPage;
  let fixture: ComponentFixture<BarcodeScanningPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarcodeScanningPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeScanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
