import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasNotes } from './canvas-notes';

describe('CanvasNotes', () => {
  let component: CanvasNotes;
  let fixture: ComponentFixture<CanvasNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
