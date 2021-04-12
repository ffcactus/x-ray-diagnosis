import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureEditorPanelDefectAreaComponent } from './picture-editor-panel-defect-area.component';

describe('PictureEditorPanalDefectAreaComponent', () => {
  let component: PictureEditorPanelDefectAreaComponent;
  let fixture: ComponentFixture<PictureEditorPanelDefectAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureEditorPanelDefectAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureEditorPanelDefectAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
