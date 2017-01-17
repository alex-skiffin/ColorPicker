import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ColorPickerService {

    private color: Color = new Color();

    public colorsChanged: EventEmitter<Color> = new EventEmitter<Color>();

    constructor(private router: Router) {
    }

    public setR(R: string) {
        this.color.R = R;
        this.updateAll();
    }
    public setG(G: string) {
        this.color.G = G;
        this.updateAll();
    }
    public setB(B: string) {
        this.color.B = B;
        this.updateAll();
    }

    private updateAll(): void {
        this.changeUrl();
        this.colorsChanged.emit(this.color);
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

    public getColorRGB(): Color {
        return this.color;
    };

    private getColorWithoutSharp(): string {
        return this.color.toString();
    }

    public changeUrl(): void {
        this.router.navigateByUrl("/" + this.getColorWithoutSharp());
    }

    public checkColor(color: string): boolean {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + color);
    }

    public setColor(color: string): void {
        this.color = new Color(color[0] + color[1], color[2] + color[3], color[4] + color[5]);
    }
}

export class Color {
    public R: string = 'F0';
    public G: string = 'F0';
    public B: string = 'F0';

    constructor(colorR?: string, colorG?: string, colorB?: string) {
        if (colorR)
            this.R = colorR;
        if (colorG)
            this.G = colorG;
        if (colorB)
            this.B = colorB;
    }

    toString(): string {
        return this.R + this.G + this.B;
    }
}
