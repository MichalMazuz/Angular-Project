import { Injectable } from "@angular/core";
import { Student, Semester } from "./student.model";
import { HttpClient } from "@angular/common/http";
import { Observable,catchError, concatMap, filter, from, map, tap, toArray  } from "rxjs";
const STUDENTS = [
   {
      id: 1,
      firstN: 'michal',
      lastN: 'mazuz',
      address: 'bar ilan',
      phone: '0504107969',
      status: true,
      avg: 59,
      dateL: new Date('2024-01-01'),
      idSubject: 3,
      semester: Semester.SemesterA,
      absence: [
         { missingFromDate: new Date('2024-04-20'), missingDays: 1 },
         { missingFromDate: new Date('2024-05-10'), missingDays: 2 }
      ]

   },
   {
      id: 2,
      firstN: 'shira',
      lastN: 'mazuz',
      address: 'bar ilan',
      phone: '0505557969',
      status: false,
      avg: 98,
      dateL: new Date('2024-01-01'),
      idSubject: 1,
      semester: Semester.SemesterA,
      absence: [
         { missingFromDate: new Date('2024-05-01'), missingDays: 2 },
         { missingFromDate: new Date('2024-06-15'), missingDays: 3 }
      ]
   }
];
@Injectable()
export class StudentService {
   apiUrl: string = "/api/Student";
   constructor(private _http: HttpClient) {

   }

   getStudentsFromServer(): Observable<Student[]> {
      return this._http.get<Student[]>(this.apiUrl);
   }

   getStudentsFromServerByStatus(state:boolean): Observable<Student[]> {
      return this._http.get<Student[]>(`${this.apiUrl}/filterByActive/${state}`);
   }
   getStudentsFromServerByName(lastN:string): Observable<Student[]> {
      return this._http.get<Student[]>(`${this.apiUrl}/filterByName/${lastN}`);
   }
   getStudentsFromServerById(id:any): Observable<Student> {
      return this._http.get<Student>(`${this.apiUrl}/filterById/${id}`);
   }

   addStudentFromServer(student: Student): Observable<boolean> {
      return this._http.post<boolean>(this.apiUrl, student);
   }

   updateStudentFromServer(id: number, student: Student): Observable<boolean> {
      return this._http.put<boolean>(`${this.apiUrl}/${id}`, student);
   }

   deleteStudentFromServer(id: number): Observable<boolean> {
      return this._http.delete<boolean>(`${this.apiUrl}/${id}`);
   }
   getStudent(): Student[] {
      return STUDENTS;
   }

   getAllStudentsSlowly(): Promise<Student[]> {
      return new Promise(res => { setTimeout(() => res(STUDENTS), 1000) });
   }
   length!:number
   saveStudentToList(studentToSave: Student): Observable<any> {
      return this.getStudentsFromServer().pipe(
        concatMap(data => {
          this.length = data.length + 1;
          if (studentToSave.id == 0) {
            studentToSave.id = this.length + 1;
            return this.addStudentFromServer(studentToSave).pipe(
              tap(() => alert("add success!")),
              catchError(err => {
                alert("add failed!");
                throw err;
              })
            );
          } else {
            return this.updateStudentFromServer(studentToSave.id, studentToSave).pipe(
              tap(data => {
                if (data) {
                  alert("update success!");
                }
              }),
              catchError(err => {
                alert("update failed!");
                throw err;
              })
            );
          }
        })
      );
    }

    sendEmailToActiveStudents(message: string): Observable<string> {
      return this.getStudentsFromServerByStatus(true).pipe(
          concatMap((students: Student[]) => from(students)),
          concatMap((student: Student) => {
              const emailAddress = `${student.firstN}@a.com`;
              // מימוש שליחת המייל בפועל
              console.log(`Sending email to ${student.firstN} at ${emailAddress}: ${message}`);
              // זריקת הודעה עבור כל שליחה מוצלחת
              return new Observable<string>(observer => {
                  // סימולציה של שליחת מייל - להחליף במימוש אמיתי
                  setTimeout(() => {
                      observer.next(`המייל נשלח בהצלחה לכתובת ${emailAddress}`);
                      observer.complete();
                  }, 1000); // סימולציה של השהייה של 1 שנייה
              });
          })
      );
  }
    sendEmailToActiveStudent(): Observable<string[]> {
      return this.getStudentsFromServer().pipe(
         concatMap((students: Student[]) => from(students)),
         filter((student: Student) => student.status === true),
         map((student: Student) => {
            const emailAddress = `${student.firstN}@a.com`;
            return `The email was sent to address ${emailAddress}`;
         }),
         toArray()
      );
   }
   
}