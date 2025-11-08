import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskModal } from './assign-task-modal';

describe('AssignTaskModal', () => {
  let component: AssignTaskModal;
  let fixture: ComponentFixture<AssignTaskModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTaskModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTaskModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
