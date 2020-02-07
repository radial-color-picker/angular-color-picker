import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoanimationsComponent } from './noanimations.component';

describe('NoanimationsComponent', () => {
  let component: NoanimationsComponent;
  let fixture: ComponentFixture<NoanimationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoanimationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoanimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
