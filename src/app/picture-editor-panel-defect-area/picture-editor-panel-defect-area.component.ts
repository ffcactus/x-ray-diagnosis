import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DefectArea } from '../defect-area';

@Component({
  selector: 'app-picture-editor-panal-defect-area',
  templateUrl: './picture-editor-panal-defect-area.component.html',
  styleUrls: ['./picture-editor-panel-defect-area.component.css']
})
export class PictureEditorPanelDefectAreaComponent implements OnInit, OnChanges {
  @Input()
  defectArea: DefectArea;

  @Output()
  selected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.info(changes);
  }

  onClick() {
    this.selected = true;
  }
}
