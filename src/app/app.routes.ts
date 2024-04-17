import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserIDComponent } from './edit-user-id/edit-user-id.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: "", title: 'Angular CRUD App', component: HomePageComponent, pathMatch: "full" },
    { path: "add-user", title: 'Добавяне на потребител', component: AddUserComponent },
    { path: "edit-user", title: 'Редактиране на потребители', component: EditUserComponent },
    { path: "edit-user/:id", title: 'Редактиране на потребител', component: EditUserIDComponent },
    { path: "**", title: 'Страницата не беше намерена', component: NotFoundComponent },
];