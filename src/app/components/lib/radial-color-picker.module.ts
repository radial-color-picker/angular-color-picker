import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPreviewComponent } from './components/color-preview/color-preview.component';
import { RadialColorPickerComponent } from './components/radial-color-picker/radial-color-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ColorPreviewComponent,
    RadialColorPickerComponent,
  ],
  exports: [
    RadialColorPickerComponent,
  ]
})
export class RadialColorPickerModule { }
