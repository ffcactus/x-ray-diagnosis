import { AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { DefectArea } from './defect-area';
import compileStreaming = WebAssembly.compileStreaming;

@Component({
  selector: 'app-picture-editor',
  templateUrl: './picture-editor.component.html',
  styleUrls: ['./picture-editor.component.css']
})
export class PictureEditorComponent implements OnInit, AfterViewInit {
  @Input()
  imageUrl: string

  @ViewChild('svg')
  svg: ElementRef;

  cursorStyle: string
  height: number;
  width: number;
  defectAreas: DefectArea[];
  drawing: boolean = false;
  drawingDefectArea: DefectArea = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    width: 0,
    height: 0,
    defectType: ''
  };

  last_mousex: number = 0;
  last_mousey: number = 0;
  mousex: number = 0;
  mousey: number = 0;
  mousedown: boolean = false;
  rect: HTMLElement;

  constructor() {
    this.imageUrl = './svg-example.svg'
    this.height = 800;
    this.width = 1000;
    this.defectAreas = [];
    // document.addEventListener("mouseup", this.onMouseUp)
  }

  ngAfterViewInit(): void {
    const svgNS = this.svg.nativeElement.namespaceURI;
    this.rect = document.createElementNS(svgNS, 'rect');
  }

  ngOnInit(): void {
  }

  onMouseEnter(e: MouseEvent) {
    const targetNode = e.target as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    // this.cursorStyle = targetNode.style.cursor;
    // targetNode.style.cursor = 'crosshair';
  }

  onMouseLeave(e: MouseEvent) {
    const node = e.target as HTMLElement;
    // node.style.cursor = this.cursorStyle;
  }

  onMouseDown(e: MouseEvent) {

    this.drawing = true;
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.drawingDefectArea.x0 = x
    this.drawingDefectArea.y0 = y
    this.drawingDefectArea.x1 = x
    this.drawingDefectArea.y1 = y;
    this.drawingDefectArea.height = 0;
    this.drawingDefectArea.width = 0;
    console.info('down', this.drawingDefectArea, this.defectAreas)
  }

  onMouseUp(e: MouseEvent) {
    this.drawing = false;
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.drawingDefectArea.x1 = x;
    this.drawingDefectArea.y1 = y;
    this.drawingDefectArea.width = Math.abs(this.drawingDefectArea.x0 - this.drawingDefectArea.x1)
    this.drawingDefectArea.height = Math.abs(this.drawingDefectArea.y0 - this.drawingDefectArea.y1)
    this.defectAreas.push({...this.drawingDefectArea});
    console.info('up', this.drawingDefectArea, this.defectAreas)
  }

  onMouseMove(e: MouseEvent) {
    if (this.drawing) {
      const node = e.target as HTMLElement
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.drawingDefectArea.x1 = x;
      this.drawingDefectArea.y1 = y;
      this.drawingDefectArea.width = Math.abs(this.drawingDefectArea.x0 - this.drawingDefectArea.x1)
      this.drawingDefectArea.height = Math.abs(this.drawingDefectArea.y0 - this.drawingDefectArea.y1)
    }
    console.info('move')
  }

  mouseUp(e: MouseEvent) {
    this.mousedown = false;
  }

  mouseDown(e: MouseEvent) {
    const node = e.target as HTMLElement
    var rect = node.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.last_mousex = x;
    this.last_mousey = y;
    this.mousedown = true;
  }

  mouseMove(e: MouseEvent) {
    console.info('move')
    const x = e.x
    const y = e.y
    this.mousex = x;
    this.mousey = y;
    if (this.mousedown) {
      const width = Math.abs(this.mousex - this.last_mousex)
      const height = Math.abs(this.mousey - this.last_mousey)
      this.rect.setAttributeNS(null, 'x', this.last_mousex.toString());
      this.rect.setAttributeNS(null, 'y', this.last_mousey.toString());
      this.rect.setAttributeNS(null, 'width', width.toString());
      this.rect.setAttributeNS(null, 'height', height.toString());
      this.rect.setAttributeNS(null, 'fill', 'none');
      this.rect.setAttributeNS(null, 'stroke', 'black');
      this.rect.setAttributeNS(null, 'stroke-width', '5');
      this.svg.nativeElement.appendChild(this.rect)
    }
  }
}
