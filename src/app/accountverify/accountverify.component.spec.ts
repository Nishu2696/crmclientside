import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountverifyComponent } from './accountverify.component';

describe('AccountverifyComponent', () => {
  let component: AccountverifyComponent;
  let fixture: ComponentFixture<AccountverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
