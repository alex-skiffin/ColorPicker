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
        let gradient, startColor, endColor, fac;
        
        for (let i = 0; i < this.size; i++) {
            gradient = context.createLinearGradient(0, i, this.size, i);
            fac = i / (this.size - 1);

            startColor = this.arrayToRGBA(
                this.lerp([0, 0, parseInt(this.colorService.getColorRGB().B, 16), 1], 
                [0, 255, parseInt(this.colorService.getColorRGB().B, 16), 1], fac)
            );
            endColor = this.arrayToRGBA(
                this.lerp([255, 0, parseInt(this.colorService.getColorRGB().B, 16), 1],
                 [255, 255, parseInt(this.colorService.getColorRGB().B, 16), 0], fac)
            );

            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1, endColor);

            context.fillStyle = gradient;
            context.fillRect(0, i, this.size, i);
        }
    }

    private arrayToRGBA(arr: number[]): string {
        var ret = arr.map(function (v) {
            return Math.max(Math.min(Math.round(v), 255), 0);
        });

        ret[3] = arr[3];

        return 'rgba(' + ret.join(',') + ')';
    }

    private lerp(a: number[], b: number[], fac: number): number[] {
        return a.map(function (v, i) {
            return v * (1 - fac) + b[i] * fac;
        });
    }

    private clickOnCanvas(event: any): void {
        let rect = this.area.nativeElement.getBoundingClientRect();
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