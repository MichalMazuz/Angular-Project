
import { Component } from "@angular/core";


@Component({
    templateUrl: './app.component.html',
    selector: "app-root",
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    heroes=['hhjh','jhg'];
    hour: number =new Date().getHours();
    title: string;
    constructor(){
        this.title='hello my-app michal';
    }

    checkTime(){
       if(this.hour>=6 && this.hour<=11)
            return 'good morning';
       if(this.hour>11 && this.hour<=17)
            return 'good noon';
       return 'good evening';
    }
}