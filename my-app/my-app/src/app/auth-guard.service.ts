import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from './logIn/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _loginservice: LogInService,private router:Router) { }

  canActivate(): boolean {
    if (this._loginservice.getAuthGuard()) {
      return true;
    }
    else {
      const con=confirm("You are not registered in the system, Would you like to identify yourself in order to go to the settings page")
      if(con)
        this.router.navigate(["/login"])
      else
        alert("you can not go to this page")
      return false;
    }

  }
}
