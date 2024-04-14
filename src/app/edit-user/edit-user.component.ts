import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../users.service';
import { RouterModule } from '@angular/router';

interface User {
  id: Number;
  firstName: String;
  lastName: String;
  occupation: String;
  gender: String;
  birthDate: String;
}

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})

export class EditUserComponent implements OnInit {
  userID: number = 0;
  
  user: User = {
    id: 0,
    firstName: "",
    lastName: "",
    occupation: "",
    gender: "",
    birthDate: "",
  };

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(response => {
      this.user = response.users.find((user: any) => user.id === id);
    })
  }

  constructor(public userService:UserService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.userID = +this.router.snapshot.params['id'];
    this.getUserById(this.userID);
  }
}
