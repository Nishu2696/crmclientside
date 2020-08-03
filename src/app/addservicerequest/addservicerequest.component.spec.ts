import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicerequestComponent } from './addservicerequest.component';

describe('AddservicerequestComponent', () => {
  let component: AddservicerequestComponent;
  let fixture: ComponentFixture<AddservicerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddservicerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservicerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
