import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistProfileComponent } from './receptionist-profile.component';

describe('ReceptionistProfileComponent', () => {
  let component: ReceptionistProfileComponent;
  let fixture: ComponentFixture<ReceptionistProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionistProfileComponent]
    });
    fixture = TestBed.createComponent(ReceptionistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
