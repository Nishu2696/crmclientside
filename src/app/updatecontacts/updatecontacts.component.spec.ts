import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecontactsComponent } from './updatecontacts.component';

describe('UpdatecontactsComponent', () => {
  let component: UpdatecontactsComponent;
  let fixture: ComponentFixture<UpdatecontactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
