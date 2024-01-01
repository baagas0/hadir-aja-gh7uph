import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceHistoryPage } from './presence-history.page';

describe('PresenceHistoryPage', () => {
  let component: PresenceHistoryPage;
  let fixture: ComponentFixture<PresenceHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresenceHistoryPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
