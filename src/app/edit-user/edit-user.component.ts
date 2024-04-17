import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [HomePageComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  styles: ['.container.mx-auto { height: 100vh; padding: 10px; }']
})

export class EditUserComponent {
  PageHeader = 'Редактиране на потребители';
}