import { DirectiveService } from './../modules/directive/directive.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _directiveService: DirectiveService) { }
  changeToEnglish() {
    this._directiveService.changeDirection('LTR');
  }

  changeToHebrew() {
    this._directiveService.changeDirection('RTL');
  }
}
