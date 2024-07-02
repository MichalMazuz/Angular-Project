
import { Component, OnInit } from '@angular/core';
import { Observable, from, interval } from 'rxjs';
import {map} from 'rxjs/operators'
import { Student } from 'src/app/modules/students/student.model';
import { StudentService } from 'src/app/modules/students/student.service';


@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
  students: Student[] = this._studentService.getStudent();
  timerValue:string=" "
  constructor(private _studentService: StudentService) {
   
  }

  ngOnInit() {
   
    this.studentFN.subscribe((val) => {
      console.log("the first name is:" + val)
    })
    
    // this.timer1.subscribe((val)=>{
    //   console.log("the time1 is:" + val)
    // })
    this.timer2.subscribe((val)=>{
     this.timerValue=val.toLocaleTimeString();
    })


    this.studentLN.subscribe(
      //next
      (val)=>{
        console.log("the last name is:" + val)
     },
     //error
     (err)=>{
       console.log(err);
     },
     //complete
     ()=>{
      console.log("completed");
     });
  }

  studentFN: Observable<string> = new Observable((obs) => {
    for (var i = 0; i < this.students.length; i++)
      obs.next(this.students[i].firstN)
    obs.complete();
  })

  studentLN:Observable<string|undefined>=from(this.students).pipe(map(x=>{return x.lastN}))

  timer1:Observable<Date>=new Observable(obs=>{
    setInterval(()=>{
      obs.next(new Date())
    },1000)
  })

  timer2:Observable<Date>=interval(1000).pipe(map(x=>{return new Date()}))
}
