import { NgModule } from "@angular/core";
import { StudentDetailsComponent } from "./student-details/student-details.component";
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentService } from "./student.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule(
{
    declarations:[StudentsListComponent, StudentDetailsComponent],
    imports:[CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule,RouterModule],
    providers:[StudentService],
    exports:[StudentsListComponent]
})

export class StudentsModule{

}