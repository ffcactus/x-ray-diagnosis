import {Component, Input, OnInit} from '@angular/core';
import {DefectArea, MockDefectAreas1, MockDefectAreas100} from '../defect-area';

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
  drawingDefectArea: DefectArea;
  score: number;

  rect: HTMLElement;

  constructor() {
    this.imageUrl = 'assets/images/1.png';
    this.height = 800;
    this.width = 1000;
    this.drawingDefectArea = {
      createdAt: '',
      createdByAi: false,
      defectType: '',
      id: 0,
      imageId: 0,
      score: 1,
      state: '',
      thingId: 0,
      updatedAt: '',
      userId: 0,
      x0: 0,
      x1: 0,
      y0: 0,
      y1: 0
    };
    this.defectAreas = MockDefectAreas100;
    this.score = 1;
    for (const d of this.defectAreas) {
      d.x0 = d.x0 * 100;
      d.y0 = d.y0 * 100;
      d.x1 = d.x1 * 100;
      d.y1 = d.y1 * 100;
      d.width = d.x1 - d.x0;
      d.height = d.y1 - d.y1;
    }
  }

  ngOnInit(): void {
  }

  defectAreaToString(defectArea: DefectArea): string {
    let ret = '(';
    ret += defectArea.x0.toFixed(2) + ',' + defectArea.y0.toFixed(2);
    ret += ') (';
    ret += defectArea.x1.toFixed(2) + ',' + defectArea.y1.toFixed(2);
    ret += '), type = ' + defectArea.defectType + ', score = ' + defectArea.score.toFixed(2);
    return ret;
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
    const height = rect.height;
    const width = rect.width;
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;
    this.drawingDefectArea.x0 = x;
    this.drawingDefectArea.y0 = y;
    this.drawingDefectArea.x1 = x;
    this.drawingDefectArea.y1 = y;
    this.drawingDefectArea.height = 0;
    this.drawingDefectArea.width = 0;
    this.drawingDefectArea.score = 1;
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
      ...this.drawingDefectArea,
      x0: this.drawingDefectArea.x0 * 100,
      y0: this.drawingDefectArea.y0 * 100,
      x1: this.drawingDefectArea.x1 * 100,
      y1: this.drawingDefectArea.y1 * 100,
      score: 1
    });
    console.info('up', this.drawingDefectArea, this.defectAreas);
  }

  onMouseMove(e: MouseEvent): void {
    if (this.drawing) {
      const node = e.currentTarget as HTMLElement;
      const rect = node.getBoundingClientRect();
      const height = rect.height;
      const width = rect.width;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.drawingDefectArea.x1 = x / width;
      this.drawingDefectArea.y1 = y / height;
      this.drawingDefectArea.width = Math.abs(this.drawingDefectArea.x0 - this.drawingDefectArea.x1);
      this.drawingDefectArea.height = Math.abs(this.drawingDefectArea.y0 - this.drawingDefectArea.y1);
    }
    console.info('move');
  }

  onScoreChange(e: any): void {
    this.score = e.target.value;
  }
}
