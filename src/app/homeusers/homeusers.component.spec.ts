import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeusersComponent } from './homeusers.component';

describe('HomeusersComponent', () => {
  let component: HomeusersComponent;
  let fixture: ComponentFixture<HomeusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
