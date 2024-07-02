import { NgModule } from '@angular/core';
import { Route, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsListComponent } from './modules/students/students-list/students-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentDetailsComponent } from './modules/students/student-details/student-details.component';
import { AuthGuardService } from './auth-guard.service';
import { LogInComponent } from './logIn/log-in/log-in.component';
import { ObservableDemoComponent } from './modules/domo/observable-demo/observable-demo.component';
import { StudentShowComponent } from './modules/students/student-show/student-show.component';

const APP_ROUTES:Route[]=[
    {path:"",redirectTo:"home" ,pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"students",component:StudentsListComponent},
    {path:"studentDetails",component:StudentDetailsComponent},
    {path:"studentDetails/:id",component:StudentDetailsComponent},
    {path:"show/:id",component:StudentShowComponent},
    {path:"login",component:LogInComponent},
    {path:"settings",loadChildren:()=>import("./modules/settings/settings.modules").then(s=>s.SettingsModule),canActivate:[AuthGuardService]},
    {path:"demo",component:ObservableDemoComponent},
    {path:"**",component:PageNotFoundComponent},
]


@NgModule({
    imports:[RouterModule.forRoot(APP_ROUTES)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}