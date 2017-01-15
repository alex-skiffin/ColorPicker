import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'picker-area',
    templateUrl: 'app/picker/picker-area/area.component.template.html',
    styleUrls: ['app/picker/picker-area/area.component.css']
})
export class PickerAreaComponent {
    @ViewChild('area')
	private area: ElementRef;

    constructor(){

    }
}