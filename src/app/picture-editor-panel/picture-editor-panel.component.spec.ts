import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureEditorPanelComponent } from './picture-editor-panel.component';

describe('PictureEditorPanalComponent', () => {
  let component: PictureEditorPanelComponent;
  let fixture: ComponentFixture<PictureEditorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureEditorPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureEditorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
