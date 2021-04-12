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
    this.defectAreas = [{
      x0: 10,
      y0: 10,
      x1: 20,
      y1: 20,
      userId: 0,
      score: 0.5,
      state: "unchecked",
      defectType: "type0"
    }, {
      x0: 30,
      y0: 10,
      x1: 40,
      y1: 20,
      userId: 0,
      score: 0.6,
      state: "unchecked",
      defectType: "type0"
    }];
  }

  ngOnInit(): void {
  }

}
