import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudentService } from '../student.service';
import { Student, Semester } from '../student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  searchName: string = '';
  searchSubject: Subject<string> = new Subject();
  toSendStd?: Student;
  from: string;
  students: Student[] = [];
  selectesdStudent: any;
  successMessage: string = '';
  totalDaysAbsence: number = 0;

  constructor(private _studentService: StudentService, private _router: Router) {
    this.from = '';
  }

  ngOnInit(): void {
    this._studentService.getStudentsFromServer().subscribe(data => {
      this.students = data;
    });
    this.setupSearchSubscription();
  }

  setupSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(searchText => {
        if (searchText.trim() === '') {
          return this._studentService.getStudentsFromServer();
        } else {
          return this._studentService.getStudentsFromServerByName(searchText);
        }
      })
    ).subscribe(data => {
      this.students = data;
    });
  }

  onSearchNameChange(searchText: string) {
    this.searchName = searchText; // update searchName for two-way binding
    if (searchText.trim() === '') {
      this.searchSubject.next(''); // send empty string to reset the search
    } else {
      this.searchSubject.next(searchText);
    }
  }

  getActiveStudents(state: boolean) {
    this._studentService.getStudentsFromServerByStatus(state).subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(id: number) {
    this.from = " ";
    this._studentService.deleteStudentFromServer(id).subscribe(data => {
      const indexToDelete = this.students.findIndex(student => student.id === id);
      if (indexToDelete !== -1) {
        console.log("successfully")
        this.students.splice(indexToDelete, 1);
      }
    }, err => {
      alert("delete was failed");
    });
  }

  updateStudent(studentToShow: Student) {
    this.from = " ";
    this.selectesdStudent = studentToShow;
    this._router.navigate(["/studentDetails", studentToShow.id]);
  }

  addStudent() {
    this.from = " ";
    this._router.navigate(["/studentDetails"]);
  }

  allDaysAbsance(id: number): number {
    let totalDaysAbsence = 0;
    const s = this.students.find(x => x.id === id);
    s?.absence?.forEach(x => {
      totalDaysAbsence += x.missingDays ? x.missingDays : 0;
    });
    return totalDaysAbsence;
  }

  saveStudentToList(student: Student) {
    if (student.id === 0) {
      student.id = this.students.length + 1;
      this._studentService.addStudentFromServer(student).subscribe(data => {
        if (data) {
          this.students.push(student);
          alert("Save new student success");
        }
      }, err => {
        alert(err);
      });
    } else {
      this._studentService.updateStudentFromServer(student.id, student).subscribe(data => {
        if (data) {
          let studentToUpdate = this.students.find(s => s.id === student.id);
          if (studentToUpdate) {
            studentToUpdate = student;
            this.successMessage = `The student ${student.firstN} ${student.lastN} has been updated successfully!`;
          }
        }
      });
    }
    this.selectesdStudent = null;
  }

  showPanel(s: Student) {
    this.selectesdStudent = s;
    this._router.navigate(["/show", s.id]);
    this.from = "show";
  }
}
