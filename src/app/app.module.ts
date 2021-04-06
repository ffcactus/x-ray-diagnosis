import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThingSelectorComponent } from './thing-selector/thing-selector.component';
import { PictureSelectorComponent } from './picture-selector/picture-selector.component';
import { PictureEditorComponent } from './picture-editor/picture-editor.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ThingSelectorComponent,
    PictureSelectorComponent,
    PictureEditorComponent
  ],
  imports: [
    BrowserModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
