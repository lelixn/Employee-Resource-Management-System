import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRLeavesComponent } from './leaves';

describe('Leaves', () => {
  let component: HRLeavesComponent;
  let fixture: ComponentFixture<HRLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HRLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
