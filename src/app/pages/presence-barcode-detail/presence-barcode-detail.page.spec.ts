import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceBarcodeDetailPage } from './presence-barcode-detail.page';

describe('PresenceBarcodeDetailPage', () => {
  let component: PresenceBarcodeDetailPage;
  let fixture: ComponentFixture<PresenceBarcodeDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresenceBarcodeDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceBarcodeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
