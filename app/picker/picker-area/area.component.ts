import { Component, ViewChild, ElementRef } from '@angular/core';
import { ColorPickerService } from '../Helpers/ColorPickerService';

@Component({
    selector: 'picker-area',
    templateUrl: 'app/picker/picker-area/area.component.template.html',
    styleUrls: ['app/picker/picker-area/area.component.css']
})
export class PickerAreaComponent {
    @ViewChild('area')
    private area: ElementRef;
    private size = 200;

    constructor(private element: ElementRef, private colorService: ColorPickerService) {
 
    }

    ngAfterViewInit(): void {
        var context = this.area.nativeElement.getContext("2d");
        var grad = context.createLinearGradient(0, 200, 200, 0);
        grad.addColorStop(0, 'red');
        grad.addColorStop(1, 'green');
        var ctx = this.area.nativeElement.getContext("2d");
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.size, this.size);
    }

    private clickOnCanvas(event: any): void {
        var canvas: any = document.getElementById('area');
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var context = this.area.nativeElement.getContext("2d");
        var imgData = context.getImageData(x, y, 1, 1).data;
        var R = this.colorService.toHex(imgData[0].toString());
        var G = this.colorService.toHex(imgData[1].toString());
        var B = this.colorService.toHex(imgData[2].toString());
        this.colorService.setR(R);
        this.colorService.setG(G);
    }
}