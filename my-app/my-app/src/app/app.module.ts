import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ObservableComponent } from './observable/observable/observable.component';
import { StudentsModule } from "./modules/students/students.modules";
import { StudentsListComponent } from "./modules/students/students-list/students-list.component";
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { LogInComponent } from './logIn/log-in/log-in.component';
import { HomeSettingsComponent } from './modules/settings/home-settings/home-settings.component';
import { CustomDirective } from "./modules/directive/custom.directive";
import { ObservableDemoComponent } from './modules/domo/observable-demo/observable-demo.component';
import { StudentShowComponent } from './modules/students/student-show/student-show.component';


@NgModule({
    declarations: [AppComponent, ObservableComponent, HomeComponent, PageNotFoundComponent, LogInComponent, HomeSettingsComponent,CustomDirective, ObservableDemoComponent, StudentShowComponent],
    imports: [BrowserModule,StudentsModule,AppRoutingModule],
    providers:[],
    bootstrap: [AppComponent]
})
export class AppModule { }
