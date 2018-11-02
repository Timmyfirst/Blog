import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupWithUrlComponent } from './signup-with-url.component';

describe('SignupWithUrlComponent', () => {
  let component: SignupWithUrlComponent;
  let fixture: ComponentFixture<SignupWithUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupWithUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupWithUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
