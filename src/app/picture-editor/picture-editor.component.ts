import { Component, Input, OnInit } from '@angular/core';
import { DefectArea } from './defect-area';

@Component({
  selector: 'app-picture-editor',
  templateUrl: './picture-editor.component.html',
  styleUrls: ['./picture-editor.component.css']
})
export class PictureEditorComponent implements OnInit {
  @Input()
  imageUrl: string;

  cursorStyle: string;
  height: number;
  width: number;
  defectAreas: DefectArea[];
  drawing = false;
  drawingDefectArea: DefectArea = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    width: 0,
    height: 0,
    defectType: ''
  };

  rect: HTMLElement;

  constructor() {
    this.imageUrl = './svg-example.svg';
    this.height = 800;
    this.width = 1000;
    this.defectAreas = [];
  }

  ngOnInit(): void {
  }

  onMouseEnter(e: MouseEvent): void {
    const targetNode = e.currentTarget as HTMLElement;
    this.cursorStyle = targetNode.style.cursor;
    targetNode.style.cursor = 'crosshair';
  }

  onMouseLeave(e: MouseEvent): void {
    const node = e.currentTarget as HTMLElement;
    node.style.cursor = this.cursorStyle;
  }

  onMouseDown(e: MouseEvent): void {
    this.drawing = true;
    const node = e.currentTarget as HTMLElement;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.drawingDefectArea.x0 = x;
    this.drawingDefectArea.y0 = y;
    this.drawingDefectArea.x1 = x;
    this.drawingDefectArea.y1 = y;
    this.drawingDefectArea.height = 0;
    this.drawingDefectArea.width = 0;
    console.info('down', this.drawingDefectArea, this.defectAreas);
  }

  onMouseUp(): void {
    let t = 0;
    this.drawing = false;
    // The drawing rectangle use (x0,y0), (width,height), and we need change it to (x0,y0)(x1,y1)
    if (this.drawingDefectArea.x1 < this.drawingDefectArea.x0) {
      t = this.drawingDefectArea.x0;
      this.drawingDefectArea.x0 = this.drawingDefectArea.x1;
      this.drawingDefectArea.x1 = t;
    }
    if (this.drawingDefectArea.y1 < this.drawingDefectArea.y1) {
      t = this.drawingDefectArea.y0;
      this.drawingDefectArea.y0 = this.drawingDefectArea.y1;
      this.drawingDefectArea.y1 = t;
    }
    this.defectAreas.push({
      ...this.drawingDefectArea});
    console.info('up', this.drawingDefectArea, this.defectAreas);
  }

  onMouseMove(e: MouseEvent): void {
    if (this.drawing) {
      const node = e.currentTarget as HTMLElement;
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.drawingDefectArea.x1 = x;
      this.drawingDefectArea.y1 = y;
      this.drawingDefectArea.width = Math.abs(this.drawingDefectArea.x0 - this.drawingDefectArea.x1);
      this.drawingDefectArea.height = Math.abs(this.drawingDefectArea.y0 - this.drawingDefectArea.y1);
    }
    console.info('move');
  }
}
