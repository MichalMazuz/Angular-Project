import { Observable, filter, from } from 'rxjs';
import { StudentService } from './../../students/student.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-observable-demo',
  templateUrl: './observable-demo.component.html',
  styleUrls: ['./observable-demo.component.scss']
})
export class ObservableDemoComponent {
  constructor(private _studentService: StudentService) {
  }
  emailMessage: string[] = []

  sendEmail() {
    this._studentService.sendEmailToActiveStudent().subscribe(emails => {
       this.emailMessage = this.emailMessage.concat(emails);
    });
 }
 
}
