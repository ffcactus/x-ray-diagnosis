import { Component, Input, OnInit } from '@angular/core';
import { DefectArea } from '../defect-area';

@Component({
  selector: 'app-picture-editor-panal',
  templateUrl: './picture-editor-panel.component.html',
  styleUrls: ['./picture-editor-panel.component.css']
})
export class PictureEditorPanelComponent implements OnInit {
  @Input()
  defectAreas: DefectArea[];

  constructor() {
    this.defectAreas = [];
  }

  ngOnInit(): void {
  }

}
