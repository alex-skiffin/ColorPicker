import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ColorPickerService {

    private colorR: string = 'F0';
    private colorG: string = 'F0';
    private colorB: string = 'F0';

    constructor(private router: Router) {
    }

    public setR(R: string) {
        this.colorR = R;
        this.changeUrl();
    }
    public setG(G: string) {
        this.colorG = G;
        this.changeUrl();
    }
    public setB(B: string) {
        this.colorB = B;
        this.changeUrl();
    }
    
    public toHex(n: string): string {
        let num = parseInt(n, 10);
        if (isNaN(num)) return "00";
        num = Math.max(0, Math.min(num, 255));
        return "0123456789ABCDEF".charAt((num - num % 16) / 16) + "0123456789ABCDEF".charAt(num % 16);
    }

    public getColor(): string {
        return '#' + this.getColorWithoutSharp();
    };

    private getColorWithoutSharp(): string {
        return this.colorR
            + this.colorG
            + this.colorB;
    }

    public changeUrl(): void {
        this.router.navigateByUrl("/" + this.getColorWithoutSharp());
    }
}