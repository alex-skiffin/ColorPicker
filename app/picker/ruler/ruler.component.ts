import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'ruler',
    templateUrl: 'app/picker/ruler/ruler.component.template.html',
    styleUrls: [ 'app/picker/ruler/ruler.component.css' ]
})
export class RulerComponent {

    @ViewChild('ruler')
	private ruler: ElementRef;
}
