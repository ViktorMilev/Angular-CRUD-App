import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import moment from 'moment';

interface User {
  id: Number;
  firstName: String;
  lastName: String;
  occupation: String;
  gender: String;
  birthDate: String;
}

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})

export class AddUserComponent {
  user: User = {
    id: 0,
    firstName: "",
    lastName: "",
    occupation: "",
    gender: "",
    birthDate: "",
  };

  users: User[] = [];

  getUsersData() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.users;
    })
  }

  selectGender(event: any) {  
    console.log(event?.target.dataset.value )
    var gender = event?.target.dataset.value;
    this.user.gender = gender;
  }

  calculateYears(params: string) {
    console.log(typeof params)
    var years = moment().diff(params, 'years');
    return years;
  };

  items: any[] = [];

  addItem(newUser: any) {
    this.userService.addUser(newUser).subscribe((user) => {
    })
  }

  constructor(public userService:UserService) {
  }

  ngOnInit(): void {
    this.addItem({ id: 7, 
      "firstName": "Румен",
      "lastName": "Стоянов",
      "occupation": "Банкер",
      "gender": "Мъж",
      "birthDate": "1992-05-10" });
    this.getUsersData();
    console.log(this.user);
  }
}
