import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ColorPickerService {

    private colorR: string = '';
    private colorG: string = '';
    private colorB: string = '';

    constructor(private router: Router){
    }

    public setR(R: string){
        this.colorR = R;
        this.changeUrl();
    }
    public setG(G: string){
        this.colorG = G;
        this.changeUrl();
    }
    public setB(B: string){
        this.colorB = B;
        this.changeUrl();
    }

    public getColor(): string {
        return '#' + this.getColorWithoutSharp();
    };

    private getColorWithoutSharp(): string {
        return this.colorR
        + this.colorG
        + this.colorB;
    }
   
    public changeUrl(): void{
        this.router.navigateByUrl("/"+this.getColorWithoutSharp());
    }
}