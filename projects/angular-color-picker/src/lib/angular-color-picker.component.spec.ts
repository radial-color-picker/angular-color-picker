import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularColorPickerComponent } from './angular-color-picker.component';

describe('AngularColorPickerComponent', () => {
  let component: AngularColorPickerComponent;
  let fixture: ComponentFixture<AngularColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
