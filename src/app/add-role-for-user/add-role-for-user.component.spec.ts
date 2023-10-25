import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleForUserComponent } from './add-role-for-user.component';

describe('AddRoleForUserComponent', () => {
  let component: AddRoleForUserComponent;
  let fixture: ComponentFixture<AddRoleForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoleForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
