import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercontrolComponent } from './usercontrol.component';

describe('UsercontrolComponent', () => {
  let component: UsercontrolComponent;
  let fixture: ComponentFixture<UsercontrolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsercontrolComponent]
    });
    fixture = TestBed.createComponent(UsercontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
