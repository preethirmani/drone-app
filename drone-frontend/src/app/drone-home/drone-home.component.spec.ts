import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneHomeComponent } from './drone-home.component';

describe('DroneHomeComponent', () => {
  let component: DroneHomeComponent;
  let fixture: ComponentFixture<DroneHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DroneHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroneHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
