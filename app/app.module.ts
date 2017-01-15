import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ColorPickerComponent } from './picker/picker.component'
import { PickerAreaComponent }  from './picker/picker-area/area.component';
import { RulerComponent } from './picker/ruler/ruler.component';
import { InputsComponent } from './picker/inputs/inputs.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, ColorPickerComponent, PickerAreaComponent, RulerComponent, InputsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
