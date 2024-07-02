import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor() { }

  someCondition:boolean=false

  setAuthGuard(state:boolean):void{
     this.someCondition=state;
  }

  getAuthGuard():boolean{
    return this.someCondition;
  }

  logout():void{
    this.someCondition=false;
  }
}
