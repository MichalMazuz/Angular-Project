import { Component } from '@angular/core';
import { LogInService } from '../log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  constructor(public _loginservice: LogInService, private router: Router) { }

  register() {
    this._loginservice.setAuthGuard(true)
    const conf=confirm("Would you like to go to the settings page?")
    if(conf)
      this.router.navigate(["/settings"])
    else
    this.router.navigate(["/home"])
  }

  logoutS() {
    this._loginservice.logout();
    this.router.navigate(["/home"])
  }
}
