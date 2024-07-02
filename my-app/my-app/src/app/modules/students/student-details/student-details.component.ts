import { Absence } from '../../../models/subject-model/absence.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APP_SUBJECTS, Subject } from '../../../models/subject-model/subject.model';
import { Semester, Student } from '../student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  semesterTime = Semester;

  subjectList: Subject[] = APP_SUBJECTS;

  student?: Student;

  constructor(
    private _studentsService: StudentService,
    private _acr: ActivatedRoute,
    private _router: Router
  ) {}

  studentID!: number;

  ngOnInit(): void {
    this._acr.paramMap.subscribe(paramM => {
      const idParam = paramM.get("id");
      if (idParam) {
        this.studentID = +idParam;
        this.loadStudent();
      } else {
        this.student = new Student(
          ' ',
          ' ',
          ' ',
          ' ',
          true,
          98,
          new Date('2024-01-01'),
          1,
          Semester.SemesterA
        );
        this.initStudentForm();
      }
    });
  }

  loadStudent(): void {
    this._studentsService.getStudentsFromServerById(this.studentID).subscribe(data=> {
      {
        this.student =data ;
        this.initStudentForm();
      }
    });
  }

  @Input() from1!: string;

  successMessage: string = '';

  missingFromDate?: Date;
  missingDays: number = 0;
  totalMissing: number = 0;

  studentForm: FormGroup = new FormGroup({});

  

  initStudentForm(): void {
    this.studentForm = new FormGroup({
      id: new FormControl(this.student?.id),
      firstN: new FormControl(this.student?.firstN, Validators.required),
      lastN: new FormControl(this.student?.lastN, Validators.required),
      address: new FormControl(this.student?.address, Validators.required),
      phone: new FormControl(this.student?.phone, [Validators.required, Validators.minLength(7)]),
      status: new FormControl(this.student?.status, Validators.required),
      avg: new FormControl(this.student?.avg, [Validators.required, Validators.max(100)]),
      dateL: new FormControl(this.student?.dateL, Validators.required),
      idSubject: new FormControl(this.student?.idSubject, Validators.required),
      semester: new FormControl(this.student?.semester, Validators.required)
    });
  }
  
  @Output() onSaveStudent: EventEmitter<Student> = new EventEmitter<Student>();

  saveNewStudent(): void {
    const updatedStudent = { ...this.studentForm.value };

    if (!updatedStudent.absence) {
      updatedStudent.absence = [];
    }

    if (this.student && this.student.absence && this.student.absence.length > 0) {
      updatedStudent.absence = [...this.student.absence];
    }

    if (this.missingFromDate && this.missingDays > 0) {
      updatedStudent.absence.push({ missingFromDate: this.missingFromDate, missingDays: this.missingDays });
    }

    console.log('Saving student:', updatedStudent);

    this._studentsService.saveStudentToList(updatedStudent).subscribe(() => {
      this._router.navigate(['/students']);
    });
  }
}
