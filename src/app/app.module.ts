import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { SimpleComponent } from './components/simple/simple.component';
import { NgmodelComponent } from './components/ngmodel/ngmodel.component';
import { FormcontrolComponent } from './components/formcontrol/formcontrol.component';
import { NoanimationsComponent } from './components/noanimations/noanimations.component';
import { ClosedComponent } from './components/closed/closed.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RadialColorPickerModule } from "./components/lib/radial-color-picker.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SimpleComponent,
    NgmodelComponent,
    FormcontrolComponent,
    NoanimationsComponent,
    ClosedComponent,
    CollapsibleComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RadialColorPickerModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    RadialColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
