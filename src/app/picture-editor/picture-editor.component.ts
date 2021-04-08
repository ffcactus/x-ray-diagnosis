import { HostListener } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { DefectArea } from './defect-area';

@Component({
  selector: 'app-picture-editor',
  templateUrl: './picture-editor.component.html',
  styleUrls: ['./picture-editor.component.css']
})
export class PictureEditorComponent implements OnInit {
  @Input()
  imageUrl: string

  height: number;
  width: number;
  defectAreas: DefectArea[];
  drawingDefectArea: DefectArea = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    defectType: ""
  };
  constructor() {
    this.imageUrl = './svg-example.svg'
    this.height = 800;
    this.width = 1000;
    this.defectAreas = [];
  }

  ngOnInit(): void {
  }

  onMouseEnter(event: MouseEvent) {
  }

  onMouseDown(e: MouseEvent) {
    const node = e.target as HTMLElement
    var rect = node.getBoundingClientRect();
    this.drawingDefectArea.x0 = e.clientX - rect.left;
    this.drawingDefectArea.y0 = e.clientY - rect.top;
  }

  onMouseUp(e: MouseEvent) {
    const node = e.target as HTMLElement
    var rect = node.getBoundingClientRect();
    this.drawingDefectArea.x1 = e.clientX - rect.left;
    this.drawingDefectArea.y1 = e.clientY - rect.top;
    this.defectAreas.push({...this.drawingDefectArea});
    console.info(this.defectAreas)
  }
}
