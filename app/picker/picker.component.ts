import { Component, ViewChild } from '@angular/core';
import { InputsComponent } from './inputs/inputs.component';
import { PickerAreaComponent } from './picker-area/area.component';
import { RulerComponent } from './ruler/ruler.component';
import { ColorPickerService } from './Helpers/ColorPickerService';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'color-picker',
    templateUrl: 'app/picker/picker.component.template.html',
    styleUrls: ['app/picker/picker.component.css'],
    providers: [ColorPickerService]
})

export class ColorPickerComponent {
    @ViewChild(InputsComponent)
    private inputs: InputsComponent;

    @ViewChild(PickerAreaComponent)
    private area: PickerAreaComponent;

    @ViewChild(RulerComponent)
    private ruler: RulerComponent;

    private color(): string {
        return this.colorService.getColor();
    };

    constructor(private colorService: ColorPickerService, private route: ActivatedRoute) {
            if (this.route.fragment.value) {
                if (this.colorService.checkColor(this.route.fragment.value)) {
                    this.colorService.setColor(this.route.fragment.value);
                }
            }
        this.colorService.changeUrl();
    }
}