import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: "", component: HomePageComponent, pathMatch: "full"},
    { path: "add-user", component: AddUserComponent },
    { path: "edit-user/:id", component: EditUserComponent },
    { path: "**", component: NotFoundComponent }
];
