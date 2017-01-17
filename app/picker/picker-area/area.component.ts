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
    private colorsChangedSubscription: any;

    constructor(private element: ElementRef, private colorService: ColorPickerService) {
        this.colorsChangedSubscription = colorService.colorsChanged.subscribe(() => { this.drawArea(); });
    }

    ngAfterViewInit(): void {
        this.drawArea();
    }

    ngOnDestroy(): void {
        this.colorsChangedSubscription.unsubscribe();
    }

    private drawArea(): void {
        let context = this.area.nativeElement.getContext('2d');
        let grad = context.createLinearGradient(0, 200, 200, 0);
        let startColor: string = '#FF00' + this.colorService.getColorRGB().B;
        let stopColor: string = '#00FF' + this.colorService.getColorRGB().B;
        grad.addColorStop(0, startColor);
        grad.addColorStop(1, stopColor);
        let ctx = this.area.nativeElement.getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.size, this.size);
    }

    private clickOnCanvas(event: any): void {
        let canvas: any = document.getElementById('area');
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let context = this.area.nativeElement.getContext('2d');
        let imgData = context.getImageData(x, y, 1, 1).data;
        let R = this.colorService.toHex(imgData[0].toString());
        let G = this.colorService.toHex(imgData[1].toString());
        this.colorService.setR(R);
        this.colorService.setG(G);
    }
}