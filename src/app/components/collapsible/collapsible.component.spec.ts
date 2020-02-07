import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabsibleComponent } from './collabsible.component';

describe('CollabsibleComponent', () => {
  let component: CollabsibleComponent;
  let fixture: ComponentFixture<CollabsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
