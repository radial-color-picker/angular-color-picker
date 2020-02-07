import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcontrolComponent } from './formcontrol.component';

describe('FormcontrolComponent', () => {
  let component: FormcontrolComponent;
  let fixture: ComponentFixture<FormcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
