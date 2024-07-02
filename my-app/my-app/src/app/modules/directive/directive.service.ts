import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class DirectiveService{
    private directionSubject=new BehaviorSubject<string>('LTR')
    direction:Observable<string>=this.directionSubject.asObservable();

    changeDirection(newDirective:string):void{
        document.documentElement.dir = newDirective;
         this.directionSubject.next(newDirective)
    }


}