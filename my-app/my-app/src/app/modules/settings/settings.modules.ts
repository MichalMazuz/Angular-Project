import { NgModule } from "@angular/core";
import { AccountComponent } from "./account/account.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { ProfileComponent } from "./profile/profile.component";
import { CommonModule } from "@angular/common";
import { SettingsRouting } from "./settings-routing.module";
import { RouterModule } from "@angular/router";






@NgModule({
    declarations:[AccountComponent,FavoritesComponent,ProfileComponent],
    imports:[CommonModule,SettingsRouting,RouterModule]
})
export class SettingsModule{

}