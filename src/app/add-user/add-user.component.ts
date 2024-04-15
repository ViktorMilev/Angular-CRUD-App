import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import moment from 'moment';

interface User {
  id: String;
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
    id: "",
    firstName: "",
    lastName: "",
    occupation: "",
    gender: "",
    birthDate: "",
  };

  users: User[] = [];
  lastUser: any = [];
  newID: string = "";
  upperCaseError: string = "";

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  upperCaseValidation(value: any) {

  }

  invalidFieldMessage(error: any) {
    if (error.control.errors.pattern) {
      return '*Моля използвайте само букви';
    } else {
      return null;
    }
  }

  sendNewUserData(newUser: any) {
    var regex = /^[A-Z]/g;
    var firstNameLowercase = newUser.firstName.match(regex);
    var lastNameLowercase = newUser.lastName.match(regex);

    if (this.user.gender === "") {
      alert("Моля изберете пол!");
      return;  
    }

    if (firstNameLowercase === null) {
      alert("Първото име трябва да е с главна буква!");  
    } else if (lastNameLowercase === null) {
      alert("Фамилното име трябва да е с главна буква!");
    } else {
      this.lastUser = this.users.slice(-1);
      this.newID = String(+this.lastUser[0].id + 1);
      newUser.id = this.newID;
  
      this.userService.addUser(newUser).subscribe((user) => {
      });

      this.getUsers();
    }
  }

  selectGender(event: any) {
    var gender = event?.target.dataset.value;
    this.user.gender = gender;
  }

  calculateYears(params: string) {
    var years = moment().diff(params, 'years');
    return years;
  };

  addUser(newUser: any) {
    this.sendNewUserData(newUser);
  }

  clear() {
    this.user = {
      id: "",
      firstName: "",
      lastName: "",
      occupation: "",
      gender: "",
      birthDate: "",
    };
  }

  alertError() {
    return '*Не трябва да е празно!'
  }

  constructor(public userService:UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
