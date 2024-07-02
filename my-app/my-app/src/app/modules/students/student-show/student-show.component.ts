import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/modules/students/student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-show',
  templateUrl: './student-show.component.html',
  styleUrls: ['./student-show.component.scss']
})
export class StudentShowComponent implements OnInit {
  student?: Student;
  studentId!: number;

  constructor(private _act: ActivatedRoute, private _studentService: StudentService) {}

  ngOnInit(): void {
    this._act.paramMap.subscribe(param => {
      if (param.has('id')) {
        const id = param.get('id');
        if (id !== null && !isNaN(+id)) {
          this.studentId = +id;
          this.loadStudent();
        } else {
          console.error('Invalid id parameter');
        }
      }
    });
  }

  loadStudent(): void {
    this._studentService.getStudentsFromServerById(this.studentId).subscribe(student => {
      this.student = student;
    });
  }
}
