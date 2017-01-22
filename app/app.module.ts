import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ColorPickerComponent } from './picker/picker.component'
import { PickerAreaComponent } from './picker/picker-area/area.component';
import { RulerComponent } from './picker/ruler/ruler.component';
import { InputsComponent } from './picker/inputs/inputs.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/index.html#F0F0F0',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ColorPickerComponent
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, ColorPickerComponent, PickerAreaComponent, RulerComponent, InputsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
