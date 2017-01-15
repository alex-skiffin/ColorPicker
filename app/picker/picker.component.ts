import { Component, ViewChild } from '@angular/core';
import { InputsComponent } from './inputs/inputs.component';
import { PickerAreaComponent } from './picker-area/area.component';
import { RulerComponent } from './ruler/ruler.component';

@Component({
    selector: 'color-picker',
    templateUrl: 'app/picker/picker.component.template.html',
    styleUrls: [ 'app/picker/picker.component.css' ]
})

export class ColorPickerComponent {
    @ViewChild(InputsComponent)
    private inputs: InputsComponent;

    @ViewChild(PickerAreaComponent)
    private area: PickerAreaComponent;

    @ViewChild(RulerComponent)
    private ruler: RulerComponent;

    private color(): string {
        return '#'
        + this.inputs.colorR
        + this.inputs.colorG
        + this.inputs.colorB;
    };

    public ngOnInit(): void {
        this.inputs.colorR='00';
        this.inputs.colorG='00';
        this.inputs.colorB='00';

        this.ruler.setGradient();
    }
}