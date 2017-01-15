import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'inputs',
    templateUrl: 'app/picker/inputs/inputs.component.template.html',
    styleUrls: ['app/picker/inputs/inputs.component.css']
})
export class InputsComponent {
    public colorR: string;

    public colorG: string;

    public colorB: string;

    private validateInput(value: string): string {
        if(!value)
            return '00';

        value = value.replace(/[^A-Fa-f0-9]/g, "");
        
        if(value.length > 2)
            value=value.substring(value.length-2);
            
        if(value.length===0)
            value='00';
        if(value.length===1)
            value='0'+value;
            
        return value;
    }
}
