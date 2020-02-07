import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SimpleComponent } from './components/simple/simple.component';
import { NgmodelComponent } from './components/ngmodel/ngmodel.component';
import { FormcontrolComponent } from './components/formcontrol/formcontrol.component';
import { NoanimationsComponent } from './components/noanimations/noanimations.component';
import { ClosedComponent } from './components/closed/closed.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'simple', component: SimpleComponent },
  { path: 'ngmodel', component: NgmodelComponent },
  { path: 'form-control', component: FormcontrolComponent },
  { path: 'no-animations', component: NoanimationsComponent },
  { path: 'closed', component: ClosedComponent },
  { path: 'collapsible', component: CollapsibleComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
