import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorPopupInfoComponent } from './translator-popup-info.component';

describe('TranslatorPopupInfoComponent', () => {
  let component: TranslatorPopupInfoComponent;
  let fixture: ComponentFixture<TranslatorPopupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslatorPopupInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslatorPopupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
