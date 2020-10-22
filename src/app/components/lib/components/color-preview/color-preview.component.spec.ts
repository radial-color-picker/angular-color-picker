import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPreviewComponent } from './color-preview.component';

describe('ColorPreviewComponent', () => {
  let component: ColorPreviewComponent;
  let fixture: ComponentFixture<ColorPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
