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

  height: number
  width: number

  constructor() {
    this.imageUrl = './svg-example.svg'
    this.height = 800;
    this.width = 1000;
  }

  ngOnInit(): void {
  }

}
