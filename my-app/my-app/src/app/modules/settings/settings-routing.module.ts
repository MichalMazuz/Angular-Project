import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeSettingsComponent } from "./home-settings/home-settings.component";


const SETTINGS_ROUTES:Route[]=[
    {
        path:"",component:HomeSettingsComponent,children:[
            {path:"account",component:AccountComponent},
            {path:"favorites",component:FavoritesComponent},
            {path:"profile",component:ProfileComponent},
        ]
    }
]
@NgModule({
   
    imports:[RouterModule.forChild(SETTINGS_ROUTES)],
    exports:[RouterModule]
})
export class SettingsRouting{

}