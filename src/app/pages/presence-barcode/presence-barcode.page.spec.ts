import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceBarcodePage } from './presence-barcode.page';

describe('PresenceBarcodePage', () => {
  let component: PresenceBarcodePage;
  let fixture: ComponentFixture<PresenceBarcodePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresenceBarcodePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceBarcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
