import { Component, ViewChild, ElementRef } from '@angular/core';
import { ColorPickerService } from '../Helpers/ColorPickerService';

@Component({
    selector: 'inputs',
    templateUrl: 'app/picker/inputs/inputs.component.template.html',
    styleUrls: ['app/picker/inputs/inputs.component.css']
})
export class InputsComponent {
    constructor(private colorService: ColorPickerService)
    { }

    private validateInput(value: string): string {
        if (!value)
            return '00';

        value = value.replace(/[^A-Fa-f0-9]/g, "");

        if (value.length > 2)
            value = value.substring(value.length - 2);

        if (value.length === 0)
            value = '00';
        if (value.length === 1)
            value = '0' + value;

        value = value.toUpperCase();
        return value;
    }
}
