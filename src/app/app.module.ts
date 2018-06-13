import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RadialColorPickerModule } from 'radial-color-picker';
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
    RadialColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
