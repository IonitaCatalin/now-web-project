import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarPopupInfoComponent } from './notar-popup-info.component';

describe('PopupInfoComponent', () => {
  let component: NotarPopupInfoComponent;
  let fixture: ComponentFixture<NotarPopupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotarPopupInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotarPopupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
