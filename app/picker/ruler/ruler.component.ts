import { Component, ViewChild, ElementRef } from '@angular/core';
import { ColorPickerService } from '../Helpers/ColorPickerService';

@Component({
    selector: 'ruler',
    templateUrl: 'app/picker/ruler/ruler.component.template.html',
    styleUrls: ['app/picker/ruler/ruler.component.css']
})
export class RulerComponent {

    @ViewChild('ruler')
    private ruler: ElementRef;
    private sizeH = 200;
    private sizeW = 20;
    private context: any;

    constructor(private colorService: ColorPickerService) { }

    
    ngAfterViewInit(): void {
        this.context = this.ruler.nativeElement.getContext("2d");
        var grad = this.context.createLinearGradient(0, 0, 0, 200);
        grad.addColorStop(0, 'blue');
        grad.addColorStop(1, 'green');
        var ctx = this.ruler.nativeElement.getContext("2d");
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.sizeW, this.sizeH);
    }

    private clickOnCanvas(event: any): void {
        var canvas: any = document.getElementById('ruler');
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var imgData = this.context.getImageData(x, y, 1, 1).data;
        var R = this.colorService.toHex(imgData[0].toString());
        var G = this.colorService.toHex(imgData[1].toString());
        var B = this.colorService.toHex(imgData[2].toString());
        this.colorService.setR(R);
        this.colorService.setG(G);
        this.colorService.setB(B);
    }
}
