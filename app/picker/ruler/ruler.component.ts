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
    private colorsChangedSubscription: any;

    constructor(private colorService: ColorPickerService) {
        this.colorsChangedSubscription = colorService.colorsChanged.subscribe(() => { this.drawRuler(); });
    }

    ngAfterViewInit(): void {
        this.drawRuler();
    }

    ngOnDestroy(): void {
        this.colorsChangedSubscription.unsubscribe();
    }

    private clickOnCanvas(event: any): void {
        let canvas: any = document.getElementById('ruler');
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let imgData = this.context.getImageData(x, y, 1, 1).data;
        let B = this.colorService.toHex(imgData[2].toString());
        this.colorService.setB(B);
    }

    private drawRuler(): void {
        this.context = this.ruler.nativeElement.getContext('2d');
        let grad = this.context.createLinearGradient(0, 0, 0, 200);
        let startColor: string = '#' + this.colorService.getColorRGB().R + this.colorService.getColorRGB().G + '00';
        let stopColor: string = '#' + this.colorService.getColorRGB().R + this.colorService.getColorRGB().G + 'FF';
        grad.addColorStop(0, startColor);
        grad.addColorStop(1, stopColor);
        let ctx = this.ruler.nativeElement.getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.sizeW, this.sizeH);
    }
}
