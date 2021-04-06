import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingSelectorComponent } from './thing-selector.component';

describe('ThingSelectorComponent', () => {
  let component: ThingSelectorComponent;
  let fixture: ComponentFixture<ThingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
