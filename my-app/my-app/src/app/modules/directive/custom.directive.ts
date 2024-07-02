import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { DirectiveService } from "./directive.service";
import { Subscription } from "rxjs";



@Directive({
    selector:"[custom]"
})
export class CustomDirective implements OnInit{

   private subscription!:Subscription; 
    constructor(
        private _el :ElementRef,
        private renderer:Renderer2,
        private directiveService:DirectiveService
    ){}
    ngOnInit(): void {
        this.subscription=this.directiveService.direction.subscribe(direction=>{
            if(direction==='LTR'){
                this.renderer.addClass(this._el.nativeElement,'LTR')
                this.renderer.removeClass(this._el.nativeElement,'RTL')
            }
            else{
                this.renderer.addClass(this._el.nativeElement,'RTL')
                this.renderer.removeClass(this._el.nativeElement,'LTR')
            }
        })
    }


}